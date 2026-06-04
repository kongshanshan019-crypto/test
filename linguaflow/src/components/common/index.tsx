import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  const Component = hover ? motion.div : 'div';
  const props = hover
    ? {
        whileHover: { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' },
        transition: { duration: 0.2 }
      }
    : {};

  return (
    <Component
      className={`bg-surface rounded-2xl border border-surface-light ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
}

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function ProgressRing({ progress, size = 120, strokeWidth = 8, className = '' }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-surface-light"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-text-primary">{progress}%</span>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  color?: string;
}

export function StatCard({ label, value, icon, trend, color = 'text-primary' }: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-secondary mb-1">{label}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          {trend && (
            <p className="text-xs text-secondary mt-1">↑ {trend}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-surface-light ${color}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

interface LanguageBadgeProps {
  language: 'en' | 'ja' | 'ko';
  size?: 'sm' | 'md';
}

const languageConfig: Record<string, { label: string; color: string; flag: string }> = {
  en: { label: '英语', color: 'bg-blue-500/20 text-blue-400', flag: '🇬🇧' },
  ja: { label: '日语', color: 'bg-pink-500/20 text-pink-400', flag: '🇯🇵' },
  ko: { label: '韩语', color: 'bg-purple-500/20 text-purple-400', flag: '🇰🇷' },
};

export function LanguageBadge({ language, size = 'sm' }: LanguageBadgeProps) {
  const config = languageConfig[language];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg ${config.color} ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
      <span>{config.flag}</span>
      <span>{config.label}</span>
    </span>
  );
}

interface LevelBadgeProps {
  level: number;
}

export function LevelBadge({ level }: LevelBadgeProps) {
  const colors = [
    'bg-gray-500/20 text-gray-400',
    'bg-green-500/20 text-green-400',
    'bg-blue-500/20 text-blue-400',
    'bg-purple-500/20 text-purple-400',
    'bg-amber-500/20 text-amber-400',
  ];
  const color = colors[Math.min(level - 1, 4)] || colors[0];

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-lg ${color} text-xs font-medium`}>
      Lv.{level}
    </span>
  );
}
