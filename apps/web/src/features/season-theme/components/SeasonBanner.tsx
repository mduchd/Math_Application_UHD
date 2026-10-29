'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronRight } from 'lucide-react';
import { useSeasonStore } from '../stores/useSeasonStore';
import { SEASONS } from '../constants/seasons';
import { gentleSpring } from '@/lib/motion';
import { sound } from '@/lib/sound';

interface SeasonBannerProps {
  className?: string;
}

export const SeasonBanner: React.FC<SeasonBannerProps> = ({ className = '' }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const season = useSeasonStore((state) => state.season);
  const isHydrated = useSeasonStore((state) => state.isHydrated);

  if (!isHydrated || isDismissed) return null;

  const currentSeason = SEASONS[season] || SEASONS.spring;

  const handleDismiss = () => {
    sound.playPop();
    setIsDismissed(true);
  };

  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0 }}
        transition={gentleSpring}
        className={`relative overflow-hidden rounded-3xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 via-white to-amber-50 p-4 sm:p-5 shadow-xs ${className}`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2.5xl bg-white border-2 border-amber-300 shadow-xs flex items-center justify-center text-2xl shrink-0">
              {currentSeason.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-slate-900 text-sm sm:text-base">
                  {currentSeason.name} — {currentSeason.tagline}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-200/70 text-amber-950 text-xs font-black">
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  {currentSeason.monthsText}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
                {currentSeason.greeting}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
              aria-label="Đóng thông báo mùa"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </m.div>
    </AnimatePresence>
  );
};
