'use client';

import React from 'react';
import Link from 'next/link';
import { sound } from '@/lib/sound';
import { CurvedCornerSvg } from './CurvedCornerSvg';
import type { SidebarNavItem, SidebarBadge } from './types';

interface CurvedNavItemProps {
  item: SidebarNavItem;
  isActive: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

export const CurvedNavItem: React.FC<CurvedNavItemProps> = ({
  item,
  isActive,
  collapsed = false,
  onClick,
}) => {
  const Icon = item.icon;

  const handleClick = () => {
    sound.playPop();
    onClick?.();
  };

  const renderBadge = (badge: SidebarBadge | string | number) => {
    const text = typeof badge === 'object' ? badge.text : badge;
    const variant = typeof badge === 'object' ? badge.variant || 'amber' : 'amber';

    const colorClasses = {
      amber: 'bg-amber-950 text-amber-300 font-black',
      emerald: 'bg-emerald-600 text-white font-extrabold',
      sky: 'bg-sky-600 text-white font-extrabold',
      rose: 'bg-rose-500 text-white font-extrabold',
      purple: 'bg-purple-600 text-white font-extrabold',
      neutral: 'bg-amber-950/20 text-amber-950 dark:text-amber-200 font-bold',
    }[variant];

    return (
      <span
        className={`inline-flex items-center justify-center px-2 py-0.5 text-[11px] rounded-full shadow-2xs shrink-0 transition-transform group-hover:scale-105 ${colorClasses}`}
      >
        {text}
      </span>
    );
  };

  return (
    <div className="relative w-full">
      {/* Concave fillets for the active tab (scoop-in curves on the right edge only) */}
      {isActive && (
        <>
          <CurvedCornerSvg position="top" className="text-kid-cream dark:text-[#0B1120]" />
          <CurvedCornerSvg position="bottom" className="text-kid-cream dark:text-[#0B1120]" />
        </>
      )}

      <Link
        href={item.href}
        onClick={handleClick}
        title={collapsed ? item.label : undefined}
        className={`group relative flex items-center transition-all duration-200 select-none ${
          collapsed
            ? `justify-center py-2.5 ${
                isActive
                  ? 'ml-3 -mr-px rounded-l-2xl rounded-r-none'
                  : 'mx-2.5 rounded-2xl'
              }`
            : `gap-3 pl-3 pr-3 py-2 ${
                isActive
                  ? 'ml-3 -mr-px rounded-l-3xl rounded-r-none'
                  : 'mx-3 rounded-2xl'
              }`
        } ${
          isActive
            ? 'bg-kid-cream dark:bg-[#0B1120] text-amber-950 dark:text-white z-10'
            : 'text-amber-950 hover:text-amber-950 hover:bg-amber-300/70 dark:text-amber-200/90 dark:hover:text-amber-100 dark:hover:bg-amber-900/40'
        }`}
      >
        {/* Active side indicator / icon container */}
        <div
          className={`shrink-0 p-2 rounded-xl transition-all duration-200 ${
            isActive
              ? 'bg-amber-400 text-amber-950 shadow-tactile-yellow border-2 border-amber-500 scale-105'
              : 'bg-amber-500/30 text-amber-950 dark:bg-amber-900/50 dark:text-amber-200 group-hover:bg-amber-500/50 group-hover:scale-105'
          }`}
        >
          <Icon className="w-4.5 h-4.5 stroke-[2.4]" />
        </div>

        {/* Text Label & Badge (when expanded) */}
        {!collapsed && (
          <div className="flex-1 min-w-0 flex items-center justify-between gap-2 pr-1">
            <span
              className={`truncate text-sm font-display ${
                isActive
                  ? 'font-black text-amber-950 dark:text-white'
                  : 'font-extrabold text-amber-950 dark:text-amber-100 group-hover:text-amber-950 dark:group-hover:text-white'
              }`}
            >
              {item.label}
            </span>

            {item.badge !== undefined && renderBadge(item.badge)}
          </div>
        )}

        {/* Collapsed dot badge for notification */}
        {collapsed && item.badge !== undefined && (
          <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-amber-400" />
        )}
      </Link>
    </div>
  );
};
