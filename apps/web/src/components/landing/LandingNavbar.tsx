'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import {
  LogIn,
  Menu,
  X,
  Sparkles,
  BookOpen,
  GraduationCap,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { AppLogo } from '@/components/kid/AppLogo';
import { sound } from '@/lib/sound';

export const LandingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Chương Trình', href: '#chuong-trinh', icon: BookOpen },
    { label: 'Khám Phá', href: '#kham-pha', icon: Sparkles },
    { label: 'Thầy Cô', href: '#thay-co', icon: GraduationCap },
    { label: 'Hỏi Đáp', href: '#hoi-dap', icon: HelpCircle },
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
      {/* 
        Solidroad Notch ("Tai thỏ") Header:
        - When at top: 
          Floating centered white notch attached to the top of the viewport (rounded-b-[2rem] sm:rounded-b-[2.5rem]).
          Flanked on the left and right with inverted/concave rounded fillets (tai thỏ) curving seamlessly into the hero.
        - When scrolled:
          Smoothly lifts into a floating translucent pill with slick transition.
      */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 flex justify-center pointer-events-none transition-all duration-300 ease-out ${
          isScrolled ? 'pt-3 sm:pt-4 px-4 sm:px-6' : 'pt-0 px-0'
        }`}
      >
        <div className="relative pointer-events-auto">
          {/* Left Concave Notch Ear (Tai thỏ bên trái) */}
          <div
            className={`absolute top-0 -left-[39.5px] w-[40px] h-[40px] pointer-events-none hidden md:block transition-all duration-300 ${
              isScrolled ? 'opacity-0 scale-90 -translate-y-2 pointer-events-none' : 'opacity-100 scale-100 translate-y-0'
            }`}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="block"
            >
              <path
                d="M40 0H0C22.0914 0 40 17.9086 40 40V0Z"
                fill="white"
              />
            </svg>
          </div>

          {/* Right Concave Notch Ear (Tai thỏ bên phải) */}
          <div
            className={`absolute top-0 -right-[39.5px] w-[40px] h-[40px] pointer-events-none hidden md:block transition-all duration-300 ${
              isScrolled ? 'opacity-0 scale-90 -translate-y-2 pointer-events-none' : 'opacity-100 scale-100 translate-y-0'
            }`}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="block"
            >
              <path
                d="M0 0H40C17.9086 0 0 17.9086 0 40V0Z"
                fill="white"
              />
            </svg>
          </div>

          <div
            className={`transition-all duration-300 ease-out flex items-center justify-between gap-4 sm:gap-8 ${
              isScrolled
                ? 'w-[90vw] max-w-4xl rounded-full bg-white/90 backdrop-blur-xl shadow-[0_16px_36px_-6px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)] border border-slate-200/80 px-4 sm:px-6 py-2 sm:py-2.5'
                : 'w-[92vw] max-w-5xl bg-white rounded-b-[2rem] sm:rounded-b-[2.5rem] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] px-6 sm:px-8 py-3 sm:py-3.5'
            }`}
          >
            {/* BÊN TRÁI: Logo App + Nav Links */}
            <div className="flex items-center gap-4 sm:gap-7">
              {/* Logo App */}
              <Link
                href="/"
                onClick={() => sound.playPop()}
                className="flex items-center gap-2 group select-none shrink-0"
              >
                <AppLogo size="sm" variant="icon" />
                <span className="font-display font-black text-base sm:text-lg text-slate-900 tracking-tight leading-none group-hover:text-amber-600 transition-colors">
                  Trường Học Thông Thái
                </span>
              </Link>

              {/* Nav Links */}
              <nav className="hidden md:flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => handleNavClick('#chuong-trinh')}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm font-extrabold text-slate-700 hover:text-slate-950 hover:bg-slate-100/70 rounded-full transition-all"
                >
                  <span>Chương trình</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 transition-transform" />
                </button>

                <button
                  onClick={() => handleNavClick('#kham-pha')}
                  className="px-3 py-1.5 text-xs sm:text-sm font-extrabold text-slate-700 hover:text-slate-950 hover:bg-slate-100/70 rounded-full transition-all"
                >
                  Khám phá
                </button>

                <button
                  onClick={() => handleNavClick('#thay-co')}
                  className="px-3 py-1.5 text-xs sm:text-sm font-extrabold text-slate-700 hover:text-slate-950 hover:bg-slate-100/70 rounded-full transition-all"
                >
                  Dành cho Thầy Cô
                </button>

                <button
                  onClick={() => handleNavClick('#hoi-dap')}
                  className="px-3 py-1.5 text-xs sm:text-sm font-extrabold text-slate-700 hover:text-slate-950 hover:bg-slate-100/70 rounded-full transition-all"
                >
                  Hỏi đáp
                </button>
              </nav>
            </div>

            {/* BÊN PHẢI: Nút Đăng nhập + Mobile hamburger button */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Nút Đăng nhập - Tone Vàng Hổ Phách nổi bật */}
              <Link
                href="/login"
                onClick={() => sound.playPop()}
                className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-black text-amber-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-full shadow-[0_4px_14px_rgba(245,158,11,0.25)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 select-none border border-amber-300/60"
              >
                <LogIn className="w-4 h-4 text-amber-950 stroke-[2.5]" />
                <span>Đăng nhập</span>
              </Link>

              {/* Mobile hamburger button */}
              <button
                onClick={() => {
                  sound.playPop();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="md:hidden p-2 text-slate-800 hover:text-slate-950 rounded-xl hover:bg-slate-100 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE POPUP MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-50 bg-white/98 backdrop-blur-xl border-2 border-amber-300 rounded-3xl p-5 shadow-2xl md:hidden space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-amber-100">
              <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                Menu Điều Hướng
              </span>
            </div>

            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm font-extrabold text-slate-800 hover:text-amber-950 hover:bg-amber-100/70 rounded-2xl transition-colors"
                  >
                    <Icon className="w-4 h-4 text-amber-600" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-amber-100 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => {
                  sound.playPop();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm rounded-full border-2 border-amber-500 shadow-md text-center flex items-center justify-center gap-2 transition-all"
              >
                <LogIn className="w-4 h-4 text-amber-950 stroke-[2.5]" />
                <span>Đăng Nhập Tài Khoản</span>
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
