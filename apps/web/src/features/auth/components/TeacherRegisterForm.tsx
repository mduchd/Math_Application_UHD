'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, GraduationCap, ArrowRight } from 'lucide-react';
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
      setError('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }
    if (teacherPassword.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
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
    } catch (err: any) {
      setError(err?.message || 'Không thể đăng ký tài khoản giáo viên.');
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

      {/* Họ và tên */}
      <InputField
        label="Họ và tên Thầy/Cô:"
        icon={<User className="w-4 h-4 text-emerald-600" />}
        type="text"
        placeholder="Ví dụ: Cô Nguyễn Hoàng Mai"
        value={teacherName}
        onChange={(e) => setTeacherName(e.target.value)}
        required
      />

      {/* Email */}
      <InputField
        label="Email công tác hoặc cá nhân:"
        icon={<Mail className="w-4 h-4 text-emerald-600" />}
        type="email"
        placeholder="giaovien@truonghoc.edu.vn"
        value={teacherEmail}
        onChange={(e) => setTeacherEmail(e.target.value)}
        required
      />

      {/* Mật khẩu */}
      <InputField
        label="Mật khẩu bảo mật (tối thiểu 6 ký tự):"
        icon={<Lock className="w-4 h-4 text-emerald-600" />}
        isPassword
        placeholder="••••••••"
        value={teacherPassword}
        onChange={(e) => setTeacherPassword(e.target.value)}
        required
      />

      {/* Khối lớp giảng dạy chính */}
      <div>
        <label className="block text-xs font-black text-slate-700 mb-2 flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4 text-emerald-600" />
          <span>Khối lớp Thầy/Cô phụ trách chính:</span>
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
                className={`py-2.5 rounded-xl text-xs font-black border-2 transition-all ${
                  isSelected
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
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
        className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-display font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        <span>{loading ? 'Đang khởi tạo tài khoản...' : 'Tạo Tài Khoản Giáo Viên'}</span>
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Or Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-3 text-slate-500 font-extrabold">hoặc đăng ký nhanh</span>
        </div>
      </div>

      {/* Google Login */}
      <GoogleLoginButton
        role="TEACHER"
        onError={(err) => setError(err)}
      />

      {/* Footer Switcher */}
      <div className="text-center pt-2">
        <p className="text-xs sm:text-sm text-slate-700 font-bold">
          Thầy/Cô đã có tài khoản rồi?{' '}
          <Link
            href="/login?role=teacher"
            className="text-emerald-700 hover:text-emerald-800 font-black underline underline-offset-2"
          >
            Đăng nhập ngay tại đây
          </Link>
        </p>
      </div>
    </form>
  );
};
