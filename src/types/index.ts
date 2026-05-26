export type Language = 'en' | 'ja' | 'ko';
export type Level = 'beginner' | 'intermediate' | 'advanced' | 'proficient';
export type LessonType = 'vocabulary' | 'grammar' | 'speaking' | 'listening';
export type UserRole = 'guest' | 'user' | 'premium';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  nativeLanguage: string;
  learningLanguages: Language[];
  level: Level;
  streak: number;
  totalXP: number;
  role: UserRole;
  createdAt: string;
}

export interface Course {
  id: string;
  language: Language;
  title: string;
  titleCn: string;
  description: string;
  level: Level;
  imageUrl: string;
  totalLessons: number;
  lessons: Lesson[];
  enrolledCount: number;
  rating: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  type: LessonType;
  duration: number;
  exercises: Exercise[];
  isCompleted: boolean;
  progress: number;
}

export interface Exercise {
  id: string;
  lessonId: string;
  type: 'flashcard' | 'multiple-choice' | 'fill-blank' | 'speak' | 'listen';
  question: string;
  answer: string | string[];
  options?: string[];
  audioUrl?: string;
  hint?: string;
}

export interface Progress {
  lessonId: string;
  completed: boolean;
  score: number;
  attempts: number;
  lastAttempt: string;
  timeSpent: number;
}

export interface Achievement {
  id: string;
  name: string;
  nameCn: string;
  description: string;
  descriptionCn: string;
  icon: string;
  category: 'streak' | 'course' | 'accuracy' | 'social' | 'milestone';
  requirement: number;
  xpReward: number;
  earnedAt?: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  language?: Language;
}

export interface CommunityStats {
  totalPosts: number;
  todayPosts: number;
  activeUsers: number;
}

export interface DailyGoal {
  type: 'lessons' | 'xp' | 'streak' | 'practice';
  target: number;
  current: number;
  completed: boolean;
}

export interface LearningPath {
  language: Language;
  currentLevel: Level;
  nextLevel: Level;
  progress: number;
  recommendedLessons: string[];
  weakAreas: string[];
}
