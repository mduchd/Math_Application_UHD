'use client';

import React from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { gentleSpring } from '@/lib/motion';
import { sound } from '@/lib/sound';
import type { SidebarNavItem } from '@/components/sidebar';

interface StudentMobileNavProps {
  items: SidebarNavItem[];
  currentPath: string;
}

export const StudentMobileNav: React.FC<StudentMobileNavProps> = ({
  items,
  currentPath,
}) => {
  const handleNavClick = () => {
    sound.playPop();
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md border-t-2 border-kid-border dark:border-slate-800 px-2 py-1.5 flex items-center justify-between overflow-x-auto z-40 shadow-lg gap-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={handleNavClick}
            className={`relative flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-colors shrink-0 ${
              isActive ? 'text-amber-700 dark:text-amber-400 font-extrabold' : 'text-slate-600 dark:text-slate-300 font-bold'
            }`}
          >
            {isActive ? (
              <m.span
                layoutId="student-mobile-active-nav"
                className="absolute inset-0 rounded-xl bg-amber-50 dark:bg-amber-950/40"
                transition={gentleSpring}
              />
            ) : null}
            <div
              className={`relative z-10 p-1 rounded-lg ${
                isActive ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-300' : 'bg-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span className="relative z-10 text-[9px] font-black">{item.label.split(' ')[0]}</span>
          </Link>
        );
      })}
    </nav>
  );
};
