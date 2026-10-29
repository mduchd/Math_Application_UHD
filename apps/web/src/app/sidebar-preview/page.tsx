'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Users,
  BrainCircuit,
  BookOpen,
  GraduationCap,
  Gamepad2,
  HeartHandshake,
  Sparkles,
  BarChart3,
  Search,
  CheckCircle2,
  Flame,
  Star,
  Trophy,
  Sliders,
  Sun,
  Moon,
} from 'lucide-react';
import { CurvedSidebar, type SidebarNavItem } from '@/components/sidebar';
import { sound } from '@/lib/sound';

const demoNavItems: SidebarNavItem[] = [
  {
    href: '#classroom',
    label: 'Lớp học của em',
    icon: Users,
    badge: { text: '3 lớp', variant: 'emerald' },
  },
  {
    href: '#assessment',
    label: 'Khảo sát năng lực',
    icon: Sparkles,
    badge: { text: 'AI', variant: 'amber' },
  },
  {
    href: '#plan',
    label: 'Kế hoạch học AI',
    icon: BrainCircuit,
    badge: { text: 'Mới', variant: 'purple' },
  },
  {
    href: '#library',
    label: 'Thư viện ôn tập',
    icon: BookOpen,
  },
  {
    href: '#lessons',
    label: 'Bài học',
    icon: GraduationCap,
    badge: { text: '12 bài', variant: 'sky' },
  },
  {
    href: '#games',
    label: 'Trò chơi trí tuệ',
    icon: Gamepad2,
    badge: { text: 'HOT 🔥', variant: 'rose' },
  },
  {
    href: '#life-skills',
    label: 'Kỹ năng sống',
    icon: HeartHandshake,
    badge: { text: '+50 ⭐', variant: 'amber' },
  },
];

export default function SidebarPreviewPage() {
  const [activeHref, setActiveHref] = useState('#assessment');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSelectTab = (href: string) => {
    setActiveHref(href);
  };

  const toggleCollapse = () => {
    sound.playPop();
    setIsCollapsed((prev) => !prev);
  };

  const toggleTheme = () => {
    sound.playPop();
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      data-theme={isDarkMode ? 'dark' : 'light'}
      className={`min-h-screen p-4 md:p-8 font-body transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 text-white' : 'bg-[#F6EFE5] text-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation back and header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10 dark:border-white/10">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-black text-amber-700 hover:text-amber-800 dark:text-amber-400 mb-1"
            >
              <ArrowLeft className="w-4 h-4" /> Về Trang Chủ
            </Link>
            <h1 className="text-2xl md:text-3xl font-display font-black tracking-tight">
              Sidebar Toán Vui: Dạng Capsule Bo Trên Bo Dưới &amp; Vết Uốn Lượn
            </h1>
            <p className="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-400">
              Đúng theo mẫu Helper: Sidebar bo tròn góc trên và góc dưới dạng viên con nhộng lơ lửng, tab active uốn cong mềm mại.
            </p>
          </div>

          {/* Quick controls */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <button
              onClick={toggleCollapse}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-300 hover:bg-amber-200 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isCollapsed ? 'Mở Rộng' : 'Thu Gọn'}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-300 hover:bg-amber-200 transition-colors"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{isDarkMode ? 'Giao Diện Sáng' : 'Giao Diện Tối'}</span>
            </button>
          </div>
        </div>

        {/* Live Interactive Showcase Canvas */}
        <div className="rounded-4xl border-2 border-amber-300/80 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[680px] bg-kid-cream dark:bg-[#0B1120]">
          {/* Sidebar Capsule */}
          <CurvedSidebar
            items={demoNavItems}
            currentPath={activeHref}
            collapsed={isCollapsed}
            onToggleCollapse={toggleCollapse}
            role="student"
            brandTitle="Toán Vui"
            brandSubtitle="Toán Tiểu Học Lớp 1 - 5"
            showMascot={true}
            onLogout={() => sound.playPop()}
            className="hidden md:flex my-3 ml-3 h-[650px]"
          />

          {/* Simulated Main Dashboard Canvas */}
          <div className="flex-1 flex flex-col min-w-0 bg-kid-cream dark:bg-[#0B1120] transition-colors">
            {/* Topbar */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-amber-200/40 dark:border-slate-800/80 bg-kid-cream/95 dark:bg-[#0B1120]/95 backdrop-blur-md">
              <div className="relative w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm chủ đề, bài tập..."
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800/90 border-2 border-kid-border dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-800 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-200 dark:border-amber-700/50">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span className="font-black text-xs text-amber-900 dark:text-amber-200">120 Sao</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border-2 border-orange-200 dark:border-orange-700/50">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-400" />
                  <span className="font-black text-xs text-orange-900 dark:text-orange-200">5 Ngày streak</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-200 dark:border-emerald-700/50">
                  <span className="text-lg">🐰</span>
                  <span className="font-extrabold text-xs text-emerald-900 dark:text-emerald-200">Bé Bảo An</span>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 md:p-8 space-y-6 flex-1 overflow-y-auto">
              {/* Banner Card */}
              <div className="p-6 rounded-3xl bg-amber-100/80 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-400/40 text-amber-950 dark:text-amber-200">
                    <Sparkles className="w-3.5 h-3.5" /> Chào buổi sáng, Bé Bảo An! 👋
                  </span>
                  <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 dark:text-white">
                    Hôm nay chúng mình học phép nhân 5 nhé!
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 max-w-lg">
                    Chỉ cần hoàn thành 3 câu đố vui, bé sẽ nhận ngay 15 Sao và mở khóa huy hiệu Hiệp Sĩ Toán Học!
                  </p>
                </div>
                <div className="text-6xl shrink-0 animate-bounce">🦉</div>
              </div>

              {/* Interactive Tab Switcher Trigger for Demo */}
              <div className="space-y-3">
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  Bấm Chọn Tab Để Kiểm Tra Vết Cong Hòa Nền Tuyệt Đối (Bo Trên Bo Dưới):
                </h3>
                <div className="flex flex-wrap gap-2">
                  {demoNavItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleSelectTab(item.href)}
                      className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all ${
                        activeHref === item.href
                          ? 'bg-amber-400 text-amber-950 shadow-tactile-yellow scale-105 font-black border-2 border-amber-500'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-kid-border dark:border-slate-700 shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Khóa Đã Học</span>
                    <Trophy className="w-4 h-4 text-amber-500" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">8 Khóa</p>
                  <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">Hoàn thành 100%</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-kid-border dark:border-slate-700 shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Sao Tích Lũy</span>
                    <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">120 ⭐</p>
                  <p className="text-[11px] font-bold text-sky-600 dark:text-sky-400">+15 sao hôm nay</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-kid-border dark:border-slate-700 shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Thứ Hạng Lớp</span>
                    <BarChart3 className="w-4 h-4 text-amber-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">Hạng 3 / 35</p>
                  <p className="text-[11px] font-bold text-amber-700 dark:text-amber-400">Top 10% học sinh xuất sắc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
