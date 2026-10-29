'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getStoredToken } from '@/lib/api';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const role = searchParams.get('role');
    const token = getStoredToken();

    if (!token) {
      router.replace(`/login?role=${role === 'teacher' ? 'teacher' : 'student'}`);
      return;
    }

    if (role === 'teacher') {
      router.replace('/classes');
    } else {
      router.replace('/classroom');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-600 font-medium text-sm">Đang chuyển hướng đến cổng quản lý...</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
          Đang tải...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
