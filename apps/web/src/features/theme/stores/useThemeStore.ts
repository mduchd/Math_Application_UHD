import { create } from 'zustand';
import { ThemeMode } from '../types';
import { sound } from '@/lib/sound';

interface ThemeState {
  theme: ThemeMode;
  isHydrated: boolean;
  setTheme: (theme: ThemeMode, playSound?: boolean) => void;
  toggleTheme: () => void;
  hydrate: () => void;
}

const STORAGE_KEY = 'kid_app_theme';

const applyThemeToDOM = (theme: ThemeMode) => {
  if (typeof window === 'undefined') return;
  try {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch {}
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'light',
  isHydrated: false,

  hydrate: () => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;

      let initialTheme: ThemeMode = 'light';
      if (stored === 'light' || stored === 'dark') {
        initialTheme = stored;
      } else {
        // Default to light for elementary students, or follow system if night
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        initialTheme = prefersDark ? 'dark' : 'light';
      }

      applyThemeToDOM(initialTheme);

      set({
        theme: initialTheme,
        isHydrated: true,
      });
    } catch {
      set({ isHydrated: true });
    }
  },

  setTheme: (theme: ThemeMode, playSound = true) => {
    set({ theme });
    applyThemeToDOM(theme);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {}
    }

    if (playSound) {
      sound.playThemeToggle(theme);
    }
  },

  toggleTheme: () => {
    const current = get().theme;
    const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
    get().setTheme(next, true);
  },
}));
