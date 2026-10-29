'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AppLogo } from '@/components/kid/AppLogo';
import { AuthRole } from '../types';
import { AuthHeroBanner } from './AuthHeroBanner';
import { RoleSwitcher } from './RoleSwitcher';
import { StudentLoginForm } from './StudentLoginForm';
import { TeacherLoginForm } from './TeacherLoginForm';
import { StudentRegisterForm } from './StudentRegisterForm';
import { TeacherRegisterForm } from './TeacherRegisterForm';

interface AuthContainerProps {
  mode: 'login' | 'register';
  initialRole?: AuthRole;
  redirectPath?: string | null;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({
  mode,
  initialRole = 'student',
  redirectPath,
}) => {
  const [role, setRole] = useState<AuthRole>(initialRole);

  const isLogin = mode === 'login';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <main className="auth-viewport-shell grid min-h-dvh w-full overflow-x-hidden bg-[#FDFBF7] p-3 font-body sm:p-6 lg:p-8">
      {/* Soft Brand Yellow Ambient Glowing Orbs */}
      <div className="pointer-events-none fixed -right-24 -top-24 h-96 w-96 rounded-full bg-amber-300/30 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-24 -left-24 h-96 w-96 rounded-full bg-yellow-300/25 blur-3xl" />
      <div className="pointer-events-none fixed left-1/4 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-orange-100/40 blur-3xl" />

      {/* Main Elevated Card Container - Strictly centered */}
      <div className="auth-card relative z-10 grid w-full max-w-5xl grid-cols-1 items-stretch gap-6 rounded-[28px] border-2 border-amber-100 bg-white p-4 shadow-[0_20px_60px_-15px_rgba(217,119,6,0.12)] sm:rounded-[36px] sm:p-6 lg:grid-cols-12 lg:gap-8 lg:rounded-[40px] lg:p-7">
        
        {/* Left Column: Yellow Hero Banner with CÚ BI Mascot at Study Desk */}
        <div className="lg:col-span-6 flex flex-col">
          <AuthHeroBanner role={role} mode={mode} />
        </div>

        {/* Right Column: Clean Form Section */}
        <div className="auth-form-column lg:col-span-6 flex flex-col justify-between py-2 sm:py-4 px-1 sm:px-4">
          <div className="auth-form-stack flex flex-col gap-6">
            
            {/* Top Bar: Brand Logo & Back Link */}
            <div className="flex items-center justify-between">
              <Link href="/" className="inline-block transition-transform hover:scale-105">
                <AppLogo size="sm" variant="horizontal" withSubtitle={false} />
              </Link>
              <Link
                href="/"
                className="text-xs font-bold text-amber-900 hover:text-amber-950 transition-colors inline-flex items-center gap-1 p-1.5 rounded-xl hover:bg-amber-50"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Trang chủ</span>
              </Link>
            </div>

            {/* Header Titles */}
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
                {isLogin ? (
                  role === 'student' ? 'Chào Mừng Bé Quay Lại! 👋' : 'Chào Mừng Thầy/Cô! 📚'
                ) : (
                  role === 'student' ? 'Tạo Tài Khoản Bé Học! 🎒' : 'Đăng Ký Tài Khoản Mới! 📋'
                )}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-600">
                {isLogin
                  ? 'Vui lòng nhập thông tin tài khoản để cùng Cú Bi vào lớp'
                  : 'Điền thông tin bên dưới để bắt đầu chuyến du hành tri thức'}
              </p>
            </div>

            {/* Role Switcher Pill Bar */}
            <RoleSwitcher role={role} onChange={setRole} />

            {/* Interactive Form Component */}
            {isLogin ? (
              role === 'student' ? (
                <StudentLoginForm redirectPath={redirectPath} />
              ) : (
                <TeacherLoginForm redirectPath={redirectPath} />
              )
            ) : role === 'student' ? (
              <StudentRegisterForm />
            ) : (
              <TeacherRegisterForm />
            )}

          </div>

          {/* Bottom Brand Note */}
          <div className="auth-footer pt-6 mt-4 border-t border-amber-100 text-center">
            <p className="text-[11px] font-bold text-amber-900/70">
              © {new Date().getFullYear()} Toán Vui Cùng Cú Bi. Nền tảng học Toán thông minh chuẩn giáo dục tiểu học.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
};
