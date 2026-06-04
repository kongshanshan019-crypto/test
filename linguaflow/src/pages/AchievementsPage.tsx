import { motion } from 'framer-motion';
import {
  Trophy,
  Star,
  Flame,
  BookOpen,
  Globe,
  Lock,
  Check
} from 'lucide-react';
import { Card } from '../components/common';
import { useAchievementStore, useUserStore } from '../stores';
import type { AchievementType } from '../types';

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

const achievementIcons: Record<AchievementType, typeof Star> = {
  streak: Flame,
  course: BookOpen,
  level: Trophy,
  special: Globe
};

const achievementColors: Record<AchievementType, string> = {
  streak: 'from-amber-500 to-orange-500',
  course: 'from-blue-500 to-cyan-500',
  level: 'from-purple-500 to-pink-500',
  special: 'from-green-500 to-emerald-500'
};

export default function AchievementsPage() {
  const { achievements, userAchievements } = useAchievementStore();
  const { user } = useUserStore();

  const earnedAchievements = achievements.filter(a => userAchievements.includes(a.id));
  const lockedAchievements = achievements.filter(a => !userAchievements.includes(a.id));

  return (
    <div className="p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto space-y-8"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-text-primary mb-2">成就中心</h1>
          <p className="text-text-secondary">解锁成就，见证你的学习之旅</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-secondary">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-text-primary">当前等级</h2>
                  <span className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-lg font-bold">
                    Lv.{user?.level || 1}
                  </span>
                </div>
                <p className="text-text-secondary">
                  {user?.exp || 0} / {((user?.level || 1) + 1) * 1000} 经验值
                </p>
                <div className="mt-2 h-3 bg-surface-light rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(user?.exp || 0) % 1000 / 10}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
              <div className="text-center px-6 border-l border-surface-light">
                <p className="text-4xl font-bold text-accent">{earnedAchievements.length}</p>
                <p className="text-sm text-text-secondary">已获得</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold text-text-primary mb-4">已解锁成就</h2>
          <div className="grid grid-cols-4 gap-4">
            {earnedAchievements.map((achievement, index) => {
              const Icon = achievementIcons[achievement.type];
              return (
                <motion.div
                  key={achievement.id}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="p-6 text-center relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${achievementColors[achievement.type]} opacity-10`} />
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${achievementColors[achievement.type]} flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-1">{achievement.title}</h3>
                    <p className="text-xs text-text-secondary mb-2">{achievement.description}</p>
                    <div className="flex items-center justify-center gap-1 text-xs text-accent">
                      <Star className="w-3 h-3" />
                      <span>+{achievement.rewardExp} XP</span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold text-text-primary mb-4">待解锁成就</h2>
          <div className="grid grid-cols-4 gap-4">
            {lockedAchievements.map((achievement, index) => {
              return (
                <motion.div
                  key={achievement.id}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="p-6 text-center relative opacity-60">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-light flex items-center justify-center">
                      <Lock className="w-8 h-8 text-text-secondary" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-1">{achievement.title}</h3>
                    <p className="text-xs text-text-secondary mb-2">{achievement.description}</p>
                    <div className="flex items-center justify-center gap-1 text-xs text-text-secondary">
                      <Star className="w-3 h-3" />
                      <span>+{achievement.rewardExp} XP</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">成就进度</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <Flame className="w-5 h-5 text-amber-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-text-primary">连续学习30天</span>
                    <span className="text-xs text-text-secondary">{(user?.streak || 0)}/30</span>
                  </div>
                  <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${Math.min((user?.streak || 0) / 30 * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-text-primary">掌握100个单词</span>
                    <span className="text-xs text-text-secondary">127/100</span>
                  </div>
                  <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Trophy className="w-5 h-5 text-purple-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-text-primary">达到等级10</span>
                    <span className="text-xs text-text-secondary">{(user?.level || 1)}/10</span>
                  </div>
                  <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${Math.min((user?.level || 1) / 10 * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
