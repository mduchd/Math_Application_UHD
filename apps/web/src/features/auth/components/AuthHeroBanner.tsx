'use client';

import React from 'react';
import { Trophy, ShieldCheck } from 'lucide-react';
import { AuthIllustration } from './AuthIllustration';
import { AuthRole } from '../types';

interface AuthHeroBannerProps {
  role: AuthRole;
  mode?: 'login' | 'register';
}

export const AuthHeroBanner: React.FC<AuthHeroBannerProps> = ({ role, mode = 'login' }) => {
  const isTeacher = role === 'teacher';

  return (
    <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-[#FFD54F] via-[#FFCA28] to-[#FFB300] text-amber-950 p-6 sm:p-8 flex flex-col justify-between shadow-sm border-2 border-amber-400/60 h-full min-h-[460px] lg:min-h-[580px]">
      {/* Decorative ambient radial blurs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Content */}
      <div className="relative z-10 space-y-3">
        {/* Catchy Kid Commercial Headline */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-amber-950 leading-tight tracking-tight">
          {isTeacher
            ? 'Đồng hành giảng dạy, khơi mở tiềm năng trẻ thơ'
            : mode === 'register'
              ? 'Bắt đầu chuyến du hành tri thức cùng bạn Cú Bi'
              : 'Học vui mỗi ngày, tích ngàn sao sáng cùng Cú Bi!'}
        </h2>

        {/* Subtitle with high contrast readable text */}
        <p className="text-sm sm:text-base font-bold text-amber-900 leading-relaxed max-w-md">
          {isTeacher
            ? 'Quản lý bài giảng, theo dõi tiến độ từng học sinh với báo cáo chi tiết và trợ lý AI thông minh.'
            : 'Hàng ngàn bài tập tương tác, hoạt hình sinh động và thử thách nhận huy hiệu đổi quà cực vui!'}
        </p>
      </div>

      {/* Middle Illustration: Cú Bi at the Study Desk */}
      <div className="relative z-10 my-3 sm:my-5 flex-1 flex items-center justify-center">
        <AuthIllustration />
      </div>

      {/* Bottom Feature Badges */}
      <div className="relative z-10 grid grid-cols-2 gap-2.5 pt-2 border-t border-amber-400/40">
        <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-white/85 backdrop-blur-sm border border-amber-300/80 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 font-bold">
            <Trophy className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="text-xs font-black text-amber-950">50K+ Bạn Nhỏ</div>
            <div className="text-[11px] font-bold text-amber-800">Đang học vui vẻ</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-white/85 backdrop-blur-sm border border-amber-300/80 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-xs font-black text-amber-950">100% An Toàn</div>
            <div className="text-[11px] font-bold text-amber-800">Chuẩn giáo dục</div>
          </div>
        </div>
      </div>
    </div>
  );
};
