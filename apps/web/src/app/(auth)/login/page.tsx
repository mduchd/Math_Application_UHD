'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AuthContainer, AuthRole } from '@/features/auth';

function LoginPageContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role');
  const redirectPath = searchParams.get('redirect');

  const initialRole: AuthRole = roleParam === 'teacher' ? 'teacher' : 'student';

  return (
    <AuthContainer
      mode="login"
      initialRole={initialRole}
      redirectPath={redirectPath}
    />
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FE] text-slate-700 font-bold">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold">Đang tải trang đăng nhập...</span>
          </div>
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
