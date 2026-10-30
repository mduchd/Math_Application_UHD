'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerTeacher } from '@/lib/api';
import { useAppStore } from '@/stores/useAppStore';
import { sound } from '@/lib/sound';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';
import { InputField } from './InputField';

export const TeacherRegisterForm: React.FC = () => {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);

  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [teacherGrade, setTeacherGrade] = useState(3);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!teacherName.trim() || !teacherEmail.trim() || !teacherPassword) {
      setError('Nhập đầy đủ thông tin để tiếp tục.');
      return;
    }
    if (teacherPassword.length < 6) {
      setError('Mật khẩu cần ít nhất 6 ký tự.');
      return;
    }

    setLoading(true);
    try {
      const res = await registerTeacher({
        fullName: teacherName.trim(),
        email: teacherEmail.trim(),
        password: teacherPassword,
        gradeLevel: teacherGrade,
      });
      setUser(res.user);
      sound.playSuccess();
      router.push('/classes');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Không thể đăng ký tài khoản giáo viên. Thầy/Cô thử lại giúp Cú Bi nhé!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3.5 text-center text-sm font-bold text-rose-700 animate-in fade-in">
          {error}
        </div>
      )}

      {/* Họ và tên */}
      <InputField
        label="Họ và tên"
        type="text"
        placeholder="Ví dụ: Cô Nguyễn Hoàng Mai"
        value={teacherName}
        onChange={(e) => setTeacherName(e.target.value)}
        autoComplete="name"
        required
      />

      {/* Email */}
      <InputField
        label="Email"
        type="email"
        placeholder="giaovien@truonghoc.edu.vn"
        value={teacherEmail}
        onChange={(e) => setTeacherEmail(e.target.value)}
        autoComplete="email"
        required
      />

      {/* Mật khẩu */}
      <InputField
        label="Mật khẩu (tối thiểu 6 ký tự)"
        isPassword
        placeholder="••••••••"
        value={teacherPassword}
        onChange={(e) => setTeacherPassword(e.target.value)}
        autoComplete="new-password"
        required
      />

      {/* Khối lớp giảng dạy chính */}
      <div>
        <label className="mb-2 block text-sm font-black text-slate-800">
          Lớp phụ trách chính
        </label>
        <div className="grid grid-cols-5 gap-1.5">
          {[1, 2, 3, 4, 5].map((grade) => {
            const isSelected = teacherGrade === grade;
            return (
              <button
                key={grade}
                type="button"
                onClick={() => {
                  sound.playPop();
                  setTeacherGrade(grade);
                }}
                className={`rounded-xl border-2 py-2.5 text-sm font-black transition-all ${
                  isSelected
                    ? 'border-emerald-800 bg-emerald-800 text-white shadow-sm'
                    : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-emerald-200'
                }`}
              >
                Lớp {grade}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-emerald-800 px-6 py-3.5 text-sm font-black text-white shadow-md transition-all hover:bg-emerald-900 hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
      >
        {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
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

      {/* Google Login */}
      <GoogleLoginButton
        role="TEACHER"
        onError={(err) => setError(err)}
      />

      {/* Footer Switcher */}
      <div className="text-center pt-2">
        <p className="text-sm font-bold text-slate-700">
          Đã có tài khoản?{' '}
          <Link
            href="/login?role=teacher"
            className="text-emerald-700 hover:text-emerald-800 font-black underline underline-offset-2"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </form>
  );
};
