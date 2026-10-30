'use client';

import React from 'react';
import { AuthIllustration } from './AuthIllustration';
import { AuthRole } from '../types';

interface AuthHeroBannerProps {
  role: AuthRole;
  mode?: 'login' | 'register';
}

export const AuthHeroBanner: React.FC<AuthHeroBannerProps> = ({ role, mode = 'login' }) => {
  const isTeacher = role === 'teacher';

  return (
    <div className="auth-hero-banner relative rounded-[28px] overflow-hidden bg-gradient-to-br from-[#FFD54F] via-[#FFCA28] to-[#FFB300] text-amber-950 p-6 sm:p-8 flex flex-col justify-between shadow-sm border-2 border-amber-400/60 h-full min-h-[460px] lg:min-h-[580px]">
      {/* Decorative ambient radial blurs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Content */}
      <div className="relative z-10 space-y-3">
        {/* Catchy Kid Commercial Headline */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-amber-950 leading-tight tracking-tight">
          {isTeacher
            ? 'Dạy học và theo dõi tiến độ tại một nơi'
            : mode === 'register'
              ? 'Bắt đầu hành trình học tập cùng Cú Bi'
              : 'Học vui mỗi ngày cùng Cú Bi'}
        </h2>

        {/* Subtitle with high contrast readable text */}
        <p className="text-sm sm:text-base font-bold text-amber-900 leading-relaxed max-w-md">
          {isTeacher
            ? 'Giao bài, quản lý lớp và nắm tiến độ của từng học sinh.'
            : 'Bài tập Toán tương tác dành cho học sinh tiểu học.'}
        </p>
      </div>

      {/* Middle Illustration: Cú Bi at the Study Desk */}
      <div className="relative z-10 my-3 sm:my-5 flex-1 flex items-center justify-center">
        <AuthIllustration />
      </div>

    </div>
  );
};
