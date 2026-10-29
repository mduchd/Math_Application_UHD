'use client';

import React, { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Check, ChevronDown, Wand2 } from 'lucide-react';
import { useSeasonStore } from '../stores/useSeasonStore';
import { SEASONS, SEASON_ORDER } from '../constants/seasons';
import { SeasonId } from '../types';
import { sound } from '@/lib/sound';
import { gentleSpring } from '@/lib/motion';

interface SeasonToggleProps {
  variant?: 'compact' | 'full' | 'pill';
  className?: string;
}

export const SeasonToggle: React.FC<SeasonToggleProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const season = useSeasonStore((state) => state.season);
  const mode = useSeasonStore((state) => state.mode);
  const effectsEnabled = useSeasonStore((state) => state.effectsEnabled);
  const setSeason = useSeasonStore((state) => state.setSeason);
  const setMode = useSeasonStore((state) => state.setMode);
  const setEffectsEnabled = useSeasonStore((state) => state.setEffectsEnabled);
  const hydrate = useSeasonStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentSeasonInfo = SEASONS[season] || SEASONS.spring;

  const handleToggleOpen = () => {
    sound.playPop();
    setIsOpen(!isOpen);
  };

  const handleSelectSeason = (seasonId: SeasonId) => {
    setSeason(seasonId);
    setIsOpen(false);
  };

  const handleToggleAutoMode = () => {
    const nextMode = mode === 'auto' ? 'manual' : 'auto';
    setMode(nextMode);
  };

  const handleToggleEffects = () => {
    setEffectsEnabled(!effectsEnabled);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      {variant === 'pill' ? (
        <button
          type="button"
          onClick={handleToggleOpen}
          aria-expanded={isOpen}
          aria-label="Thay đổi chủ đề mùa"
          className="group flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/95 border-2 border-amber-300 hover:border-amber-500 shadow-xs hover:shadow-tactile-yellow active:translate-y-0.5 transition-all text-slate-800"
        >
          <span className="text-lg leading-none transition-transform group-hover:scale-125">
            {currentSeasonInfo.emoji}
          </span>
          <span className="font-display font-extrabold text-xs md:text-sm text-slate-900 tracking-tight">
            {currentSeasonInfo.name}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-700 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      ) : variant === 'full' ? (
        <button
          type="button"
          onClick={handleToggleOpen}
          aria-expanded={isOpen}
          aria-label="Thay đổi chủ đề mùa"
          className="group flex items-center gap-2.5 px-4 py-2 rounded-2.5xl bg-white border-2 border-kid-border hover:border-amber-400 shadow-xs hover:shadow-tactile-yellow active:translate-y-0.5 transition-all"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-lg shadow-xs group-hover:scale-110 transition-transform">
            {currentSeasonInfo.emoji}
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-black text-sm text-slate-900 leading-tight">
              {currentSeasonInfo.name}
            </span>
            <span className="text-[11px] font-bold text-slate-600">
              {mode === 'auto' ? 'Tự động theo tháng' : 'Tùy chọn thủ công'}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      ) : (
        /* compact */
        <button
          type="button"
          onClick={handleToggleOpen}
          aria-expanded={isOpen}
          aria-label="Thay đổi chủ đề mùa"
          title={`Đổi chủ đề 4 mùa (Hiện tại: ${currentSeasonInfo.name})`}
          className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-white/95 border-2 border-amber-300 hover:border-amber-500 shadow-xs hover:shadow-tactile-yellow active:translate-y-0.5 transition-all text-slate-800"
        >
          <span className="text-base leading-none transition-transform group-hover:scale-125">
            {currentSeasonInfo.emoji}
          </span>
          <span className="hidden sm:inline font-display font-black text-xs text-slate-900">
            {currentSeasonInfo.name}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-700 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      )}

      {/* Dropdown Card */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 6 }}
            transition={gentleSpring}
            className="absolute right-0 mt-2 w-80 sm:w-96 p-4 rounded-3xl bg-white border-2 border-kid-border shadow-2xl z-50 overflow-hidden text-left"
          >
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-base">
                  🌈
                </div>
                <div>
                  <h3 className="font-display font-black text-sm text-slate-900">
                    Chủ Đề 4 Mùa Vui Học
                  </h3>
                  <p className="text-[11px] font-bold text-slate-600">
                    Chọn sắc màu không gian theo mùa yêu thích
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Seasonal Cards Grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-3.5">
              {SEASON_ORDER.map((sId) => {
                const s = SEASONS[sId];
                const isSelected = season === sId;

                return (
                  <button
                    key={sId}
                    type="button"
                    onClick={() => handleSelectSeason(sId)}
                    className={`relative p-3 rounded-2xl border-2 text-left transition-all group flex flex-col justify-between ${
                      isSelected
                        ? 'border-slate-800 bg-amber-50 shadow-tactile-yellow translate-y-[-2px]'
                        : 'border-slate-200 hover:border-amber-300 bg-slate-50/70 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <span className="text-2xl transition-transform group-hover:scale-110">
                        {s.emoji}
                      </span>
                      {isSelected && (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-900 text-amber-300 shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-display font-black text-sm text-slate-900 leading-tight">
                        {s.name}
                      </h4>
                      <p className="text-[11px] font-bold text-slate-600 leading-tight mt-0.5">
                        {s.monthsText}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Season greeting box */}
            <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 mb-3.5 flex items-center gap-2.5">
              <span className="text-xl shrink-0">{currentSeasonInfo.secondaryEmoji}</span>
              <p className="text-xs font-bold text-slate-800 leading-snug">
                {currentSeasonInfo.greeting}
              </p>
            </div>

            {/* Controls: Auto Mode & Particle Effects Toggle */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              {/* Auto mode toggle */}
              <button
                type="button"
                onClick={handleToggleAutoMode}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span className="font-extrabold text-xs text-slate-800">
                    Tự động theo tháng thực tế
                  </span>
                </div>
                <div
                  className={`w-9 h-5 rounded-full transition-colors p-0.5 relative ${
                    mode === 'auto' ? 'bg-amber-400' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                      mode === 'auto' ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </div>
              </button>

              {/* Effects toggle */}
              <button
                type="button"
                onClick={handleToggleEffects}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="font-extrabold text-xs text-slate-800">
                    Hiệu ứng rơi (Hoa/Nắng/Lá/Tuyết)
                  </span>
                </div>
                <div
                  className={`w-9 h-5 rounded-full transition-colors p-0.5 relative ${
                    effectsEnabled ? 'bg-amber-400' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                      effectsEnabled ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </div>
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
