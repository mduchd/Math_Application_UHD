'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { m } from 'framer-motion';
import {
  Users,
  BrainCircuit,
  BookOpen,
  GraduationCap,
  Gamepad2,
  HeartHandshake,
  Sparkles,
  Star,
  LogOut,
  LogIn,
} from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { sound } from '@/lib/sound';
import { PageTransition } from '@/components/motion/PageTransition';
import { gentleSpring } from '@/lib/motion';
import { AppLogo } from '@/components/kid/AppLogo';
import { ThemeToggle, useThemeStore } from '@/features/theme';

const studentNavItems = [
  { href: '/classroom', label: 'Lớp học của em', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50', activeBg: 'bg-emerald-500 text-white' },
  { href: '/assessment', label: 'Khảo sát năng lực', icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-50', activeBg: 'bg-amber-500 text-white' },
  { href: '/plan', label: 'Kế hoạch học AI', icon: BrainCircuit, color: 'text-purple-500', bg: 'bg-purple-50', activeBg: 'bg-purple-500 text-white' },
  { href: '/library', label: 'Thư viện ôn tập', icon: BookOpen, color: 'text-sky-500', bg: 'bg-sky-50', activeBg: 'bg-sky-500 text-white' },
  { href: '/lessons', label: 'Bài học', icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-50', activeBg: 'bg-blue-500 text-white' },
  { href: '/games', label: 'Trò chơi trí tuệ', icon: Gamepad2, color: 'text-pink-500', bg: 'bg-pink-50', activeBg: 'bg-pink-500 text-white' },
  { href: '/life-skills', label: 'Kỹ năng sống', icon: HeartHandshake, color: 'text-orange-500', bg: 'bg-orange-50', activeBg: 'bg-orange-500 text-white' },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useAppStore((state) => state.currentUser);
  const stars = useAppStore((state) => state.stars);
  const hydrate = useAppStore((state) => state.hydrate);
  const logout = useAppStore((state) => state.logout);

  const theme = useThemeStore((state) => state.theme);
  const hydrateTheme = useThemeStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
    hydrateTheme();
  }, [hydrate, hydrateTheme]);

  const handleNavClick = () => {
    sound.playPop();
  };

  const handleLogout = () => {
    sound.playPop();
    logout();
    router.push('/login?role=student');
  };

  const gradeText = currentUser?.gradeLevel ? `Lớp ${currentUser.gradeLevel}` : 'Lớp 3';

  return (
    <div
      data-theme={theme}
      className={`min-h-screen flex flex-col bg-kid-cream pb-20 md:pb-0 transition-colors duration-300 relative ${
        theme === 'dark' ? 'dark' : ''
      }`}
    >
      {/* 1. TOPBAR VUI NHỘN CỦA HỌC SINH */}
      <header className="h-18 bg-white border-b-2 border-kid-border px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        {/* Logo trường học & link về Home */}
        <Link
          href="/"
          onClick={handleNavClick}
          className="flex items-center gap-3 group"
        >
          <AppLogo size="md" variant="icon" />
          <div>
            <h1 className="font-display font-black text-slate-800 text-lg md:text-xl leading-tight">
              Bé Thông Thái
            </h1>
            <span className="text-[11px] text-amber-600 font-extrabold tracking-wide uppercase">
              Trường Tiểu Học Vui Vẻ
            </span>
          </div>
        </Link>

        {/* Gamification Stats: Ngôi sao & Khối lớp & Hồ sơ */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Huy hiệu sao */}
          <div className="flex items-center gap-1.5 bg-amber-50 border-2 border-amber-200 px-3 py-1.5 rounded-2xl shadow-xs">
            <m.span
              className="inline-flex"
              animate={{ rotate: [0, 10, -8, 0], scale: [1, 1.12, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }}
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            </m.span>
            <span className="font-black font-display text-sm text-amber-900">{stars} Sao</span>
          </div>

          {/* Khối lớp */}
          <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 bg-sky-50 text-sky-700 rounded-2xl text-xs font-black border-2 border-sky-200">
            <Sparkles className="w-3.5 h-3.5" /> {gradeText}
          </span>

          {/* Hồ sơ học sinh */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-2xl border-2 border-emerald-200 shadow-xs">
                <span className="text-xl">{currentUser.avatarMascot || '🐰'}</span>
                <span className="font-extrabold text-xs md:text-sm text-emerald-900 max-w-[120px] truncate">
                  {currentUser.fullName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                title="Đăng xuất"
                className="p-2 rounded-2xl border-2 border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login?role=student"
                onClick={handleNavClick}
                className="flex items-center gap-1 px-3 py-1.5 rounded-2xl text-xs font-black border-2 border-slate-200 hover:border-amber-400 bg-white text-slate-700 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Đăng nhập</span>
              </Link>
              <Link
                href="/assessment"
                onClick={handleNavClick}
                className="flex items-center gap-1.5 bg-amber-400 text-amber-950 px-3.5 py-1.5 rounded-2xl text-xs font-black border-2 border-amber-500 shadow-tactile-yellow active:translate-y-1 active:shadow-none transition-transform"
              >
                <span>Khảo sát</span>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* 2. BODY CONTENT + SIDEBAR DÀNH CHO DESKTOP */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 md:p-6 gap-6">
        {/* SIDEBAR TACTILE CHO MÀN HÌNH LỚN */}
        <aside className="w-60 shrink-0 hidden md:flex flex-col justify-between">
          <nav className="space-y-2 sticky top-24">
            {studentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-2.5xl font-display text-sm font-extrabold transition-all relative select-none ${
                    isActive
                      ? `${item.activeBg} shadow-tactile-yellow border-2 border-kid-dark translate-y-[-2px]`
                      : `hover:${item.bg} text-slate-700 hover:text-slate-900 border-2 border-transparent`
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl transition-colors ${
                      isActive ? 'bg-white/20 text-white' : `${item.bg} ${item.color}`
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="relative z-10 font-bold">{item.label}</span>
                </Link>
              );
            })}

            {/* Hộp cổ vũ học tập */}
            <div className="mt-8 p-4 bg-white border-2 border-amber-200 rounded-3xl text-center space-y-2 shadow-xs">
              <div className="text-3xl">🏆</div>
              <p className="text-xs font-black text-amber-900">Chặng 1: Thám hiểm Toán học</p>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                <div className="bg-amber-400 h-full w-3/5 rounded-full" />
              </div>
              <p className="text-xs font-bold text-slate-700">Đã hoàn thành 60%</p>
            </div>

            {/* Chế độ Sáng / Tối dịu mắt đặt ở chân Sidebar */}
            <div className="pt-2 flex justify-center">
              <ThemeToggle variant="pill" className="w-full justify-center" />
            </div>
          </nav>
        </aside>

        {/* NỘI DUNG CHÍNH CỦA MÀN HÌNH */}
        <main className="flex-1 min-w-0">
          <PageTransition key={pathname}>{children}</PageTransition>
        </main>
      </div>

      {/* 3. BOTTOM NAVIGATION BAR CHO MOBILE/TABLET (Cuộn ngang đủ 7 mục) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t-2 border-kid-border px-2 py-1.5 flex items-center justify-between overflow-x-auto z-40 shadow-lg gap-1">
        {studentNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={`relative flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-colors shrink-0 ${
                isActive ? 'text-amber-700 font-extrabold' : 'text-slate-600 font-bold'
              }`}
            >
              {isActive ? (
                <m.span
                  layoutId="student-mobile-active-nav"
                  className="absolute inset-0 rounded-xl bg-amber-50"
                  transition={gentleSpring}
                />
              ) : null}
              <div
                className={`relative z-10 p-1 rounded-lg ${
                  isActive ? 'bg-amber-100 text-amber-600' : 'bg-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="relative z-10 text-[9px] font-black">{item.label.split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
