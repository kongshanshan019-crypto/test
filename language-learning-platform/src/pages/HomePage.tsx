import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Mic, 
  Headphones, 
  PenTool, 
  TrendingUp, 
  Users, 
  Trophy,
  Star,
  Play,
  ChevronRight
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { mockCourses } from '../data/mockData';

const features = [
  {
    icon: BookOpen,
    title: '分级课程体系',
    description: '从入门到精通，科学分级，循序渐进',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: PenTool,
    title: '单词记忆',
    description: '智能记忆算法，高效掌握词汇',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Mic,
    title: '口语跟读',
    description: 'AI语音识别，实时纠正发音',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Headphones,
    title: '听力训练',
    description: '真实场景对话，提升听力理解',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: TrendingUp,
    title: '进度追踪',
    description: '可视化学习数据，见证成长',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Users,
    title: '社区交流',
    description: '学友互助，共同进步',
    color: 'from-pink-500 to-rose-500'
  }
];

const languages = [
  { code: 'english', name: '英语', flag: '🇬🇧', learners: '50万+' },
  { code: 'japanese', name: '日语', flag: '🇯🇵', learners: '30万+' },
  { code: 'korean', name: '韩语', flag: '🇰🇷', learners: '25万+' },
  { code: 'french', name: '法语', flag: '🇫🇷', learners: '15万+' },
  { code: 'german', name: '德语', flag: '🇩🇪', learners: '12万+' },
];

export function HomePage() {
  const { isAuthenticated, user } = useAppStore();
  const popularCourses = mockCourses.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                超过100万学员的选择
              </span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              沉浸式多语种学习平台
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              英语、日语、韩语等主流语言，分级课程体系，互动式学习体验
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={isAuthenticated ? '/courses' : '/auth'}
                  className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
                >
                  <Play className="w-5 h-5" />
                  {isAuthenticated ? '开始学习' : '立即开始'}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 transition-colors"
                >
                  浏览课程
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">支持多种语言学习</h2>
            <p className="text-gray-600">选择你想学习的语言，开启精彩旅程</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 text-center cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{lang.flag}</div>
                <h3 className="font-semibold text-gray-900">{lang.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{lang.learners}学员</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心功能</h2>
            <p className="text-gray-600">全方位的语言学习解决方案</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">热门课程</h2>
              <p className="text-gray-600">精选优质课程，助你快速入门</p>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              查看全部
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCourses.map((course, index) => (
              <motion.div
                key={course.id}
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
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium text-indigo-600">
                    {course.rating} ⭐
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{course.totalLessons}课时</span>
                    <span className="text-indigo-600 font-medium">{course.enrolledCount.toLocaleString()}人学习</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {isAuthenticated && (
        <section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">欢迎回来，{user?.name}！</h2>
                  <p className="text-gray-600">继续你的学习之旅</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">今日学习</p>
                  <p className="text-2xl font-bold text-gray-900">0 分钟</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">完成课程</p>
                  <p className="text-2xl font-bold text-gray-900">0 节</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">连续学习</p>
                  <p className="text-2xl font-bold text-gray-900">0 天</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">准备好开始学习了吗？</h2>
          <p className="text-xl text-white/90 mb-8">加入百万学员，开启你的语言学习之旅</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={isAuthenticated ? '/courses' : '/auth'}
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              {isAuthenticated ? '继续学习' : '免费注册'}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
