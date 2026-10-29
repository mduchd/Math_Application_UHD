'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Menu,
  X,
} from 'lucide-react';
import { AppLogo } from '@/components/kid/AppLogo';
import { sound } from '@/lib/sound';

const navbarSpring = {
  type: 'spring' as const,
  stiffness: 360,
  damping: 32,
  mass: 0.7,
};

export const LandingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollFrameRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const navbarTransition = prefersReducedMotion ? { duration: 0 } : navbarSpring;

  useEffect(() => {
    const updateNavbarState = () => {
      scrollFrameRef.current = null;

      setIsScrolled((wasScrolled) => {
        const nextScrolled = wasScrolled ? window.scrollY > 8 : window.scrollY > 28;
        return wasScrolled === nextScrolled ? wasScrolled : nextScrolled;
      });
    };

    const handleScroll = () => {
      if (scrollFrameRef.current === null) {
        scrollFrameRef.current = window.requestAnimationFrame(updateNavbarState);
      }
    };

    updateNavbarState();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  const navLinks = [
    { label: 'Chương trình', href: '#chuong-trinh' },
    { label: 'Khám phá', href: '#kham-pha' },
    { label: 'Dành cho Thầy Cô', href: '#thay-co' },
    { label: 'Bản máy tính', href: '#tai-app' },
    { label: 'Hỏi đáp', href: '#hoi-dap' },
  ];

  const handleNavClick = (href: string) => {
    sound.playPop();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center"
      >
        <m.div
          className="relative w-[92vw] max-w-6xl pointer-events-auto will-change-transform"
          animate={{
            scale: isScrolled ? 0.98 : 1,
            y: isScrolled ? 14 : 0,
          }}
          transition={navbarTransition}
        >
          <m.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[-39.5px] top-0 hidden h-10 md:block"
            animate={{
              opacity: isScrolled ? 0 : 1,
              scale: isScrolled ? 0.98 : 1,
              y: isScrolled ? -4 : 0,
            }}
            transition={navbarTransition}
          >
            <svg className="absolute left-0 top-0" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 0H0C22.0914 0 40 17.9086 40 40V0Z" fill="white" />
            </svg>
            <svg className="absolute right-0 top-0" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H40C17.9086 0 0 17.9086 0 40V0Z" fill="white" />
            </svg>
          </m.div>
          <m.div
            className={`flex h-[64px] items-center justify-between gap-3 border px-3 sm:px-4 lg:h-[68px] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-2 lg:px-5 ${
              isScrolled
                ? 'border-slate-200/90 bg-white/92 backdrop-blur-xl'
                : 'border-transparent bg-white'
            }`}
            animate={{
              borderBottomLeftRadius: isScrolled ? 24 : 32,
              borderBottomRightRadius: isScrolled ? 24 : 32,
              borderTopLeftRadius: isScrolled ? 24 : 0,
              borderTopRightRadius: isScrolled ? 24 : 0,
              boxShadow: isScrolled
                ? '0 10px 28px -12px rgba(15, 23, 42, 0.28)'
                : '0 8px 20px -14px rgba(15, 23, 42, 0.22)',
            }}
            transition={navbarTransition}
          >
            {/* BÊN TRÁI: Logo */}
            <div className="flex min-w-0 items-center lg:justify-self-start">
              {/* Logo App */}
              <Link
                href="/"
                onClick={() => sound.playPop()}
                className="group flex shrink-0 items-center gap-2 select-none"
              >
                <AppLogo size="sm" variant="icon" />
                <span className="font-display text-base font-black leading-none tracking-tight text-slate-900 transition-colors group-hover:text-amber-700 sm:text-[17px]">
                  Toán Vui
                </span>
              </Link>

            </div>

            {/* Ở desktop, nhóm category luôn căn theo tâm navbar thay vì chạy theo logo. */}
            <nav aria-label="Điều hướng chính" className="hidden items-center justify-self-center lg:flex">
              <button
                onClick={() => handleNavClick('#chuong-trinh')}
                className="shrink-0 whitespace-nowrap rounded-xl px-2.5 py-2 text-sm font-extrabold text-slate-800 transition-colors hover:bg-amber-50 hover:text-amber-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 xl:px-3"
              >
                Chương trình
              </button>

              <button
                onClick={() => handleNavClick('#kham-pha')}
                className="shrink-0 whitespace-nowrap rounded-xl px-2.5 py-2 text-sm font-extrabold text-slate-800 transition-colors hover:bg-amber-50 hover:text-amber-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 xl:px-3"
              >
                Khám phá
              </button>

              <button
                onClick={() => handleNavClick('#thay-co')}
                className="shrink-0 whitespace-nowrap rounded-xl px-2.5 py-2 text-sm font-extrabold text-slate-800 transition-colors hover:bg-amber-50 hover:text-amber-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 xl:px-3"
              >
                Dành cho Thầy Cô
              </button>

              <button
                onClick={() => handleNavClick('#tai-app')}
                className="shrink-0 whitespace-nowrap rounded-xl px-2.5 py-2 text-sm font-extrabold text-slate-800 transition-colors hover:bg-amber-50 hover:text-amber-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 xl:px-3"
              >
                Bản máy tính
              </button>

              <button
                onClick={() => handleNavClick('#hoi-dap')}
                className="shrink-0 whitespace-nowrap rounded-xl px-2.5 py-2 text-sm font-extrabold text-slate-800 transition-colors hover:bg-amber-50 hover:text-amber-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 xl:px-3"
              >
                Hỏi đáp
              </button>
            </nav>

            {/* BÊN PHẢI: Nút Đăng nhập + Mobile hamburger button */}
            <div className="flex shrink-0 items-center gap-2 lg:justify-self-end">
              {/* Nút Đăng nhập - Tone Vàng Hổ Phách nổi bật */}
              <Link
                href="/login"
                onClick={() => sound.playPop()}
                className="flex h-10 items-center justify-center rounded-xl border border-amber-500 bg-amber-400 px-3.5 text-sm font-black text-amber-950 shadow-[0_4px_10px_rgba(245,158,11,0.22)] transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 sm:px-4"
              >
                <span>Đăng nhập</span>
              </Link>

              {/* Mobile hamburger button */}
              <button
                onClick={() => {
                  sound.playPop();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="rounded-xl p-2 text-slate-900 transition-colors hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 lg:hidden"
                aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </m.div>
        </m.div>
      </header>

      {/* MOBILE POPUP MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-3 right-3 top-[5.5rem] z-50 space-y-4 rounded-3xl border-2 border-amber-300 bg-white/98 p-5 shadow-2xl backdrop-blur-xl lg:hidden sm:left-5 sm:right-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-amber-100">
              <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                Menu Điều Hướng
              </span>
            </div>

            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="flex w-full items-center rounded-2xl px-4 py-3 text-left text-sm font-extrabold text-slate-800 transition-colors hover:bg-amber-100 hover:text-amber-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="border-t border-amber-100 pt-2">
              <Link
                href="/login"
                onClick={() => {
                  sound.playPop();
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center justify-center rounded-2xl border-2 border-amber-500 bg-amber-400 py-3 text-center text-sm font-black text-amber-950 shadow-md transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              >
                <span>Đăng Nhập Tài Khoản</span>
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
