import { create } from 'zustand';
import { User, AssessmentSubmission, AILearningPlan } from '@kid-elearning/types';
import { clearStoredAuth, getStoredUser, setStoredAuth } from '@/lib/api';

export type { User };

interface AppState {
  currentUser: User | null;
  currentSubmission: AssessmentSubmission | null;
  currentPlan: AILearningPlan | null;
  stars: number;
  isHydrated: boolean;
  setUser: (user: User | null) => void;
  setSubmission: (submission: AssessmentSubmission | null) => void;
  setPlan: (plan: AILearningPlan | null) => void;
  addStars: (amount: number) => void;
  hydrate: () => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: null,
  currentSubmission: null,
  currentPlan: null,
  stars: 120,
  isHydrated: false,

  hydrate: () => {
    if (typeof window === 'undefined') return;
    try {
      const storedUser = getStoredUser();
      const rawSub = localStorage.getItem('kid_submission');
      const rawPlan = localStorage.getItem('kid_plan');
      const rawStars = localStorage.getItem('kid_stars');

      set({
        currentUser: storedUser,
        currentSubmission: rawSub ? JSON.parse(rawSub) : null,
        currentPlan: rawPlan ? JSON.parse(rawPlan) : null,
        stars: rawStars ? parseInt(rawStars, 10) : 120,
        isHydrated: true,
      });
    } catch {
      set({ isHydrated: true });
    }
  },

  setUser: (user) => {
    set({ currentUser: user });
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('kid_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('kid_user');
      }
    }
  },

  setSubmission: (submission) => {
    set({ currentSubmission: submission });
    if (typeof window !== 'undefined') {
      if (submission) localStorage.setItem('kid_submission', JSON.stringify(submission));
      else localStorage.removeItem('kid_submission');
    }
  },

  setPlan: (plan) => {
    set({ currentPlan: plan });
    if (typeof window !== 'undefined') {
      if (plan) localStorage.setItem('kid_plan', JSON.stringify(plan));
      else localStorage.removeItem('kid_plan');
    }
  },

  addStars: (amount: number) => {
    set((state) => {
      const newStars = state.stars + amount;
      if (typeof window !== 'undefined') {
        localStorage.setItem('kid_stars', newStars.toString());
      }
      return { stars: newStars };
    });
  },

  logout: () => {
    clearStoredAuth();
    set({ currentUser: null, currentSubmission: null, currentPlan: null });
  },
}));
