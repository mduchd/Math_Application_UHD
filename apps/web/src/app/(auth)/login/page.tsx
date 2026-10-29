'use client';

import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { m } from 'framer-motion';
import {
  KeyRound,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  User as UserIcon,
} from 'lucide-react';
import { loginStudent, loginTeacher } from '@/lib/api';
import { useAppStore } from '@/stores/useAppStore';
import { TactileButton } from '@/components/kid/TactileButton';
import { MascotOwl } from '@/components/kid/MascotOwl';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';
import { sound } from '@/lib/sound';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') === 'teacher' ? 'teacher' : 'student';
  const redirectPath = searchParams.get('redirect');

  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>(defaultRole);
  const setUser = useAppStore((state) => state.setUser);

  // Học sinh state
  const [studentName, setStudentName] = useState('');
  const [studentPin, setStudentPin] = useState('');

  // Giáo viên state
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!studentName.trim()) {
      setError('Bé hãy nhập tên hoặc tên đăng nhập của mình nhé!');
      return;
    }
    if (studentPin.length < 4) {
      setError('Mã PIN cần có ít nhất 4 chữ số!');
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

  const handleTeacherSubmit = async (e: React.FormEvent) => {
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
    <div className="min-h-screen bg-kid-cream flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-amber-200/40 rounded-full blur-2xl -z-0" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-emerald-100/50 rounded-full blur-2xl -z-0" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Header Mascot */}
        <div className="text-center space-y-2 flex flex-col items-center">
          <MascotOwl
            size="md"
            mood={activeTab === 'student' ? 'waving' : 'thinking'}
            speechBubble={
              activeTab === 'student'
                ? 'Chào bạn nhỏ! Nhập tên và mã PIN để vào lớp nhé! 🎒'
                : 'Kính chào Thầy/Cô đã quay trở lại không gian quản lý! 📚'
            }
          />
          <h1 className="font-display text-2xl md:text-3xl font-black text-slate-800">
            {activeTab === 'student' ? 'Đăng Nhập Cổng Học Sinh' : 'Đăng Nhập Không Gian Giáo Viên'}
          </h1>
        </div>

        {/* Card Đăng nhập */}
        <div className="bg-white rounded-4xl p-6 md:p-8 shadow-xl border-2 border-kid-border space-y-6">
          {/* Tab chọn vai trò */}
          <div className="grid grid-cols-2 p-1.5 bg-slate-100 rounded-2xl gap-1">
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setActiveTab('student');
                setError('');
              }}
              className={`py-2 px-3 rounded-xl font-display font-black text-xs md:text-sm transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'student'
                  ? 'bg-amber-400 text-amber-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🎒 Học Sinh</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setActiveTab('teacher');
                setError('');
              }}
              className={`py-2 px-3 rounded-xl font-display font-black text-xs md:text-sm transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'teacher'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>👩‍🏫 Giáo Viên</span>
            </button>
          </div>

          {error && (
            <m.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold text-center"
            >
              {error}
            </m.div>
          )}

          {/* FORM HỌC SINH */}
          {activeTab === 'student' ? (
            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1">
                  <UserIcon className="w-3.5 h-3.5 text-amber-500" /> Tên hoặc Tên đăng nhập của em:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Minh Khôi hoặc khoi_1234"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 text-sm font-bold focus:border-amber-400 focus:outline-none bg-amber-50/20"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-purple-500" /> Mã PIN bí mật 4-6 số:
                </label>
                <input
                  type="password"
                  maxLength={6}
                  required
                  placeholder="• • • •"
                  value={studentPin}
                  onChange={(e) => setStudentPin(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 text-center font-display font-black text-xl tracking-widest focus:border-amber-400 focus:outline-none bg-amber-50/20"
                />
              </div>

              <div className="pt-2">
                <TactileButton
                  variant="yellow"
                  size="lg"
                  type="submit"
                  disabled={loading}
                  isLoading={loading}
                  loadingText="Đang vào lớp..."
                  className="w-full font-display font-black text-amber-950"
                >
                  <span>Vào Học Cùng Cú Bi</span>
                  <ArrowRight className="w-5 h-5" />
                </TactileButton>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-slate-600 font-black">Hoặc</span>
                </div>
              </div>

              <GoogleLoginButton
                role="STUDENT"
                redirectPath={redirectPath || undefined}
                onError={(err) => setError(err)}
              />

              <div className="text-center pt-2">
                <p className="text-sm text-slate-700 font-bold">
                  Bé chưa có tài khoản?{' '}
                  <Link
                    href="/assessment"
                    className="text-amber-700 hover:text-amber-800 underline font-black"
                  >
                    Làm bài khảo sát để mở khóa tài khoản!
                  </Link>
                </p>
              </div>
            </form>
          ) : (
            /* FORM GIÁO VIÊN */
            <form onSubmit={handleTeacherSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" /> Email giáo viên:
                </label>
                <input
                  type="email"
                  required
                  placeholder="giaovien@truonghoc.edu.vn"
                  value={teacherEmail}
                  onChange={(e) => setTeacherEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 text-sm font-bold focus:border-emerald-500 focus:outline-none bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" /> Mật khẩu:
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={teacherPassword}
                  onChange={(e) => setTeacherPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 text-sm font-bold focus:border-emerald-500 focus:outline-none bg-slate-50"
                />
              </div>

              <div className="pt-2">
                <TactileButton
                  variant="green"
                  size="lg"
                  type="submit"
                  disabled={loading}
                  isLoading={loading}
                  loadingText="Đang xác thực..."
                  className="w-full font-display font-black"
                >
                  <span>Đăng Nhập Quản Lý Lớp</span>
                  <ArrowRight className="w-5 h-5" />
                </TactileButton>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-slate-600 font-black">Hoặc</span>
                </div>
              </div>

              <GoogleLoginButton
                role="TEACHER"
                redirectPath={redirectPath || undefined}
                onError={(err) => setError(err)}
              />

              <div className="text-center pt-2">
                <p className="text-sm text-slate-700 font-bold">
                  Thầy/Cô chưa có tài khoản?{' '}
                  <Link
                    href="/register?role=teacher"
                    className="text-emerald-700 hover:text-emerald-800 underline font-black"
                  >
                    Đăng ký tài khoản Giáo viên mới
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Nút quay về trang chủ */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm font-black text-slate-700 hover:text-slate-900 transition-colors inline-flex items-center gap-1"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-kid-cream text-slate-600 font-bold">
          Đang tải trang đăng nhập...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
