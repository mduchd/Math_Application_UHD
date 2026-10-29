'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { KidLoginIcon, KidLogoutIcon } from '@/components/kid/icons';
import { ThemeToggle } from '@/features/theme';
import { sound } from '@/lib/sound';
import { SidebarHeader } from './SidebarHeader';
import { CurvedNavItem } from './CurvedNavItem';
import type { CurvedSidebarProps } from './types';

export const CurvedSidebar: React.FC<CurvedSidebarProps> = ({
  items,
  currentPath,
  collapsed: controlledCollapsed,
  onToggleCollapse: controlledOnToggle,
  brandTitle = 'Toán Vui',
  brandSubtitle = 'Toán Tiểu Học Lớp 1 - 5',
  showMascot = true,
  role = 'student',
  onLogout,
  className = '',
}) => {
  // Local state if not controlled from parent
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  // Restore user's collapse preference
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sidebar_collapsed_pref');
      if (stored !== null) {
        setInternalCollapsed(stored === 'true');
      }
    } catch {
      // Ignore localStorage access failures
    }
  }, []);

  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const handleToggle = () => {
    if (controlledOnToggle) {
      controlledOnToggle();
    } else {
      setInternalCollapsed((prev) => {
        const next = !prev;
        try {
          localStorage.setItem('sidebar_collapsed_pref', String(next));
        } catch {}
        return next;
      });
    }
  };

  const handleLogout = () => {
    sound.playPop();
    onLogout?.();
  };

  return (
    <aside
      className={`relative shrink-0 flex flex-col justify-between transition-all duration-300 select-none bg-amber-400 dark:bg-[#261805] rounded-[32px] z-30 ${
        isCollapsed ? 'w-20' : 'w-70'
      } ${className}`}
    >
      {/* 1. Header (Logo & Collapse Toggle - bo tròn góc trên theo thân capsule) */}
      <SidebarHeader
        collapsed={isCollapsed}
        onToggleCollapse={handleToggle}
        brandTitle={brandTitle}
        brandSubtitle={brandSubtitle}
        href="/"
      />

      {/* 2. Navigation Items (Được xếp từ trên xuống, khoảng cách đều thoáng) */}
      <div className="flex-1 pt-6 pb-4 space-y-3 flex flex-col justify-start">
        {items.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <CurvedNavItem
              key={item.href}
              item={item}
              isActive={isActive}
              collapsed={isCollapsed}
            />
          );
        })}
      </div>

      {/* 3. Footer Section (Theme & Quick Action - bo tròn góc dưới theo thân capsule) */}
      <div className="pt-2 pb-4 border-t border-amber-500/30 dark:border-amber-800/30 flex flex-col gap-2 shrink-0">
        <div className={`flex items-center px-3 ${isCollapsed ? 'justify-center flex-col gap-2' : 'justify-between gap-2'}`}>
          <ThemeToggle variant={isCollapsed ? 'icon' : 'pill'} />

          {onLogout ? (
            <button
              onClick={handleLogout}
              type="button"
              title="Đăng xuất"
              className="h-10 w-10 rounded-2xl border-2 border-amber-300/80 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600 text-amber-950 dark:text-amber-200 shadow-xs flex items-center justify-center transition-all cursor-pointer shrink-0"
              aria-label="Đăng xuất"
            >
              <KidLogoutIcon className="w-4 h-4" />
            </button>
          ) : (
            <Link
              href={`/login?role=${role}`}
              title="Đăng nhập"
              className="h-10 w-10 rounded-2xl border-2 border-amber-300/80 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 hover:bg-white text-amber-950 dark:text-amber-200 shadow-xs flex items-center justify-center transition-all cursor-pointer shrink-0"
            >
              <KidLoginIcon className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
};
