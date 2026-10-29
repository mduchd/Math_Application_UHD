'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Users,
  BrainCircuit,
  BookOpen,
  GraduationCap,
  Gamepad2,
  HeartHandshake,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { sound } from '@/lib/sound';
import { PageTransition } from '@/components/motion/PageTransition';
import { useThemeStore } from '@/features/theme';
import { StudentAIAssistant } from '@/features/ai-tutor';
import { CurvedSidebar, type SidebarNavItem } from '@/components/sidebar';
import { StudentTopHeader } from '@/components/student/StudentTopHeader';
import { StudentMobileNav } from '@/components/student/StudentMobileNav';
import { GuestBanner } from '@/components/student/GuestBanner';

const studentNavItems: SidebarNavItem[] = [
  {
    href: '/classroom',
    label: 'Lớp học của em',
    icon: Users,
    badge: { text: '3 lớp', variant: 'emerald' },
  },
  {
    href: '/assessment',
    label: 'Khảo sát năng lực',
    icon: Sparkles,
    badge: { text: 'AI', variant: 'amber' },
  },
  {
    href: '/plan',
    label: 'Kế hoạch học AI',
    icon: BrainCircuit,
    badge: { text: 'Mới', variant: 'purple' },
  },
  {
    href: '/library',
    label: 'Thư viện ôn tập',
    icon: BookOpen,
  },
  {
    href: '/lessons',
    label: 'Bài học',
    icon: GraduationCap,
    badge: { text: '12 bài', variant: 'sky' },
  },
  {
    href: '/games',
    label: 'Trò chơi trí tuệ',
    icon: Gamepad2,
    badge: { text: 'HOT 🔥', variant: 'rose' },
  },
  {
    href: '/life-skills',
    label: 'Kỹ năng sống',
    icon: HeartHandshake,
    badge: { text: '+50 ⭐', variant: 'amber' },
  },
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

  const handleLogout = () => {
    sound.playPop();
    logout();
    router.push('/login?role=student');
  };

  return (
    <div
      data-theme={theme}
      className={`min-h-screen flex flex-col md:flex-row bg-kid-cream dark:bg-[#0B1120] pb-20 md:pb-0 transition-colors duration-300 relative ${
        theme === 'dark' ? 'dark' : ''
      }`}
    >
      {/* 1. CURVED SIDEBAR (DESKTOP) - Bo trên bo dưới dạng Capsule lơ lửng */}
      <CurvedSidebar
        items={studentNavItems}
        currentPath={pathname}
        role="student"
        brandTitle="Toán Vui"
        brandSubtitle="Toán Tiểu Học Lớp 1 - 5"
        showMascot={true}
        onLogout={currentUser ? handleLogout : undefined}
        className="hidden md:flex sticky top-3 my-3 ml-3 h-[calc(100vh-1.5rem)]"
      />

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header with Search, Stats & Avatar */}
        <StudentTopHeader
          currentUser={currentUser}
          stars={stars}
          onLogout={handleLogout}
        />

        {/* Guest Mode Notification Banner */}
        <GuestBanner />

        {/* Page Content Body */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <PageTransition key={pathname}>{children}</PageTransition>
        </main>
      </div>

      {/* 3. MOBILE BOTTOM NAVIGATION */}
      <StudentMobileNav items={studentNavItems} currentPath={pathname} />

      {/* 4. AI TUTOR COMPANION */}
      <StudentAIAssistant />
    </div>
  );
}
