export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  nativeLanguage: string;
  targetLanguages: string[];
  level: Record<string, LanguageLevel>;
  createdAt: Date;
}

export type LanguageLevel = 'beginner' | 'elementary' | 'intermediate' | 'advanced' | 'proficient';

export interface Course {
  id: string;
  language: string;
  level: LanguageLevel;
  title: string;
  description: string;
  thumbnail: string;
  lessons: Lesson[];
  totalLessons: number;
  duration: string;
  enrolledCount: number;
  rating: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: LessonType;
  content: LessonContent;
  order: number;
  duration: number;
  completed?: boolean;
}

export type LessonType = 'vocabulary' | 'grammar' | 'speaking' | 'listening' | 'reading';

export interface LessonContent {
  vocabulary?: VocabularyItem[];
  grammar?: GrammarItem[];
  speaking?: SpeakingItem[];
  listening?: ListeningItem[];
  reading?: ReadingItem[];
}

export interface VocabularyItem {
  id: string;
  word: string;
  pronunciation: string;
  translation: string;
  example: string;
  audio?: string;
  image?: string;
}

export interface GrammarItem {
  id: string;
  rule: string;
  explanation: string;
  examples: string[];
  exercises: GrammarExercise[];
}

export interface GrammarExercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface SpeakingItem {
  id: string;
  text: string;
  translation: string;
  audio?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ListeningItem {
  id: string;
  audio: string;
  transcript: string;
  translation: string;
  questions: ListeningQuestion[];
}

export interface ListeningQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface ReadingItem {
  id: string;
  title: string;
  content: string;
  translation: string;
  vocabulary: VocabularyItem[];
  questions: ReadingQuestion[];
}

export interface ReadingQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  score: number;
  timeSpent: number;
  completedAt?: Date;
  attempts: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: AchievementRequirement;
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface AchievementRequirement {
  type: 'lessons' | 'streak' | 'score' | 'time' | 'vocabulary';
  value: number;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  language: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
}

export interface LearningPath {
  id: string;
  userId: string;
  language: string;
  currentLevel: LanguageLevel;
  targetLevel: LanguageLevel;
  recommendedCourses: Course[];
  weeklyGoal: WeeklyGoal;
  strengths: string[];
  weaknesses: string[];
}

export interface WeeklyGoal {
  lessonsPerWeek: number;
  minutesPerDay: number;
  vocabularyPerDay: number;
}
