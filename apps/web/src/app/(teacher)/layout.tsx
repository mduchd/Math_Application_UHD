'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { m } from 'framer-motion';
import {
  Home,
  Search,
  Bell,
  UserCircle,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import {
  KidAnalyticsIcon,
  KidClassroomIcon,
  KidGamesIcon,
  KidLearnIcon,
  KidLessonIcon,
  KidLifeSkillsIcon,
  KidStudentsIcon,
} from '@/components/kid/icons';
import { PageTransition } from '@/components/motion/PageTransition';
import { gentleSpring } from '@/lib/motion';
import { useAppStore } from '@/stores/useAppStore';
import { ThemeToggle, useThemeStore } from '@/features/theme';

const teacherSidebarItems = [
  { href: '/classes', label: 'Lớp học & Duyệt HS', icon: KidClassroomIcon },
  { href: '/library', label: 'Ngân hàng bài tập', icon: KidLearnIcon },
  { href: '/lessons', label: 'Kho bài học', icon: KidLessonIcon },
  { href: '/games', label: 'Trò chơi trí tuệ', icon: KidGamesIcon },
  { href: '/life-skills', label: 'Kỹ năng sống', icon: KidLifeSkillsIcon },
  { href: '/students', label: 'Danh sách học sinh', icon: KidStudentsIcon },
  { href: '/analytics', label: 'Thống kê & Báo cáo', icon: KidAnalyticsIcon },
];

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useAppStore((state) => state.currentUser);
  const hydrate = useAppStore((state) => state.hydrate);
  const logout = useAppStore((state) => state.logout);

  const theme = useThemeStore((state) => state.theme);
  const hydrateTheme = useThemeStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
    hydrateTheme();
  }, [hydrate, hydrateTheme]);

  const handleLogout = () => {
    logout();
    router.push('/login?role=teacher');
  };

  const teacherName = currentUser?.fullName || 'Thầy/Cô Giáo';
  const gradeText = currentUser?.gradeLevel ? `Khối ${currentUser.gradeLevel} Tiểu Học` : 'Khối 3 Tiểu Học';

  return (
    <div
      data-theme={theme}
      className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300"
    >
      {/* 1. HÀNG NGANG TRÊN CÙNG (Topbar Cổng Giáo Viên) */}
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        {/* Logo & Về trang chủ */}
        <div className="flex items-center gap-6">
          <Link href="/classes" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-xs group-hover:scale-105 transition-transform">
              👩‍🏫
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white text-base">Cổng Giáo Viên</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-bold">Hệ Thống Quản Lý Dạy Học</p>
            </div>
          </Link>

          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
          >
            <Home className="w-3.5 h-3.5" /> Trang chủ
          </Link>
        </div>

        {/* Thanh tìm kiếm nhanh */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-600 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm học sinh, bài tập, lớp học..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-700 transition-colors"
            />
          </div>
        </div>

        {/* Thống kê, Thông báo, Profile giáo viên */}
        <div className="flex items-center gap-3">
          <Link
            href="/analytics"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <KidAnalyticsIcon className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Thống kê điểm</span>
          </Link>

          <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
          </button>

          <div className="flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-800">
            <UserCircle className="w-8 h-8 text-emerald-700 dark:text-emerald-400" />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{teacherName}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-bold">{gradeText}</p>
            </div>
            <button
              onClick={handleLogout}
              title="Đăng xuất"
              className="ml-2 p-1.5 text-slate-600 dark:text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. BODY CONTENT + SIDEBAR GIÁO VIÊN */}
      <div className="flex-1 flex min-h-0">
        {/* SIDEBAR SƯ PHẠM */}
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 p-4 space-y-4">
          <nav className="space-y-1.5">
            {teacherSidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    isActive
                      ? 'text-emerald-800 dark:text-emerald-300 font-extrabold shadow-2xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isActive ? (
                    <m.span
                      layoutId="teacher-active-nav"
                      className="absolute inset-0 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40"
                      transition={gentleSpring}
                    />
                  ) : null}
                  <Icon className={`relative z-10 w-4 h-4 ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`} />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
            <p className="font-extrabold">💡 Mẹo Sư Phạm:</p>
            <p className="text-[11px] leading-relaxed text-emerald-800 dark:text-emerald-300">
              Chiếu mã PIN lên bảng thông minh để học sinh dùng máy tính bảng nhập và gửi yêu cầu vào lớp tự động.
            </p>
          </div>

          {/* Chế độ Sáng / Tối đặt ở chân Sidebar giáo viên */}
          <div className="pt-2">
            <ThemeToggle variant="pill" className="w-full justify-center" />
          </div>
        </aside>

        {/* NỘI DUNG TRANG GIÁO VIÊN */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <PageTransition key={pathname}>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
