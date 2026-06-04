import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  BookOpen,
  GraduationCap,
  BarChart3,
  Award,
  Users,
  User,
  LogOut,
  Globe
} from 'lucide-react';
import { useUserStore } from '../../stores';

const navItems = [
  { path: '/', icon: Home, label: '首页' },
  { path: '/courses', icon: BookOpen, label: '课程中心' },
  { path: '/progress', icon: BarChart3, label: '学习进度' },
  { path: '/achievements', icon: Award, label: '成就中心' },
  { path: '/community', icon: Users, label: '社区中心' },
  { path: '/profile', icon: User, label: '个人中心' },
];

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useUserStore();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-surface-light flex flex-col z-50">
      <div className="p-6 border-b border-surface-light">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-text-primary">LinguaFlow</h1>
            <p className="text-xs text-text-secondary">沉浸式语言学习</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="block"
            >
              <motion.div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary/20 text-primary'
                    : 'text-text-secondary hover:bg-surface-light hover:text-text-primary'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                    layoutId="activeDot"
                  />
                )}
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {user && (
        <div className="p-4 border-t border-surface-light">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={user.avatar}
              alt={user.nickname}
              className="w-10 h-10 rounded-full bg-surface-light"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {user.nickname}
              </p>
              <p className="text-xs text-text-secondary">
                Lv.{user.level} · {user.exp} XP
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-text-secondary hover:text-red-400 transition-colors rounded-lg hover:bg-surface-light"
          >
            <LogOut className="w-4 h-4" />
            退出登录
          </button>
        </div>
      )}
    </aside>
  );
}
