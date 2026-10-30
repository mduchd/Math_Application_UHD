'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginTeacher } from '@/lib/api';
import { useAppStore } from '@/stores/useAppStore';
import { sound } from '@/lib/sound';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';
import { InputField } from './InputField';

interface TeacherLoginFormProps {
  redirectPath?: string | null;
}

export const TeacherLoginForm: React.FC<TeacherLoginFormProps> = ({ redirectPath }) => {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);

  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!teacherEmail.trim() || !teacherPassword) {
      setError('Nhập email và mật khẩu để tiếp tục.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginTeacher({
        email: teacherEmail.trim(),
        password: teacherPassword,
      });
      setUser(res.user);
      sound.playSuccess();
      router.push(redirectPath || '/classes');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Email hoặc mật khẩu không chính xác. Thầy/Cô kiểm tra lại giúp Cú Bi nhé!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-login-form flex flex-col gap-4">
      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3.5 text-center text-sm font-bold text-rose-700 animate-in fade-in">
          {error}
        </div>
      )}

      {/* Input: Email */}
      <InputField
        label="Email"
        type="email"
        placeholder="giaovien@truonghoc.edu.vn"
        value={teacherEmail}
        onChange={(e) => setTeacherEmail(e.target.value)}
        autoComplete="email"
        required
      />

      {/* Input: Mật khẩu */}
      <div className="space-y-1">
        <InputField
          label="Mật khẩu"
          isPassword
          placeholder="Nhập mật khẩu"
          value={teacherPassword}
          onChange={(e) => setTeacherPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <div className="flex justify-end pt-0.5">
          <button
            type="button"
            onClick={() => alert('Vui lòng liên hệ Quản trị viên nhà trường hoặc bộ phận hỗ trợ kỹ thuật để khôi phục mật khẩu.')}
            className="text-sm font-extrabold text-slate-700 transition-colors hover:text-slate-900"
          >
            Quên mật khẩu?
          </button>
        </div>
      </div>

      {/* Primary Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl border-2 border-amber-500 bg-amber-400 px-6 py-3.5 text-sm font-black text-amber-950 shadow-tactile-yellow transition-all hover:bg-amber-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
      >
        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>

      {/* Or Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-3 font-extrabold text-slate-700">Hoặc</span>
        </div>
      </div>

      {/* Google Login Button */}
      <GoogleLoginButton
        role="TEACHER"
        redirectPath={redirectPath || undefined}
        onError={(err) => setError(err)}
      />

      {/* Footer Switcher */}
      <div className="text-center pt-2">
        <p className="text-sm font-bold text-slate-700">
          Chưa có tài khoản?{' '}
          <Link
            href="/register?role=teacher"
            className="text-amber-800 hover:text-amber-950 font-black underline underline-offset-2"
          >
            Đăng ký
          </Link>
        </p>
      </div>
    </form>
  );
};
