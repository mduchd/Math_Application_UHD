'use client';

import React from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { Star, Sparkles, Search, LogOut, LogIn } from 'lucide-react';
import { sound } from '@/lib/sound';
import { AppLogo } from '@/components/kid/AppLogo';
import type { User } from '@/stores/useAppStore';

interface StudentTopHeaderProps {
  currentUser: User | null;
  stars: number;
  onLogout: () => void;
}

export const StudentTopHeader: React.FC<StudentTopHeaderProps> = ({
  currentUser,
  stars,
  onLogout,
}) => {
  const gradeText = currentUser?.gradeLevel ? `Lớp ${currentUser.gradeLevel}` : 'Lớp 3';

  const handleNavClick = () => {
    sound.playPop();
  };

  return (
    <header className="h-16 px-4 md:px-8 flex items-center justify-between border-b border-amber-200/40 dark:border-slate-800/60 bg-kid-cream/95 dark:bg-[#0B1120]/95 backdrop-blur-md sticky top-0 z-10 transition-colors">
      {/* Left: Mobile Brand & Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        {/* Visible only on mobile when sidebar is hidden */}
        <div className="md:hidden flex items-center gap-2">
          <Link href="/" onClick={handleNavClick}>
            <AppLogo size="xs" variant="icon" />
          </Link>
        </div>

        {/* Search input matching app content */}
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Tìm kiếm bài học, trò chơi, chủ đề..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800/80 border-2 border-kid-border dark:border-slate-700 rounded-2xl text-xs md:text-sm font-bold text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Right: Gamification Badges & Student Avatar */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Star Badge */}
        <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-200 dark:border-amber-600/50 px-3 py-1.5 rounded-2xl shadow-xs">
          <m.span
            className="inline-flex"
            animate={{ rotate: [0, 10, -8, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }}
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
          </m.span>
          <span className="font-black font-display text-xs md:text-sm text-amber-900 dark:text-amber-200">
            {stars} Sao
          </span>
        </div>

        {/* Grade Level Badge */}
        <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 rounded-2xl text-xs font-black border-2 border-sky-200 dark:border-sky-700/50">
          <Sparkles className="w-3.5 h-3.5" /> {gradeText}
        </span>

        {/* Student Profile Pill */}
        {currentUser ? (
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border-2 shadow-xs ${
                currentUser.isGuest
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/50'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-700/50'
              }`}
            >
              <span className="text-lg md:text-xl">{currentUser.avatarMascot || '🐰'}</span>
              <span
                className={`font-extrabold text-xs md:text-sm max-w-[110px] truncate ${
                  currentUser.isGuest
                    ? 'text-amber-950 dark:text-amber-200'
                    : 'text-emerald-900 dark:text-emerald-200'
                }`}
              >
                {currentUser.fullName}
              </span>
              {currentUser.isGuest && (
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-400 text-amber-950 border border-amber-500 shrink-0">
                  Khách
                </span>
              )}
            </div>
            <button
              onClick={onLogout}
              title="Đăng xuất"
              type="button"
              className="p-2 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-rose-300 hover:bg-rose-50 text-slate-600 dark:text-slate-300 hover:text-rose-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login?role=student"
              onClick={handleNavClick}
              className="flex items-center gap-1 px-3 py-1.5 rounded-2xl text-xs font-black border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 bg-white dark:bg-slate-800 text-slate-700 dark:text-white transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Đăng nhập</span>
            </Link>
            <Link
              href="/assessment"
              onClick={handleNavClick}
              className="flex items-center gap-1.5 bg-amber-400 text-amber-950 px-3.5 py-1.5 rounded-2xl text-xs font-black border-2 border-amber-500 shadow-tactile-yellow active:translate-y-1 active:shadow-none transition-transform"
            >
              <span>Khảo sát</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
