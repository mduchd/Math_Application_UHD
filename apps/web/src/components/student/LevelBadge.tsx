'use client';

import React from 'react';
import { m } from 'framer-motion';
import { ProficiencyLevel } from '@kid-elearning/types';
import { Award, Zap, Trophy, Crown, Sparkles } from 'lucide-react';
import { gentleSpring } from '@/lib/motion';

interface LevelBadgeProps {
  level: ProficiencyLevel;
  score?: number;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({ level, score }) => {
  const configs = {
    BASIC: {
      label: 'Cơ Bản - Mầm Non',
      icon: '🌱',
      badgeClass: 'bg-emerald-100 text-emerald-950 border-emerald-400 shadow-tactile-green',
      description: 'Nắm vững kiến thức nền tảng, hoàn thành tốt các bài tập chuẩn',
    },
    APPLIED: {
      label: 'Vận Dụng - Thông Thái',
      icon: '⚡',
      badgeClass: 'bg-sky-100 text-sky-950 border-sky-400 shadow-tactile-blue',
      description: 'Biết cách liên hệ thực tế, giải toán có lời văn và giải quyết tình huống',
    },
    ADVANCED: {
      label: 'Vận Dụng Cao - Trạng Nguyên',
      icon: '👑',
      badgeClass: 'bg-purple-100 text-purple-950 border-purple-400 shadow-tactile-purple',
      description: 'Tư duy logic sắc bén, giải các bài toán đố thông minh và phản biện',
    },
  }[level];

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.86, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={gentleSpring}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-2.5xl border-2 font-display font-black text-sm select-none ${configs.badgeClass}`}
    >
      <span className="text-lg">{configs.icon}</span>
      <span>{configs.label}</span>
      {score !== undefined && (
        <span className="bg-white/80 dark:bg-black/40 px-2 py-0.5 rounded-xl text-xs font-black border border-black/10 dark:border-white/10">
          {score} điểm
        </span>
      )}
    </m.div>
  );
};
