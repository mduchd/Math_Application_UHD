'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AppLogo } from '@/components/kid/AppLogo';
import { sound } from '@/lib/sound';

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleCollapse?: () => void;
  brandTitle?: string;
  brandSubtitle?: string;
  href?: string;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  collapsed,
  onToggleCollapse,
  brandTitle = 'Toán Vui',
  brandSubtitle = 'Toán Tiểu Học Lớp 1 - 5',
  href = '/',
}) => {
  const handleToggle = () => {
    sound.playPop();
    onToggleCollapse?.();
  };

  return (
    <div
      className={`h-16 pt-1 flex items-center px-4 transition-all duration-300 border-b border-amber-500/25 dark:border-amber-800/30 shrink-0 relative ${
        collapsed ? 'justify-center' : 'justify-between'
      }`}
    >
      <Link
        href={href}
        className="flex items-center gap-2.5 group select-none min-w-0"
        title={collapsed ? brandTitle : undefined}
      >
        <AppLogo size="sm" variant="icon" />

        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="font-display font-black text-amber-950 dark:text-amber-100 text-lg tracking-tight leading-tight group-hover:text-amber-900 transition-colors truncate">
              {brandTitle}
            </span>
            <span className="text-[10px] font-extrabold text-amber-900/90 dark:text-amber-300 tracking-wider uppercase truncate">
              {brandSubtitle}
            </span>
          </div>
        )}
      </Link>

      {/* Collapse / Expand Toggle Button - Floating tròn chuẩn ở mép sidebar, không bao giờ bị cắt xén */}
      {onToggleCollapse && (
        <button
          onClick={handleToggle}
          type="button"
          title={collapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
          className="absolute -right-3.5 top-5 w-7 h-7 rounded-full bg-white dark:bg-slate-800 border-2 border-amber-400 dark:border-amber-600 shadow-md text-amber-950 dark:text-amber-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 cursor-pointer"
          aria-label={collapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5 stroke-[3]" />
          )}
        </button>
      )}
    </div>
  );
};
