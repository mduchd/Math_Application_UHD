'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginStudent, loginAsGuest } from '@/lib/api';
import { useAppStore } from '@/stores/useAppStore';
import { sound } from '@/lib/sound';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';
import { InputField } from './InputField';

interface StudentLoginFormProps {
  redirectPath?: string | null;
}

export const StudentLoginForm: React.FC<StudentLoginFormProps> = ({ redirectPath }) => {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);

  const [studentName, setStudentName] = useState('');
  const [studentPin, setStudentPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [showPinHelp, setShowPinHelp] = useState(false);

  const handleGuestLogin = async () => {
    setError('');
    setGuestLoading(true);
    try {
      const res = await loginAsGuest();
      setUser(res.user);
      sound.playSuccess();
      router.push(redirectPath || '/classroom');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Không thể khởi tạo chế độ khách.');
    } finally {
      setGuestLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!studentName.trim()) {
      setError('Bé hãy nhập tên hoặc tên đăng nhập của mình nhé!');
      return;
    }
    if (studentPin.length < 4) {
      setError('Mã PIN bí mật cần có từ 4 đến 6 chữ số!');
      return;
    }

    setLoading(true);
    try {
      const res = await loginStudent({
        identifier: studentName.trim(),
        pin: studentPin,
      });
      setUser(res.user);
      sound.playSuccess();
      router.push(redirectPath || '/classroom');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Không thể đăng nhập. Bé hãy kiểm tra lại tên và mã PIN nhé!');
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

      {/* Input: Tên đăng nhập */}
      <InputField
        label="Tên hoặc tên đăng nhập"
        type="text"
        placeholder="Minh Khôi hoặc khoi_1234"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        autoComplete="username"
        required
      />

      {/* Input: Mã PIN */}
      <div className="space-y-1">
        <InputField
          label="Mã PIN (4–6 số)"
          isPassword
          maxLength={6}
          placeholder="Nhập mã PIN"
          value={studentPin}
          onChange={(e) => setStudentPin(e.target.value.replace(/[^0-9]/g, ''))}
          autoComplete="current-password"
          inputMode="numeric"
          required
        />

        <div className="flex justify-end pt-0.5">
          <button
            type="button"
            onClick={() => setShowPinHelp(!showPinHelp)}
            aria-expanded={showPinHelp}
            className="text-sm font-extrabold text-amber-800 transition-colors hover:text-amber-950"
          >
            Quên mã PIN?
          </button>
        </div>

        {showPinHelp && (
          <div className="mt-1 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-bold text-amber-900">
            Nhờ phụ huynh hoặc giáo viên kiểm tra lại mã PIN giúp bé nhé.
          </div>
        )}
      </div>

      {/* Primary Submit Button: Signature Yellow Tactile Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl border-2 border-amber-500 bg-amber-400 px-6 py-3.5 text-sm font-black text-amber-950 shadow-tactile-yellow transition-all hover:bg-amber-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
      >
        {loading ? 'Đang đăng nhập...' : 'Vào học'}
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
        role="STUDENT"
        redirectPath={redirectPath || undefined}
        onError={(err) => setError(err)}
      />

      <button
        type="button"
        disabled={loading || guestLoading}
        onClick={handleGuestLogin}
        className="mx-auto text-sm font-extrabold text-amber-800 underline underline-offset-4 transition-colors hover:text-amber-950 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {guestLoading ? 'Đang chuẩn bị...' : 'Dùng thử không cần tài khoản'}
      </button>

      {/* Footer Switcher */}
      <div className="text-center pt-2 space-y-1.5">
        <p className="text-sm font-bold text-slate-700">
          Chưa có tài khoản?{' '}
          <Link
            href="/register?role=student"
            className="text-amber-800 hover:text-amber-950 font-black underline underline-offset-2"
          >
            Tạo tài khoản
          </Link>
        </p>
      </div>
    </form>
  );
};
