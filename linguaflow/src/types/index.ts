export type Language = 'en' | 'ja' | 'ko';
export type Level = 1 | 2 | 3 | 4 | 5;
export type LessonType = 'vocabulary' | 'grammar' | 'speaking' | 'listening';
export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';
export type AchievementType = 'streak' | 'course' | 'level' | 'special';

export interface User {
  id: string;
  email: string;
  nickname: string;
  avatar: string;
  targetLanguage: Language;
  level: number;
  exp: number;
  streak: number;
  joinedAt: Date;
}

export interface Word {
  id: string;
  text: string;
  translation: string;
  pronunciation: string;
  example: string;
  exampleTranslation: string;
  mastery: number;
}

export interface GrammarPoint {
  id: string;
  title: string;
  explanation: string;
  examples: { text: string; translation: string }[];
  exercises: GrammarExercise[];
}

export interface GrammarExercise {
  id: string;
  type: 'fill_blank' | 'correct' | 'translate';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface SpeakingContent {
  prompt: string;
  promptTranslation: string;
  referenceText: string;
  referenceAudio?: string;
}

export interface ListeningContent {
  audioText: string;
  options?: { text: string; isCorrect: boolean }[];
  dictationText?: string;
}

export interface LessonContent {
  words?: Word[];
  grammar?: GrammarPoint;
  speaking?: SpeakingContent;
  listening?: ListeningContent;
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  content: LessonContent;
  completed: boolean;
  expReward: number;
}

export interface Course {
  id: string;
  language: Language;
  level: Level;
  title: string;
  description: string;
  coverImage: string;
  duration: number;
  lessons: Lesson[];
  enrolledCount: number;
}

export interface Progress {
  userId: string;
  courseId: string;
  lessonId: string;
  status: ProgressStatus;
  score: number;
  completedAt?: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: AchievementType;
  requirement: number;
  rewardExp: number;
}

export interface LearningSession {
  lessonId: string;
  startTime: Date;
  correctCount: number;
  totalCount: number;
  xpEarned: number;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: Date;
  language: Language;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  language: Language;
  coverImage: string;
}
