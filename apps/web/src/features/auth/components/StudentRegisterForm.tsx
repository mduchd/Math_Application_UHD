'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Không thể tạo tài khoản. Bé hãy thử lại nhé!');
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

      {/* Input: Tên học sinh */}
      <InputField
        label="Tên của bé"
        type="text"
        placeholder="Ví dụ: Nguyễn Minh Khôi"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        autoComplete="name"
        required
      />

      {/* Chọn linh vật */}
      <div>
        <label className="mb-2 block text-sm font-black text-slate-800">
          Chọn linh vật
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
                <span className={`mt-1 text-sm font-black leading-tight ${
                  isSelected ? 'text-amber-950 font-black' : 'text-slate-700'
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
        <label className="mb-2 block text-sm font-black text-slate-800">
          Lớp đang học
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
                className={`rounded-xl border-2 py-2.5 text-sm font-black transition-all ${
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
        label="Mã PIN (4–6 số)"
        isPassword
        maxLength={6}
        placeholder="Nhập mã PIN"
        value={studentPin}
        onChange={(e) => setStudentPin(e.target.value.replace(/[^0-9]/g, ''))}
        autoComplete="new-password"
        inputMode="numeric"
        required
      />

      {/* Submit Button: Signature Yellow Tactile Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl border-2 border-amber-500 bg-amber-400 px-6 py-3.5 text-sm font-black text-amber-950 shadow-tactile-yellow transition-all hover:bg-amber-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
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
        role="STUDENT"
        onError={(err) => setError(err)}
      />

      {/* Footer Switcher */}
      <div className="text-center pt-2">
        <p className="text-sm font-bold text-slate-700">
          Đã có tài khoản?{' '}
          <Link
            href="/login?role=student"
            className="text-amber-800 hover:text-amber-950 font-black underline underline-offset-2"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </form>
  );
};
