import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Course, UserProgress, Achievement, CommunityPost, LearningPath } from '../types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  courses: Course[];
  userProgress: UserProgress[];
  achievements: Achievement[];
  communityPosts: CommunityPost[];
  learningPaths: LearningPath[];
  currentLanguage: string;
  
  setUser: (user: User | null) => void;
  logout: () => void;
  setCourses: (courses: Course[]) => void;
  updateProgress: (progress: UserProgress) => void;
  unlockAchievement: (achievementId: string) => void;
  addCommunityPost: (post: CommunityPost) => void;
  setCurrentLanguage: (language: string) => void;
  setLearningPath: (path: LearningPath) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      courses: [],
      userProgress: [],
      achievements: [],
      communityPosts: [],
      learningPaths: [],
      currentLanguage: 'english',

      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),

      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        userProgress: [],
        achievements: []
      }),

      setCourses: (courses) => set({ courses }),

      updateProgress: (progress) => set((state) => {
        const existingIndex = state.userProgress.findIndex(
          p => p.lessonId === progress.lessonId && p.courseId === progress.courseId
        );
        if (existingIndex >= 0) {
          const newProgress = [...state.userProgress];
          newProgress[existingIndex] = progress;
          return { userProgress: newProgress };
        }
        return { userProgress: [...state.userProgress, progress] };
      }),

      unlockAchievement: (achievementId) => set((state) => ({
        achievements: state.achievements.map(a => 
          a.id === achievementId 
            ? { ...a, unlocked: true, unlockedAt: new Date() }
            : a
        )
      })),

      addCommunityPost: (post) => set((state) => ({
        communityPosts: [post, ...state.communityPosts]
      })),

      setCurrentLanguage: (language) => set({ currentLanguage: language }),

      setLearningPath: (path) => set((state) => {
        const existingIndex = state.learningPaths.findIndex(
          p => p.language === path.language
        );
        if (existingIndex >= 0) {
          const newPaths = [...state.learningPaths];
          newPaths[existingIndex] = path;
          return { learningPaths: newPaths };
        }
        return { learningPaths: [...state.learningPaths, path] };
      }),
    }),
    {
      name: 'language-learning-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        userProgress: state.userProgress,
        achievements: state.achievements,
        currentLanguage: state.currentLanguage,
        learningPaths: state.learningPaths
      })
    }
  )
);
