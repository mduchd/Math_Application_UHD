'use client';

import React, { useEffect, useState } from 'react';
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
      {/* Soft brand ambience */}
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
        <div className="auth-form-column lg:col-span-6 flex flex-col justify-start px-1 py-2 sm:px-4 sm:py-4">
          <div className="auth-form-stack flex flex-col gap-6">
            {/* Header Titles */}
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
                {isLogin ? 'Chào mừng trở lại' : (
                  role === 'student' ? 'Tạo tài khoản' : 'Tạo tài khoản giáo viên'
                )}
              </h1>
              <p className="text-sm font-bold text-slate-700">
                {isLogin
                  ? role === 'student'
                    ? 'Đăng nhập để tiếp tục học cùng Cú Bi.'
                    : 'Đăng nhập để quản lý lớp học.'
                  : role === 'student'
                    ? 'Tạo hồ sơ để bắt đầu học.'
                    : 'Thiết lập tài khoản để quản lý lớp học.'}
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
        </div>

      </div>
    </main>
  );
};
