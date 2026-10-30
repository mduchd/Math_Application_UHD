'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AuthContainer, AuthRole } from '@/features/auth';

function RegisterPageContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role');

  const initialRole: AuthRole = roleParam === 'teacher' ? 'teacher' : 'student';

  return (
    <AuthContainer
      mode="register"
      initialRole={initialRole}
    />
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FE] text-slate-700 font-bold">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Đang tải trang đăng ký...</span>
          </div>
        </div>
      }
    >
      <RegisterPageContent />
    </Suspense>
  );
}
