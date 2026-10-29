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
  ShieldCheck,
  User as UserIcon,
  GraduationCap,
} from 'lucide-react';
import { registerStudent, registerTeacher } from '@/lib/api';
import { useAppStore } from '@/stores/useAppStore';
import { TactileButton } from '@/components/kid/TactileButton';
import { MascotOwl } from '@/components/kid/MascotOwl';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';
import { sound } from '@/lib/sound';

const MASCOTS = [
  { id: 'owl', icon: '🦉', label: 'Cú Bi' },
  { id: 'bear', icon: '🐻', label: 'Gấu Bự' },
  { id: 'rabbit', icon: '🐰', label: 'Thỏ Con' },
  { id: 'lion', icon: '🦁', label: 'Sư Tử' },
  { id: 'panda', icon: '🐼', label: 'Trúc Trúc' },
];

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') === 'teacher' ? 'teacher' : 'student';

  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>(defaultRole);
  const setUser = useAppStore((state) => state.setUser);

  // Học sinh fields
  const [studentName, setStudentName] = useState('');
  const [studentPin, setStudentPin] = useState('');
  const [studentMascot, setStudentMascot] = useState('owl');
  const [gradeLevel, setGradeLevel] = useState(3);

  // Giáo viên fields
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [teacherGrade, setTeacherGrade] = useState(3);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStudentRegister = async (e: React.FormEvent) => {
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
      const mascotObj = MASCOTS.find((m) => m.id === studentMascot);
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
      setError(err?.message || 'Không thể tạo tài khoản. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherRegister = async (e: React.FormEvent) => {
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
    <div className="min-h-screen bg-kid-cream flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-48 h-48 bg-emerald-100/50 rounded-full blur-2xl -z-0" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-amber-200/40 rounded-full blur-2xl -z-0" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Header Mascot */}
        <div className="text-center space-y-2 flex flex-col items-center">
          <MascotOwl
            size="md"
            mood="waving"
            speechBubble={
              activeTab === 'student'
                ? 'Tạo tài khoản nhanh để lưu giữ các ngôi sao và thành tích nhé! ⭐'
                : 'Đăng ký tài khoản để bắt đầu mở lớp và quản lý học sinh! 📋'
            }
          />
          <h1 className="font-display text-2xl md:text-3xl font-black text-slate-800">
            {activeTab === 'student' ? 'Đăng Ký Tài Khoản Học Sinh' : 'Đăng Ký Tài Khoản Giáo Viên'}
          </h1>
        </div>

        {/* Card Form */}
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

          {/* FORM ĐĂNG KÝ HỌC SINH */}
          {activeTab === 'student' ? (
            <form onSubmit={handleStudentRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1">
                  <UserIcon className="w-3.5 h-3.5 text-amber-500" /> Tên của em là gì?
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Minh Khôi"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 text-sm font-bold focus:border-amber-400 focus:outline-none bg-amber-50/20"
                />
              </div>

              {/* Chọn linh vật */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">
                  Chọn bạn linh vật đồng hành:
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {MASCOTS.map((mItem) => (
                    <button
                      key={mItem.id}
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        setStudentMascot(mItem.id);
                      }}
                      className={`p-2 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                        studentMascot === mItem.id
                          ? 'border-amber-500 bg-amber-100 shadow-sm scale-105'
                          : 'border-slate-200 bg-white hover:border-amber-300'
                      }`}
                    >
                      <span className="text-2xl">{mItem.icon}</span>
                      <span className="text-[10px] font-black text-slate-700 mt-1 line-clamp-1">
                        {mItem.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Khối lớp */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-500" /> Em đang học khối lớp mấy?
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5].map((grade) => (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => setGradeLevel(grade)}
                      className={`py-2 rounded-xl text-xs font-black border-2 transition-all ${
                        gradeLevel === grade
                          ? 'bg-amber-400 border-amber-500 text-amber-950 font-bold shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-amber-200'
                      }`}
                    >
                      Lớp {grade}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mã PIN */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-purple-500" /> Đặt mã PIN bí mật (4-6 số):
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
                  loadingText="Đang tạo tài khoản..."
                  className="w-full font-display font-black text-amber-950"
                >
                  <span>Hoàn Tất & Vào Học Thôi!</span>
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
                onError={(err) => setError(err)}
              />

              <div className="text-center pt-2">
                <p className="text-sm text-slate-700 font-bold">
                  Bé đã có tài khoản rồi?{' '}
                  <Link
                    href="/login?role=student"
                    className="text-amber-700 hover:text-amber-800 underline font-black"
                  >
                    Đăng nhập tại đây
                  </Link>
                </p>
              </div>
            </form>
          ) : (
            /* FORM ĐĂNG KÝ GIÁO VIÊN */
            <form onSubmit={handleTeacherRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1">
                  <UserIcon className="w-3.5 h-3.5 text-emerald-600" /> Họ và tên Thầy/Cô:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Cô Nguyễn Hoàng Mai"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 text-sm font-bold focus:border-emerald-500 focus:outline-none bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" /> Email cơ quan hoặc cá nhân:
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
                  <Lock className="w-3.5 h-3.5 text-emerald-600" /> Mật khẩu (tối thiểu 6 ký tự):
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

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-600" /> Khối lớp chủ nhiệm / giảng dạy:
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5].map((grade) => (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => setTeacherGrade(grade)}
                      className={`py-2 rounded-xl text-xs font-black border-2 transition-all ${
                        teacherGrade === grade
                          ? 'bg-emerald-500 border-emerald-600 text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-200'
                      }`}
                    >
                      Khối {grade}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <TactileButton
                  variant="green"
                  size="lg"
                  type="submit"
                  disabled={loading}
                  isLoading={loading}
                  loadingText="Đang khởi tạo tài khoản..."
                  className="w-full font-display font-black"
                >
                  <span>Hoàn Tất Đăng Ký Giáo Viên</span>
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
                onError={(err) => setError(err)}
              />

              <div className="text-center pt-2">
                <p className="text-sm text-slate-700 font-bold">
                  Thầy/Cô đã có tài khoản?{' '}
                  <Link
                    href="/login?role=teacher"
                    className="text-emerald-700 hover:text-emerald-800 underline font-black"
                  >
                    Đăng nhập tại đây
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Nút quay lại */}
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

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-kid-cream text-slate-600 font-bold">
          Đang tải trang đăng ký...
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
