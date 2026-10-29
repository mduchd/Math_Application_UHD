'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, KeyRound, ArrowRight, HelpCircle, Gamepad2 } from 'lucide-react';
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
    } catch (err: any) {
      setError(err?.message || 'Không thể đăng nhập. Bé hãy kiểm tra lại tên và mã PIN nhé!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-login-form flex flex-col gap-4">
      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold text-center animate-in fade-in">
          {error}
        </div>
      )}

      {/* Input: Tên đăng nhập */}
      <InputField
        label="Tên hoặc Tên đăng nhập của em:"
        icon={<User className="w-4 h-4 text-amber-500" />}
        type="text"
        placeholder="Ví dụ: Minh Khôi hoặc khoi_1234"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        required
      />

      {/* Input: Mã PIN */}
      <div className="space-y-1">
        <InputField
          label="Mã PIN bí mật (4-6 số):"
          icon={<KeyRound className="w-4 h-4 text-purple-500" />}
          isPassword
          maxLength={6}
          placeholder="Nhập 4-6 số bí mật"
          value={studentPin}
          onChange={(e) => setStudentPin(e.target.value.replace(/[^0-9]/g, ''))}
          required
        />

        <div className="flex justify-end pt-0.5">
          <button
            type="button"
            onClick={() => setShowPinHelp(!showPinHelp)}
            className="text-xs font-bold text-amber-800 hover:text-amber-950 transition-colors inline-flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Bé quên mã PIN?</span>
          </button>
        </div>

        {showPinHelp && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 mt-1">
            💡 Bé đừng lo! Hãy nhờ Thầy/Cô chủ nhiệm hoặc Bố Mẹ kiểm tra lại mã PIN trong danh sách lớp nhé!
          </div>
        )}
      </div>

      {/* Primary Submit Button: Signature Yellow Tactile Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-[0.99] text-amber-950 border-2 border-amber-500 shadow-tactile-yellow font-display font-black text-sm sm:text-base transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        <span>{loading ? 'Đang vào lớp cùng Cú Bi...' : 'Vào Học Cùng Cú Bi'}</span>
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-950" />
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
        role="STUDENT"
        redirectPath={redirectPath || undefined}
        onError={(err) => setError(err)}
      />

      {/* Guest Mode Direct Access */}
      <div className="pt-1">
        <button
          type="button"
          disabled={loading || guestLoading}
          onClick={handleGuestLogin}
          className="w-full py-3 px-4 rounded-2xl bg-sky-50 hover:bg-sky-100 active:scale-[0.99] text-sky-950 border-2 border-sky-300 shadow-sm font-display font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          <Gamepad2 className="w-4 h-4 text-sky-600" />
          <span>{guestLoading ? 'Đang chuẩn bị lớp học thử...' : 'Trải Nghiệm Nhanh (Chế Độ Khách)'}</span>
        </button>
      </div>

      {/* Footer Switcher */}
      <div className="text-center pt-2 space-y-1.5">
        <p className="text-xs sm:text-sm text-slate-700 font-bold">
          Bé chưa có tài khoản?{' '}
          <Link
            href="/register?role=student"
            className="text-amber-800 hover:text-amber-950 font-black underline underline-offset-2"
          >
            Đăng ký tài khoản mới ngay
          </Link>
        </p>
        <p className="text-xs text-slate-600 font-semibold">
          Hoặc{' '}
          <Link
            href="/assessment"
            className="text-amber-700 hover:text-amber-800 font-bold underline underline-offset-2"
          >
            Làm bài khảo sát để mở khóa tài khoản
          </Link>
        </p>
      </div>
    </form>
  );
};
