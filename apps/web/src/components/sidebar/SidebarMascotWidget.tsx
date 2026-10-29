'use client';

import React, { useState } from 'react';
import { m } from 'framer-motion';
import { MascotOwl } from '@/components/kid/MascotOwl';
import { sound } from '@/lib/sound';
import { Sparkles } from 'lucide-react';

interface SidebarMascotWidgetProps {
  collapsed?: boolean;
}

export const SidebarMascotWidget: React.FC<SidebarMascotWidgetProps> = ({
  collapsed = false,
}) => {
  const [isJumping, setIsJumping] = useState(false);

  const handleMascotClick = () => {
    sound.playPop();
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 500);
  };

  if (collapsed) {
    return (
      <div className="flex justify-center py-1 px-1 shrink-0">
        <button
          type="button"
          onClick={handleMascotClick}
          title="Cú Bi Thông Thái"
          className="relative p-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 border-2 border-amber-300/80 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all text-xl shadow-xs cursor-pointer"
          aria-label="Cú Bi Thông Thái"
        >
          🦉
        </button>
      </div>
    );
  }

  return (
    <div className="relative mx-3 my-1 p-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border-2 border-amber-300/80 dark:border-slate-700/80 shadow-xs select-none shrink-0 transition-all">
      <div
        onClick={handleMascotClick}
        className="flex items-center gap-2.5 cursor-pointer group"
      >
        <m.div
          animate={isJumping ? { y: [-6, 0, -3, 0], rotate: [-6, 6, -2, 0] } : {}}
          transition={{ duration: 0.45 }}
          className="shrink-0"
        >
          <MascotOwl size="sm" mood="happy" />
        </m.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <p className="font-display text-xs font-black text-slate-800 dark:text-amber-200 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors truncate">
              Cú Bi Thông Thái
            </p>
            <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400 shrink-0" />
          </div>
          <p className="text-[11px] font-extrabold text-amber-700 dark:text-amber-400/90 truncate">
            Bạn đồng hành học tập
          </p>
        </div>
      </div>
    </div>
  );
};
