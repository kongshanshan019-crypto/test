import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Users,
  BookOpen,
  CheckCircle,
  PlayCircle,
  Volume2
} from 'lucide-react';
import { Card, LanguageBadge, LevelBadge } from '../components/common';
import { useCourseStore, useLearningStore } from '../stores';
import type { LessonType } from '../types';

const lessonTypeLabels: Record<LessonType, string> = {
  vocabulary: '单词',
  grammar: '语法',
  speaking: '口语',
  listening: '听力'
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { courses, enrollCourse } = useCourseStore();
  const { startLesson } = useLearningStore();

  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-2">课程不存在</h2>
          <p className="text-text-secondary mb-4">请返回课程中心选择其他课程</p>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
          >
            返回课程中心
          </button>
        </div>
      </div>
    );
  }

  const completedLessons = course.lessons.filter(l => l.completed).length;
  const progressPercent = course.lessons.length > 0
    ? Math.round((completedLessons / course.lessons.length) * 100)
    : 0;

  const handleStartLesson = (lesson: typeof course.lessons[0]) => {
    startLesson(lesson, lesson.type);
    navigate(`/learn/${course.id}/${lesson.id}`);
  };

  return (
    <div className="p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto space-y-8"
      >
        <motion.div variants={itemVariants}>
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            返回课程中心
          </button>

          <div className="relative h-64 rounded-2xl overflow-hidden">
            <img
              src={course.coverImage}
              alt={course.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-3 mb-3">
                <LanguageBadge language={course.language} size="md" />
                <LevelBadge level={course.level} />
              </div>
              <h1 className="text-4xl font-bold text-text-primary mb-2">{course.title}</h1>
              <p className="text-text-secondary">{course.description}</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-primary">{course.duration}</p>
            <p className="text-xs text-text-secondary">分钟</p>
          </Card>
          <Card className="p-4 text-center">
            <BookOpen className="w-6 h-6 text-secondary mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-primary">{course.lessons.length}</p>
            <p className="text-xs text-text-secondary">课时</p>
          </Card>
          <Card className="p-4 text-center">
            <Users className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-primary">
              {course.enrolledCount.toLocaleString()}
            </p>
            <p className="text-xs text-text-secondary">已学习</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">
              <div className="relative w-8 h-8">
                <svg className="transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-surface-light"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${progressPercent}, 100`}
                  />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-text-primary">{progressPercent}%</p>
            <p className="text-xs text-text-secondary">完成度</p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-text-primary">课程章节</h2>
            <button
              onClick={() => enrollCourse(course.id)}
              className="px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
            >
              加入学习
            </button>
          </div>

          <div className="space-y-3">
            {course.lessons.map((lesson, index) => {
                return (
                  <motion.div key={lesson.id} variants={itemVariants}>
                    <Card
                    hover
                    onClick={() => handleStartLesson(lesson)}
                    className="p-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-light text-text-secondary">
                        {lesson.completed ? (
                          <CheckCircle className="w-5 h-5 text-secondary" />
                        ) : (
                          <span className="text-sm font-bold">{index + 1}</span>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-md bg-surface-light text-xs text-text-secondary">
                            {lessonTypeLabels[lesson.type]}
                          </span>
                          <h3 className="font-medium text-text-primary">{lesson.title}</h3>
                        </div>
                        <p className="text-sm text-text-secondary">
                          +{lesson.expReward} 经验值
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-xl hover:bg-surface-light transition-colors">
                          <Volume2 className="w-5 h-5 text-text-secondary" />
                        </button>
                        <div className="p-2 rounded-xl bg-primary/20">
                          <PlayCircle className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
