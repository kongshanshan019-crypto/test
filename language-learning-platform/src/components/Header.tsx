import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  TrendingUp, 
  Users, 
  User, 
  Menu, 
  X,
  Globe
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const navigation = [
  { name: '首页', href: '/', icon: Home },
  { name: '课程', href: '/courses', icon: BookOpen },
  { name: '学习进度', href: '/progress', icon: TrendingUp },
  { name: '社区', href: '/community', icon: Users },
  { name: '我的', href: '/profile', icon: User },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, currentLanguage, setCurrentLanguage } = useAppStore();

  const languages = [
    { code: 'english', name: '英语', flag: '🇬🇧' },
    { code: 'japanese', name: '日语', flag: '🇯🇵' },
    { code: 'korean', name: '韩语', flag: '🇰🇷' },
    { code: 'french', name: '法语', flag: '🇫🇷' },
    { code: 'german', name: '德语', flag: '🇩🇪' },
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Globe className="h-8 w-8 text-white" />
              </motion.div>
              <span className="text-xl font-bold text-white">LangMaster</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex md:items-center md:gap-4">
            <select
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="bg-white/20 text-white text-sm rounded-lg px-3 py-1.5 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="text-gray-900">
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>

            {isAuthenticated ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
              >
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                  alt={user?.name}
                  className="h-6 w-6 rounded-full"
                />
                <span className="text-sm font-medium">{user?.name}</span>
              </Link>
            ) : (
              <Link
                to="/auth"
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all"
              >
                登录 / 注册
              </Link>
            )}
          </div>

          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white/95 backdrop-blur-sm border-t border-white/20"
        >
          <div className="px-4 py-3 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
            {!isAuthenticated && (
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                登录 / 注册
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}
