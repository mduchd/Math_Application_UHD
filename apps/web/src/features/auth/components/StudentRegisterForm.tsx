'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, KeyRound, GraduationCap, ArrowRight } from 'lucide-react';
import { registerStudent } from '@/lib/api';
import { useAppStore } from '@/stores/useAppStore';
import { sound } from '@/lib/sound';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';
import { AUTH_MASCOTS } from '../types';
import { InputField } from './InputField';

export const StudentRegisterForm: React.FC = () => {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);

  const [studentName, setStudentName] = useState('');
  const [studentPin, setStudentPin] = useState('');
  const [studentMascot, setStudentMascot] = useState('owl');
  const [gradeLevel, setGradeLevel] = useState(3);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!studentName.trim()) {
      setError('Bé hãy nhập tên của mình nhé!');
      return;
    }
    if (studentPin.length < 4) {
      setError('Mã PIN cần có từ 4 đến 6 chữ số!');
      return;
    }

    setLoading(true);
    try {
      const mascotObj = AUTH_MASCOTS.find((m) => m.id === studentMascot);
      const res = await registerStudent({
        fullName: studentName.trim(),
        pin: studentPin,
        avatarMascot: mascotObj?.icon || '🦉',
        gradeLevel,
      });
      setUser(res.user);
      sound.playSuccess();
      router.push('/classroom');
    } catch (err: any) {
      setError(err?.message || 'Không thể tạo tài khoản. Bé hãy thử lại nhé!');
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

      {/* Input: Tên học sinh */}
      <InputField
        label="Tên của em là gì?"
        icon={<User className="w-4 h-4 text-amber-500" />}
        type="text"
        placeholder="Ví dụ: Nguyễn Minh Khôi"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        required
      />

      {/* Chọn bạn linh vật đồng hành */}
      <div>
        <label className="block text-xs font-black text-slate-800 mb-2">
          Chọn bạn linh vật đồng hành:
        </label>
        <div className="grid grid-cols-5 gap-2">
          {AUTH_MASCOTS.map((mItem) => {
            const isSelected = studentMascot === mItem.id;
            return (
              <button
                key={mItem.id}
                type="button"
                onClick={() => {
                  sound.playPop();
                  setStudentMascot(mItem.id);
                }}
                className={`py-2 px-1 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-100 shadow-sm scale-105'
                    : 'border-slate-200 bg-slate-50/70 hover:border-amber-300'
                }`}
              >
                <span className="text-xl sm:text-2xl">{mItem.icon}</span>
                <span className={`text-[10px] font-black mt-1 line-clamp-1 ${
                  isSelected ? 'text-amber-950 font-black' : 'text-slate-600'
                }`}>
                  {mItem.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Khối lớp */}
      <div>
        <label className="block text-xs font-black text-slate-800 mb-2 flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4 text-blue-500" />
          <span>Em đang học khối lớp mấy?</span>
        </label>
        <div className="grid grid-cols-5 gap-1.5">
          {[1, 2, 3, 4, 5].map((grade) => {
            const isSelected = gradeLevel === grade;
            return (
              <button
                key={grade}
                type="button"
                onClick={() => {
                  sound.playPop();
                  setGradeLevel(grade);
                }}
                className={`py-2.5 rounded-xl text-xs font-black border-2 transition-all ${
                  isSelected
                    ? 'bg-amber-400 border-amber-500 text-amber-950 shadow-sm font-black'
                    : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-amber-200'
                }`}
              >
                Lớp {grade}
              </button>
            );
          })}
        </div>
      </div>

      {/* Đặt mã PIN */}
      <InputField
        label="Đặt mã PIN bí mật (4-6 số):"
        icon={<KeyRound className="w-4 h-4 text-purple-500" />}
        isPassword
        maxLength={6}
        placeholder="Nhập 4-6 số bí mật để đăng nhập sau này"
        value={studentPin}
        onChange={(e) => setStudentPin(e.target.value.replace(/[^0-9]/g, ''))}
        required
      />

      {/* Submit Button: Signature Yellow Tactile Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-[0.99] text-amber-950 border-2 border-amber-500 shadow-tactile-yellow font-display font-black text-sm sm:text-base transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        <span>{loading ? 'Đang tạo hồ sơ học tập...' : 'Hoàn Tất & Vào Học Thôi!'}</span>
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-950" />
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
        role="STUDENT"
        onError={(err) => setError(err)}
      />

      {/* Footer Switcher */}
      <div className="text-center pt-2">
        <p className="text-xs sm:text-sm text-slate-700 font-bold">
          Bé đã có tài khoản rồi?{' '}
          <Link
            href="/login?role=student"
            className="text-amber-800 hover:text-amber-950 font-black underline underline-offset-2"
          >
            Đăng nhập tại đây
          </Link>
        </p>
      </div>
    </form>
  );
};
