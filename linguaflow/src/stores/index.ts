import { create } from 'zustand';
import type { User, Language } from '../types';
import { mockUser } from '../data/mockData';

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, nickname: string, language: Language) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addExp: (amount: number) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (email && password.length >= 6) {
      const user = { ...mockUser, email };
      set({ user, isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  },

  register: async (email: string, password: string, nickname: string, language: Language) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (email && password.length >= 6 && nickname) {
      const user: User = {
        id: `user-${Date.now()}`,
        email,
        nickname,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nickname}`,
        targetLanguage: language,
        level: 1,
        exp: 0,
        streak: 0,
        joinedAt: new Date()
      };
      set({ user, isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('user');
  },

  updateProfile: (data) => {
    const { user } = get();
    if (user) {
      const updatedUser = { ...user, ...data };
      set({ user: updatedUser });
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  },

  addExp: (amount: number) => {
    const { user } = get();
    if (user) {
      const newExp = user.exp + amount;
      const newLevel = Math.floor(newExp / 1000) + 1;
      const updatedUser = { ...user, exp: newExp, level: newLevel };
      set({ user: updatedUser });
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }
}));

interface CourseStore {
  courses: typeof import('../data/mockData').mockCourses;
  currentCourse: typeof import('../data/mockData').mockCourses[0] | null;
  enrolledCourses: string[];
  enrolledCoursesData: typeof import('../data/mockData').mockCourses;
  enrollCourse: (courseId: string) => void;
  setCurrentCourse: (course: typeof import('../data/mockData').mockCourses[0] | null) => void;
  getCourseById: (id: string) => typeof import('../data/mockData').mockCourses[0] | undefined;
}

export const useCourseStore = create<CourseStore>((set, get) => ({
  courses: [],
  currentCourse: null,
  enrolledCourses: ['course-en-001'],
  enrolledCoursesData: [],

  enrollCourse: (courseId: string) => {
    const { enrolledCourses, enrolledCoursesData, courses } = get();
    if (!enrolledCourses.includes(courseId)) {
      const course = courses.find(c => c.id === courseId);
      if (course) {
        set({
          enrolledCourses: [...enrolledCourses, courseId],
          enrolledCoursesData: [...enrolledCoursesData, course]
        });
      }
    }
  },

  setCurrentCourse: (course) => set({ currentCourse: course }),

  getCourseById: (id: string) => {
    return get().courses.find(c => c.id === id);
  }
}));

import { mockCourses } from '../data/mockData';
import type { Lesson, LessonType } from '../types';

interface LearningStore {
  currentLesson: Lesson | null;
  learningMode: LessonType;
  currentWordIndex: number;
  sessionCorrect: number;
  sessionTotal: number;
  sessionXpEarned: number;
  startLesson: (lesson: Lesson, mode: LessonType) => void;
  nextWord: () => void;
  prevWord: () => void;
  recordAnswer: (correct: boolean) => void;
  completeLesson: () => { correct: number; total: number; xp: number };
  resetSession: () => void;
}

export const useLearningStore = create<LearningStore>((set, get) => ({
  currentLesson: null,
  learningMode: 'vocabulary',
  currentWordIndex: 0,
  sessionCorrect: 0,
  sessionTotal: 0,
  sessionXpEarned: 0,

  startLesson: (lesson, mode) => {
    set({
      currentLesson: lesson,
      learningMode: mode,
      currentWordIndex: 0,
      sessionCorrect: 0,
      sessionTotal: 0,
      sessionXpEarned: 0
    });
  },

  nextWord: () => {
    const { currentWordIndex, currentLesson } = get();
    if (currentLesson?.content.words && currentWordIndex < currentLesson.content.words.length - 1) {
      set({ currentWordIndex: currentWordIndex + 1 });
    }
  },

  prevWord: () => {
    const { currentWordIndex } = get();
    if (currentWordIndex > 0) {
      set({ currentWordIndex: currentWordIndex - 1 });
    }
  },

  recordAnswer: (correct: boolean) => {
    const { sessionCorrect, sessionTotal, sessionXpEarned, currentLesson } = get();
    set({
      sessionCorrect: correct ? sessionCorrect + 1 : sessionCorrect,
      sessionTotal: sessionTotal + 1,
      sessionXpEarned: correct ? sessionXpEarned + 10 : sessionXpEarned
    });
  },

  completeLesson: () => {
    const { sessionCorrect, sessionTotal, sessionXpEarned, currentLesson } = get();
    const xp = currentLesson?.expReward || 50;
    return { correct: sessionCorrect, total: sessionTotal, xp: sessionXpEarned + xp };
  },

  resetSession: () => {
    set({
      currentLesson: null,
      learningMode: 'vocabulary',
      currentWordIndex: 0,
      sessionCorrect: 0,
      sessionTotal: 0,
      sessionXpEarned: 0
    });
  }
}));

interface AchievementStore {
  achievements: typeof import('../data/mockData').mockAchievements;
  userAchievements: string[];
  earnedAchievements: typeof import('../data/mockData').mockAchievements;
  addAchievement: (id: string) => boolean;
  checkAchievements: (userExp: number, streak: number, lessonsCompleted: number) => void;
}

export const useAchievementStore = create<AchievementStore>((set, get) => ({
  achievements: [],
  userAchievements: ['ach-001'],
  earnedAchievements: [],

  addAchievement: (id: string) => {
    const { userAchievements, achievements } = get();
    if (!userAchievements.includes(id)) {
      const achievement = achievements.find(a => a.id === id);
      if (achievement) {
        set({
          userAchievements: [...userAchievements, id],
          earnedAchievements: [...get().earnedAchievements, achievement]
        });
        return true;
      }
    }
    return false;
  },

  checkAchievements: (userExp, streak, lessonsCompleted) => {
    const { achievements, userAchievements, addAchievement } = get();
    achievements.forEach(ach => {
      if (userAchievements.includes(ach.id)) return;

      let earned = false;
      switch (ach.type) {
        case 'streak':
          earned = streak >= ach.requirement;
          break;
        case 'level':
          earned = Math.floor(userExp / 1000) + 1 >= ach.requirement;
          break;
        case 'course':
          earned = lessonsCompleted >= ach.requirement;
          break;
      }

      if (earned) {
        addAchievement(ach.id);
      }
    });
  }
}));

interface ProgressStore {
  dailyGoal: number;
  todayMinutes: number;
  weeklyData: { day: string; minutes: number }[];
  totalWordsLearned: number;
  totalLessonsCompleted: number;
  updateTodayProgress: (minutes: number) => void;
  addWordsLearned: (count: number) => void;
  completeLesson: () => void;
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  dailyGoal: 30,
  todayMinutes: 15,
  weeklyData: [
    { day: '周一', minutes: 25 },
    { day: '周二', minutes: 30 },
    { day: '周三', minutes: 20 },
    { day: '周四', minutes: 35 },
    { day: '周五', minutes: 40 },
    { day: '周六', minutes: 15 },
    { day: '周日', minutes: 15 }
  ],
  totalWordsLearned: 127,
  totalLessonsCompleted: 8,

  updateTodayProgress: (minutes: number) => {
    set({ todayMinutes: get().todayMinutes + minutes });
  },

  addWordsLearned: (count: number) => {
    set({ totalWordsLearned: get().totalWordsLearned + count });
  },

  completeLesson: () => {
    set({ totalLessonsCompleted: get().totalLessonsCompleted + 1 });
  }
}));

interface CommunityStore {
  posts: typeof import('../data/mockData').mockPosts;
  groups: typeof import('../data/mockData').mockGroups;
  likePost: (postId: string) => void;
}

export const useCommunityStore = create<CommunityStore>((set, get) => ({
  posts: [],
  groups: [],

  likePost: (postId: string) => {
    const { posts } = get();
    set({
      posts: posts.map(p =>
        p.id === postId ? { ...p, likes: p.likes + 1 } : p
      )
    });
  }
}));

import { mockAchievements, mockPosts, mockGroups } from '../data/mockData';

useCourseStore.setState({ courses: mockCourses });
useAchievementStore.setState({ achievements: mockAchievements });
useCommunityStore.setState({ posts: mockPosts, groups: mockGroups });
