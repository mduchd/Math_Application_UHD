'use client';

import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { sound } from '@/lib/sound';
import { playfulSpring } from '@/lib/motion';

export const LandingBackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (totalHeight > 0) {
        const progress = Math.min(Math.max(scrollY / totalHeight, 0), 1);
        setScrollProgress(progress);
      }

      // Show button once the user scrolls down 300px
      setIsVisible(scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    sound.playPop();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG circular progress calculation
  // Radius = 17 => Circumference = 2 * PI * 17 ≈ 106.814
  const radius = 17;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - scrollProgress);

  return (
    <AnimatePresence>
      {isVisible && (
        <m.button
          type="button"
          onClick={scrollToTop}
          aria-label="Cuộn lên đầu trang"
          title="Cuộn lên đầu trang"
          initial={{ opacity: 0, scale: 0.7, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 24 }}
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ y: 2, scale: 0.95 }}
          transition={playfulSpring}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 group flex items-center gap-2.5 p-2 sm:pl-2.5 sm:pr-4 sm:py-2.5 rounded-full sm:rounded-2xl bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-amber-950 border-2 border-amber-600 shadow-tactile-yellow hover:brightness-105 active:shadow-none transition-all cursor-pointer select-none"
        >
          {/* Circular Progress Ring with Upward Arrow */}
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
            {/* White pill background behind circle */}
            <div className="absolute inset-0 rounded-full bg-white/80 shadow-xs border border-amber-400/60" />

            {/* SVG Progress Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
              viewBox="0 0 44 44"
            >
              {/* Background Ring Track */}
              <circle
                cx="22"
                cy="22"
                r={radius}
                className="stroke-amber-200/90"
                strokeWidth="3.5"
                fill="none"
              />
              {/* Active Progress Indicator */}
              <circle
                cx="22"
                cy="22"
                r={radius}
                stroke="currentColor"
                strokeWidth="3.5"
                strokeDasharray={circumference}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                className="text-amber-800 transition-[stroke-dashoffset] duration-150 ease-out"
                fill="none"
              />
            </svg>

            {/* Centered Arrow Icon */}
            <ArrowUp className="relative z-10 w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-950 stroke-[3] transition-transform duration-200 group-hover:-translate-y-0.5" />
          </div>

          {/* Desktop Text */}
          <span className="hidden sm:inline-block font-display font-black text-xs sm:text-sm text-amber-950 tracking-tight whitespace-nowrap pr-1">
            Lên đầu trang
          </span>
        </m.button>
      )}
    </AnimatePresence>
  );
};
