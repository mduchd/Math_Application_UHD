'use client';

import React, { useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useThemeStore } from '../stores/useThemeStore';
import { playfulSpring, gentleSpring } from '@/lib/motion';

interface ThemeToggleProps {
  variant?: 'pill' | 'icon' | 'segmented';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'pill',
  className = '',
}) => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const hydrate = useThemeStore((state) => state.hydrate);
  const isHydrated = useThemeStore((state) => state.isHydrated);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!isHydrated) {
    // Skeleton placeholder to prevent layout shifts
    return (
      <div className={`h-9 w-28 rounded-2xl bg-amber-50/50 animate-pulse ${className}`} />
    );
  }

  const isDark = theme === 'dark';

  if (variant === 'icon') {
    return (
      <m.button
        type="button"
        onClick={toggleTheme}
        whileHover={{ scale: 1.08, rotate: isDark ? -8 : 12 }}
        whileTap={{ scale: 0.94 }}
        transition={playfulSpring}
        aria-label={isDark ? 'Chuyển sang chế độ Sáng (Ban ngày)' : 'Chuyển sang chế độ Tối (Ban đêm)'}
        title={isDark ? 'Chuyển sang chế độ Sáng (Ban ngày)' : 'Chuyển sang chế độ Tối (Ban đêm bảo vệ mắt)'}
        className={`relative w-10 h-10 rounded-2xl flex items-center justify-center border-2 transition-all select-none ${
          isDark
            ? 'bg-slate-800 border-indigo-400 text-amber-300 shadow-tactile-purple'
            : 'bg-amber-100 border-amber-300 text-amber-800 shadow-tactile-yellow'
        } ${className}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <m.span
              key="moon"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center justify-center"
            >
              <Moon className="w-5 h-5 fill-indigo-300 text-indigo-300" />
            </m.span>
          ) : (
            <m.span
              key="sun"
              initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center justify-center"
            >
              <Sun className="w-5 h-5 fill-amber-400 text-amber-500" />
            </m.span>
          )}
        </AnimatePresence>
      </m.button>
    );
  }

  if (variant === 'segmented') {
    return (
      <div
        className={`inline-flex items-center p-1 rounded-2xl border-2 transition-colors select-none ${
          isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'
        } ${className}`}
      >
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-display text-xs font-black transition-all ${
            !isDark
              ? 'bg-amber-400 text-amber-950 shadow-xs border-2 border-amber-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Sáng</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-display text-xs font-black transition-all ${
            isDark
              ? 'bg-indigo-600 text-white shadow-xs border-2 border-indigo-500'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Tối</span>
        </button>
      </div>
    );
  }

  // Default: Pill toggle (Interactive slider switch with Day/Night character)
  return (
    <m.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ y: -1, scale: 1.02 }}
      whileTap={{ y: 1, scale: 0.98 }}
      transition={playfulSpring}
      aria-label={isDark ? 'Chuyển sang chế độ Sáng (Ban ngày)' : 'Chuyển sang chế độ Tối (Ban đêm)'}
      title={isDark ? 'Đang bật Ban đêm. Bấm để đổi sang Ban ngày' : 'Đang bật Ban ngày. Bấm để đổi sang Ban đêm dịu mắt'}
      className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-2xl border-2 select-none transition-all shadow-xs ${
        isDark
          ? 'bg-slate-800 hover:bg-slate-700 border-indigo-400/80 text-indigo-100 hover:shadow-tactile-purple'
          : 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-950 hover:shadow-tactile-yellow'
      } ${className}`}
    >
      <div
        className={`w-6 h-6 rounded-xl flex items-center justify-center transition-all ${
          isDark
            ? 'bg-indigo-950/80 border border-indigo-400/50 text-indigo-300'
            : 'bg-amber-300/80 border border-amber-400 text-amber-900'
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <m.span
              key="dark-icon"
              initial={{ rotate: -40, scale: 0.6 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 40, scale: 0.6 }}
              transition={{ duration: 0.16 }}
              className="inline-flex"
            >
              <Moon className="w-3.5 h-3.5 fill-indigo-300 text-indigo-300" />
            </m.span>
          ) : (
            <m.span
              key="light-icon"
              initial={{ rotate: 40, scale: 0.6 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: -40, scale: 0.6 }}
              transition={{ duration: 0.16 }}
              className="inline-flex"
            >
              <Sun className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
            </m.span>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col text-left leading-none">
        <span className="font-display font-black text-xs">
          {isDark ? 'Ban đêm' : 'Ban ngày'}
        </span>
        <span
          className={`text-[9px] font-bold ${
            isDark ? 'text-indigo-300/80' : 'text-amber-800/80'
          }`}
        >
          {isDark ? '🌙 Dịu mắt' : '☀️ Sáng rõ'}
        </span>
      </div>
    </m.button>
  );
};
