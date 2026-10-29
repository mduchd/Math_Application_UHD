'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';
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
      setError('Vui lòng nhập đầy đủ Email và Mật khẩu.');
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
    } catch (err: any) {
      setError(err?.message || 'Email hoặc mật khẩu không chính xác.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold text-center animate-in fade-in">
          {error}
        </div>
      )}

      {/* Input: Email */}
      <InputField
        label="Email giáo viên / Nhà trường:"
        icon={<Mail className="w-4 h-4 text-emerald-600" />}
        type="email"
        placeholder="giaovien@truonghoc.edu.vn"
        value={teacherEmail}
        onChange={(e) => setTeacherEmail(e.target.value)}
        required
      />

      {/* Input: Mật khẩu */}
      <div className="space-y-1">
        <InputField
          label="Mật khẩu tài khoản:"
          icon={<Lock className="w-4 h-4 text-emerald-600" />}
          isPassword
          placeholder="Nhập mật khẩu của Thầy/Cô"
          value={teacherPassword}
          onChange={(e) => setTeacherPassword(e.target.value)}
          required
        />

        <div className="flex justify-end pt-0.5">
          <button
            type="button"
            onClick={() => alert('Vui lòng liên hệ Quản trị viên nhà trường hoặc bộ phận hỗ trợ kỹ thuật để khôi phục mật khẩu.')}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Quên mật khẩu?
          </button>
        </div>
      </div>

      {/* Primary Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-display font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        <span>{loading ? 'Đang xác thực thông tin...' : 'Đăng Nhập Quản Lý Lớp'}</span>
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Or Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-3 text-slate-500 font-extrabold">hoặc đăng nhập với</span>
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
        <p className="text-xs sm:text-sm text-slate-700 font-bold">
          Thầy/Cô chưa có tài khoản?{' '}
          <Link
            href="/register?role=teacher"
            className="text-emerald-700 hover:text-emerald-800 font-black underline underline-offset-2"
          >
            Đăng ký tài khoản Giáo viên mới
          </Link>
        </p>
      </div>
    </form>
  );
};
