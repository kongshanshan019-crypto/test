import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Clock, Users, Filter, Search } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { mockCourses } from '../data/mockData';
import { LanguageLevel } from '../types';

const levelLabels: Record<LanguageLevel, string> = {
  beginner: '入门',
  elementary: '初级',
  intermediate: '中级',
  advanced: '高级',
  proficient: '精通'
};

const languageOptions = [
  { code: 'all', name: '全部', flag: '🌐' },
  { code: 'english', name: '英语', flag: '🇬🇧' },
  { code: 'japanese', name: '日语', flag: '🇯🇵' },
  { code: 'korean', name: '韩语', flag: '🇰🇷' },
  { code: 'french', name: '法语', flag: '🇫🇷' },
  { code: 'german', name: '德语', flag: '🇩🇪' },
];

const levelOptions = [
  { value: 'all', label: '全部等级' },
  { value: 'beginner', label: '入门' },
  { value: 'elementary', label: '初级' },
  { value: 'intermediate', label: '中级' },
  { value: 'advanced', label: '高级' },
];

export function CoursesPage() {
  const { currentLanguage } = useAppStore();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = mockCourses.filter(course => {
    const matchesLanguage = selectedLanguage === 'all' || course.language === selectedLanguage;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLanguage && matchesLevel && matchesSearch;
  });

  const coursesByLevel = levelOptions.slice(1).reduce((acc, level) => {
    acc[level.value] = filteredCourses.filter(c => c.level === level.value);
    return acc;
  }, {} as Record<string, typeof mockCourses>);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">课程中心</h1>
            <p className="text-white/90">分级课程体系，科学规划学习路径</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索课程..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {levelOptions.map((level) => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {languageOptions.map((lang) => (
              <motion.button
                key={lang.code}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedLanguage === lang.code
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {selectedLevel === 'all' ? (
          levelOptions.slice(1).map((level) => {
            const courses = coursesByLevel[level.value] || [];
            if (courses.length === 0) return null;
            
            return (
              <div key={level.value} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {level.value[0].toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{level.label}课程</h2>
                    <p className="text-gray-500">{courses.length} 门课程</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course, index) => (
                    <CourseCard key={course.id} course={course} index={index} />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        )}

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">暂无相关课程</h3>
            <p className="text-gray-500">尝试调整筛选条件</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CourseCard({ course, index }: { course: typeof mockCourses[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100"
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium text-indigo-600">
            {levelLabels[course.level]}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          {course.rating}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 mb-2 text-lg">{course.title}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {course.enrolledCount.toLocaleString()}
          </div>
        </div>
        
        <Link
          to={`/learn/${course.id}`}
          className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          开始学习
        </Link>
      </div>
    </motion.div>
  );
}
