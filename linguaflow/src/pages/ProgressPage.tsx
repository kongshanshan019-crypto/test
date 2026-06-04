import { motion } from 'framer-motion';
import {
  Calendar,
  Flame,
  BookOpen,
  Trophy,
  TrendingUp,
  Clock,
  Target,
  Award
} from 'lucide-react';
import { Card, StatCard } from '../components/common';
import { useProgressStore, useUserStore } from '../stores';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

const learningHeatmap = [
  { date: '周一', intensity: 3 },
  { date: '周二', intensity: 5 },
  { date: '周三', intensity: 2 },
  { date: '周四', intensity: 4 },
  { date: '周五', intensity: 5 },
  { date: '周六', intensity: 1 },
  { date: '周日', intensity: 2 },
];

const radarData = [
  { name: '词汇', value: 85, color: '#6366f1' },
  { name: '语法', value: 70, color: '#10b981' },
  { name: '口语', value: 60, color: '#f59e0b' },
  { name: '听力', value: 75, color: '#8b5cf6' },
];

export default function ProgressPage() {
  const { user } = useUserStore();
  const { dailyGoal, todayMinutes, weeklyData, totalWordsLearned, totalLessonsCompleted } = useProgressStore();

  const weeklyTotal = weeklyData.reduce((sum, day) => sum + day.minutes, 0);

  return (
    <div className="p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto space-y-8"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-text-primary mb-2">学习进度</h1>
          <p className="text-text-secondary">追踪你的学习旅程</p>
        </motion.div>

        <div className="grid grid-cols-4 gap-4">
          <motion.div variants={itemVariants}>
            <StatCard
              label="今日学习"
              value={`${todayMinutes}分钟`}
              icon={<Clock className="w-6 h-6" />}
              color="text-primary"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="本周学习"
              value={`${weeklyTotal}分钟`}
              icon={<Calendar className="w-6 h-6" />}
              color="text-secondary"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="已学单词"
              value={totalWordsLearned}
              icon={<BookOpen className="w-6 h-6" />}
              color="text-accent"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="完成课程"
              value={totalLessonsCompleted}
              icon={<Trophy className="w-6 h-6" />}
              color="text-purple-400"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <motion.div variants={itemVariants} className="col-span-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-text-primary">本周学习时长</h2>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <TrendingUp className="w-4 h-4" />
                  <span>较上周 +15%</span>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData} barGap={8}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Bar dataKey="minutes" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-4">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-6">学习日历</h2>
              <div className="space-y-2">
                {learningHeatmap.map((day, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xs text-text-secondary w-8">{day.date}</span>
                    <div className="flex-1 flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-6 flex-1 rounded ${
                            day.intensity >= level
                              ? 'bg-gradient-to-r from-primary to-secondary'
                              : 'bg-surface-light'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 text-xs text-text-secondary">
                <span>较少</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className="w-4 h-3 rounded bg-gradient-to-r from-primary to-secondary"
                    />
                  ))}
                </div>
                <span>较多</span>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-6">能力分布</h2>
              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={radarData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {radarData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                {radarData.map((item, index) => (
                  <div key={index} className="text-center">
                    <p className="text-2xl font-bold text-text-primary">{item.value}</p>
                    <div className="w-4 h-4 mx-auto rounded mb-1" style={{ backgroundColor: item.color }} />
                    <p className="text-xs text-text-secondary">{item.name}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-6">学习成就</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-light">
                  <div className="p-3 rounded-xl bg-accent/20">
                    <Flame className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-text-primary">连续学习</p>
                      <p className="text-sm text-accent font-bold">{user?.streak || 0}天</p>
                    </div>
                    <div className="mt-2 h-2 bg-bg-dark rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${Math.min((user?.streak || 0) / 30 * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-light">
                  <div className="p-3 rounded-xl bg-secondary/20">
                    <Target className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-text-primary">今日目标</p>
                      <p className="text-sm text-secondary font-bold">{todayMinutes}/{dailyGoal}分钟</p>
                    </div>
                    <div className="mt-2 h-2 bg-bg-dark rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full"
                        style={{ width: `${Math.min(todayMinutes / dailyGoal * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-light">
                  <div className="p-3 rounded-xl bg-primary/20">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-text-primary">经验等级</p>
                      <p className="text-sm text-primary font-bold">Lv.{user?.level || 1}</p>
                    </div>
                    <div className="mt-2 h-2 bg-bg-dark rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(user?.exp || 0) % 1000 / 10}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
