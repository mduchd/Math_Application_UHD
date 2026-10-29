'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { m } from 'framer-motion';
import { ArrowRight, Mail, CheckCircle2 } from 'lucide-react';
import { cardMotion, listItemVariants, staggerContainerVariants } from '@/lib/motion';
import { sound } from '@/lib/sound';

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playPop();
    if (email.trim()) {
      router.push(`/assessment?email=${encodeURIComponent(email.trim())}`);
    } else {
      router.push('/assessment');
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-amber-500 via-amber-400 to-amber-500 text-slate-900 pt-24 pb-12 sm:pt-28 sm:pb-16 selection:bg-amber-700 selection:text-white">
      {/* Background Illustrated Owl Golden Scenic Path (Solidroad Layout in Owl Warm Colors) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Soft Sunburst Ambient Glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-yellow-200/50 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-amber-300/60 blur-[130px] rounded-full" />
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-orange-400/25 blur-[120px] rounded-full" />

        {/* Rolling Gentle Hills (Lớp đồi núi tri thức màu vàng đất - cam hổ phách ấm áp) */}
        <svg
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          preserveAspectRatio="none"
          viewBox="0 0 1440 800"
          fill="none"
        >
          {/* Back Hills Range */}
          <path
            d="M0,430 L180,310 L400,390 L640,240 L880,370 L1100,260 L1300,350 L1440,300 L1440,800 L0,800 Z"
            fill="#d97706"
            opacity="0.35"
          />
          {/* Middle Hills Range */}
          <path
            d="M0,500 L220,360 L480,450 L740,320 L1000,430 L1240,340 L1440,420 L1440,800 L0,800 Z"
            fill="#b45309"
            opacity="0.45"
          />
        </svg>

        {/* Winding Golden Learning Path curving to center (Đường mòn tri thức dẫn lối) */}
        <svg
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[820px] h-[470px] opacity-95"
          viewBox="0 0 800 460"
          fill="none"
        >
          {/* Path surface with rich warm gradient */}
          <path
            d="M 400,190 C 435,255 490,305 390,370 C 310,415 355,450 375,460 L 445,460 C 425,445 445,410 500,370 C 600,295 470,245 415,190 Z"
            fill="url(#owlRoadGrad)"
          />
          {/* Center Road Dash */}
          <path
            d="M 407,195 C 440,255 482,305 395,370 C 322,415 365,450 385,460"
            stroke="#FEF9C3"
            strokeWidth="3.5"
            strokeDasharray="12 9"
            opacity="0.9"
          />
          <defs>
            <linearGradient id="owlRoadGrad" x1="400" y1="190" x2="400" y2="460" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#FEF08A" />
              <stop offset="70%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#FACC15" />
            </linearGradient>
          </defs>
        </svg>

        {/* Left & Right Playful Tree Foliage Shadows */}
        <div className="absolute bottom-0 left-0 w-44 sm:w-80 h-72 sm:h-96 bg-gradient-to-t from-amber-600/40 via-amber-500/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-44 sm:w-80 h-72 sm:h-96 bg-gradient-to-t from-amber-600/40 via-amber-500/20 to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center my-auto">
        <m.div
          variants={staggerContainerVariants}
          initial={false}
          animate="visible"
          className="space-y-6 sm:space-y-8"
        >
          {/* Solidroad Big Chunky Typography Header - Owl Yellow Style */}
          <m.div variants={listItemVariants} className="space-y-4">
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_16px_rgba(0,0,0,0.18)]">
              Học Toán Thông Minh &amp; <br />
              <span className="text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
                Luyện Kỹ Năng Sống Cùng Bé
              </span>
            </h1>

            <p className="text-white/95 text-sm sm:text-lg md:text-xl font-bold leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
              Đồng hành cùng Trợ lý Cú Bi thông thái: Cá nhân hóa lộ trình học, trực quan sinh động theo chuẩn Bộ GD&amp;ĐT, không áp lực và tràn ngập niềm vui!
            </p>
          </m.div>

          {/* Solidroad Integrated Input + Button Pill */}
          <m.div variants={listItemVariants} className="pt-2 max-w-xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-1.5 sm:p-2 rounded-full shadow-[0_20px_45px_-12px_rgba(0,0,0,0.25)] flex items-center gap-2 transition-all focus-within:ring-4 focus-within:ring-white/50"
            >
              <div className="flex items-center gap-2.5 pl-4 sm:pl-5 flex-1 min-w-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email phụ huynh hoặc thầy cô..."
                  className="w-full bg-transparent border-none outline-none text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-semibold truncate"
                />
              </div>

              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-amber-950 font-black text-xs sm:text-sm px-5 sm:px-7 py-2.5 sm:py-3 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Học thử ngay</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3 text-xs sm:text-sm font-bold text-white drop-shadow-sm">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Miễn phí 100% không quảng cáo</span>
              </span>
              <span className="text-white/60">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Chuẩn Bộ GD&amp;ĐT 2026</span>
              </span>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
};
