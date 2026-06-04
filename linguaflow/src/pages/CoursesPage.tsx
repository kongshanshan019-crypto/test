import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, Users, Clock } from 'lucide-react';
import { Card, LanguageBadge, LevelBadge } from '../components/common';
import { useCourseStore } from '../stores';
import type { Language } from '../types';
import { languageNames, levelNames } from '../data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function CoursesPage() {
  const navigate = useNavigate();
  const { courses } = useCourseStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || course.language === selectedLanguage;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesLanguage && matchesLevel;
  });

  const languages: ('all' | Language)[] = ['all', 'en', 'ja', 'ko'];
  const levels = [0, 1, 2, 3, 4, 5];

  return (
    <div className="p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto space-y-8"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-text-primary mb-2">课程中心</h1>
          <p className="text-text-secondary">探索丰富的多语种学习资源</p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[280px] relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="搜索课程..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface rounded-xl border border-surface-light text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-surface rounded-xl border border-surface-light">
            <Filter className="w-4 h-4 text-text-secondary" />
            <span className="text-sm text-text-secondary">筛选:</span>
          </div>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as Language | 'all')}
            className="px-4 py-3 bg-surface rounded-xl border border-surface-light text-text-primary focus:outline-none focus:border-primary"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>
                {lang === 'all' ? '全部语言' : languageNames[lang]}
              </option>
            ))}
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-4 py-3 bg-surface rounded-xl border border-surface-light text-text-primary focus:outline-none focus:border-primary"
          >
            <option value="all">全部等级</option>
            {levels.slice(1).map(level => (
              <option key={level} value={level}>
                {levelNames[level]}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-3 gap-6"
        >
          {filteredCourses.map((course) => (
            <motion.div key={course.id} variants={itemVariants}>
              <Card
                hover
                onClick={() => navigate(`/courses/${course.id}`)}
                className="cursor-pointer overflow-hidden"
              >
                <div className="relative h-40 bg-gradient-to-br from-primary/30 to-secondary/30">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover opacity-80"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <LanguageBadge language={course.language} />
                  </div>
                  <div className="absolute top-3 right-3">
                    <LevelBadge level={course.level} />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-text-primary mb-2 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}分钟
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {course.lessons.length}课时
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {course.enrolledCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredCourses.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-light flex items-center justify-center">
              <Search className="w-8 h-8 text-text-secondary" />
            </div>
            <p className="text-text-secondary">没有找到符合条件的课程</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
