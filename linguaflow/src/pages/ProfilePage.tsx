import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Target,
  Settings,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Save
} from 'lucide-react';
import { Card, LanguageBadge, LevelBadge } from '../components/common';
import { useUserStore } from '../stores';
import type { Language } from '../types';

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

export default function ProfilePage() {
  const { user, updateProfile, logout } = useUserStore();
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [targetLanguage, setTargetLanguage] = useState<Language>(user?.targetLanguage || 'en');
  const [dailyGoal, setDailyGoal] = useState(30);
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({ nickname, targetLanguage });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
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
          <h1 className="text-3xl font-bold text-text-primary mb-2">个人中心</h1>
          <p className="text-text-secondary">管理你的账户和学习设置</p>
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          <motion.div variants={itemVariants} className="col-span-4">
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img
                    src={user?.avatar}
                    alt={user?.nickname}
                    className="w-24 h-24 rounded-full bg-surface-light"
                  />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{user?.level}</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-text-primary">{user?.nickname}</h2>
                <p className="text-sm text-text-secondary mb-4">{user?.email}</p>
                <div className="flex items-center gap-2 mb-4">
                  <LevelBadge level={user?.level || 1} />
                  <LanguageBadge language={user?.targetLanguage || 'en'} />
                </div>
                <div className="w-full p-3 rounded-xl bg-surface-light">
                  <p className="text-sm text-text-secondary">经验值</p>
                  <p className="text-xl font-bold text-primary">{user?.exp} XP</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-8 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                基本信息
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-2">昵称</label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-light rounded-xl text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="输入你的昵称"
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-2">邮箱</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-3 bg-surface-light rounded-xl text-text-secondary cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-2">学习语言</label>
                  <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value as Language)}
                    className="w-full px-4 py-3 bg-surface-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="en">英语</option>
                    <option value="ja">日语</option>
                    <option value="ko">韩语</option>
                  </select>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                学习目标
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-2">每日学习时长 (分钟)</label>
                  <input
                    type="range"
                    min="10"
                    max="120"
                    step="10"
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>10分钟</span>
                    <span className="text-primary font-medium">{dailyGoal}分钟</span>
                    <span>120分钟</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                设置
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-light transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-text-secondary" />
                    <span className="text-text-primary">通知提醒</span>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      notifications ? 'bg-primary' : 'bg-surface-light'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        notifications ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-light transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-text-secondary" />
                    <span className="text-text-primary">隐私设置</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-secondary" />
                </div>
              </div>
            </Card>

            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
              >
                <Save className="w-5 h-5" />
                {saved ? '已保存!' : '保存设置'}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500/20 text-red-400 rounded-xl font-medium hover:bg-red-500/30 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                退出登录
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
