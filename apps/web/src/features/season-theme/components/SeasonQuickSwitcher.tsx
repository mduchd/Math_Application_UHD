'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check } from 'lucide-react';
import { useSeasonStore } from '../stores/useSeasonStore';
import { SEASONS, SEASON_ORDER } from '../constants/seasons';
import { SeasonId } from '../types';
import { sound } from '@/lib/sound';
import { gentleSpring } from '@/lib/motion';

export const SeasonQuickSwitcher: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const season = useSeasonStore((state) => state.season);
  const setSeason = useSeasonStore((state) => state.setSeason);
  const isHydrated = useSeasonStore((state) => state.isHydrated);

  if (!isHydrated) return null;

  const currentSeason = SEASONS[season] || SEASONS.spring;

  const handleToggleExpand = () => {
    sound.playPop();
    setIsExpanded(!isExpanded);
  };

  const handleSelect = (sId: SeasonId) => {
    setSeason(sId);
    setIsExpanded(false);
  };

  return (
    <aside
      aria-label="Chọn mùa học tập"
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex items-center select-none"
    >
      <AnimatePresence>
        {isExpanded && (
          <m.div
            initial={{ opacity: 0, scale: 0.85, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: 20 }}
            transition={gentleSpring}
            className="mr-3 p-2 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-amber-300 shadow-2xl flex items-center gap-1.5"
          >
            {SEASON_ORDER.map((sId) => {
              const s = SEASONS[sId];
              const isSelected = season === sId;

              return (
                <button
                  key={sId}
                  type="button"
                  onClick={() => handleSelect(sId)}
                  className={`group relative flex items-center gap-1.5 px-3 py-2 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? 'bg-amber-400 border-amber-500 shadow-tactile-yellow text-amber-950 font-black scale-105'
                      : 'bg-white border-slate-200 hover:border-amber-300 text-slate-800 font-extrabold hover:bg-amber-50'
                  }`}
                  title={`${s.name} (${s.monthsText})`}
                >
                  <span className="text-xl transition-transform group-hover:scale-125">
                    {s.emoji}
                  </span>
                  <span className="text-xs font-display hidden sm:inline">{s.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 ml-0.5 stroke-[3]" />}
                </button>
              );
            })}

            <button
              type="button"
              onClick={handleToggleExpand}
              className="p-2 rounded-2xl hover:bg-slate-100 text-slate-600 transition-colors ml-1"
              aria-label="Đóng bảng chọn mùa"
            >
              <X className="w-4 h-4" />
            </button>
          </m.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Orb */}
      <m.button
        type="button"
        onClick={handleToggleExpand}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Chủ đề hiện tại: ${currentSeason.name}. Bấm để chọn 4 mùa`}
        title={`Chủ đề hiện tại: ${currentSeason.name}. Bấm để đổi mùa!`}
        className="relative group w-14 h-14 rounded-full bg-gradient-to-br from-white via-amber-50 to-amber-100 border-3 border-amber-400 shadow-tactile-yellow flex items-center justify-center transition-all cursor-pointer"
      >
        <span className="text-2xl drop-shadow-sm transition-transform group-hover:scale-125">
          {currentSeason.emoji}
        </span>

        {/* Tiny sparkle badge */}
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-[10px] text-amber-950 font-black shadow-xs">
          ✨
        </span>
      </m.button>
    </aside>
  );
};
