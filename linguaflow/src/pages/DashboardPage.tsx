import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flame,
  BookOpen,
  Headphones,
  Mic,
  Trophy,
  Target,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Card, ProgressRing, StatCard, LanguageBadge, LevelBadge } from '../components/common';
import { useUserStore, useProgressStore } from '../stores';
import { languageNames } from '../data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { dailyGoal, todayMinutes, totalWordsLearned, totalLessonsCompleted, weeklyData } = useProgressStore();

  const progressPercent = Math.round((todayMinutes / dailyGoal) * 100);

  const todayTasks = [
    { icon: BookOpen, label: '单词记忆', progress: 60, target: 20, unit: '个' },
    { icon: Mic, label: '口语练习', progress: 2, target: 3, unit: '次' },
    { icon: Headphones, label: '听力训练', progress: 1, target: 2, unit: '次' },
  ];

  const recommendedCourses = [
    { id: 'course-en-001', language: 'en' as const, title: 'English Basic A2', progress: 35 },
    { id: 'course-ja-001', language: 'ja' as const, title: 'Japanese Hiragana', progress: 10 },
  ];

  return (
    <div className="p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto space-y-8"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              欢迎回来，{user?.nickname || '学习者'}
            </h1>
            <p className="text-text-secondary">
              继续你的{languageNames[user?.targetLanguage || 'en']}学习之旅
            </p>
          </div>
          <div className="flex items-center gap-3">
            <LevelBadge level={user?.level || 1} />
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface">
              <Flame className="w-5 h-5 text-accent" />
              <span className="font-bold text-accent">{user?.streak || 0}天</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          <motion.div variants={itemVariants} className="col-span-4">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4">今日目标</h2>
              <div className="flex flex-col items-center">
                <ProgressRing progress={progressPercent} size={160} strokeWidth={12} />
                <p className="text-text-secondary mt-4">
                  {todayMinutes} / {dailyGoal} 分钟
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-8 space-y-4">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4">今日任务</h2>
              <div className="space-y-4">
                {todayTasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-surface-light">
                      <task.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-text-primary">{task.label}</span>
                        <span className="text-xs text-text-secondary">
                          {task.progress} / {task.target} {task.unit}
                        </span>
                      </div>
                      <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(task.progress / task.target) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4">本周学习时长</h2>
              <div className="flex items-end justify-between h-32 gap-2">
                {weeklyData.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${(day.minutes / 45) * 100}%` }}
                    />
                    <span className="text-xs text-text-secondary">{day.day}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-text-primary">我的课程</h2>
            <button
              onClick={() => navigate('/courses')}
              className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors"
            >
              查看全部 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {recommendedCourses.map((course) => (
              <Card
                key={course.id}
                hover
                onClick={() => navigate(`/courses/${course.id}`)}
                className="p-4 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <LanguageBadge language={course.language} size="sm" />
                    <h3 className="font-medium text-text-primary mt-1">{course.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-1.5 bg-surface-light rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-secondary">{course.progress}%</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-4 gap-4">
          <motion.div variants={itemVariants}>
            <StatCard
              label="学习天数"
              value={user?.streak || 0}
              icon={<Flame className="w-6 h-6" />}
              color="text-accent"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="已学单词"
              value={totalWordsLearned}
              icon={<BookOpen className="w-6 h-6" />}
              color="text-primary"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="完成课程"
              value={totalLessonsCompleted}
              icon={<Trophy className="w-6 h-6" />}
              color="text-secondary"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="当前等级"
              value={`Lv.${user?.level || 1}`}
              icon={<Target className="w-6 h-6" />}
              color="text-amber-400"
            />
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-primary/20">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary">学习小贴士</h3>
                <p className="text-sm text-text-secondary mt-1">
                  每天坚持学习30分钟以上效果最佳！保持连续学习可以解锁更多成就奖励。
                </p>
              </div>
              <button
                onClick={() => navigate('/courses')}
                className="px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
              >
                开始学习
              </button>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
