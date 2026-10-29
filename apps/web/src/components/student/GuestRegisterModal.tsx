'use client';

import React, { useState } from 'react';
import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, KeyRound, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { registerStudent, submitAssessment } from '@/lib/api';
import { TactileButton } from '@/components/kid/TactileButton';
import { sound } from '@/lib/sound';
import { MotionDialog } from '@/components/motion/MotionDialog';
import { gentleSpring } from '@/lib/motion';

const MASCOTS = [
  { id: 'owl', icon: '🦉', label: 'Cú Thông Thái' },
  { id: 'bear', icon: '🐻', label: 'Gấu Chăm Chỉ' },
  { id: 'rabbit', icon: '🐰', label: 'Thỏ Nhanh Nhẹn' },
  { id: 'lion', icon: '🦁', label: 'Sư Tử Dũng Cảm' },
  { id: 'panda', icon: '🐼', label: 'Trúc Vui Vẻ' },
];

interface GuestRegisterModalProps {
  open: boolean;
  score: number;
  level: 'BASIC' | 'APPLIED' | 'ADVANCED';
  submissionData: any;
  onClose: () => void;
}

export const GuestRegisterModal: React.FC<GuestRegisterModalProps> = ({
  open,
  score,
  level,
  submissionData,
  onClose,
}) => {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);
  const setSubmission = useAppStore((state) => state.setSubmission);
  const setPlan = useAppStore((state) => state.setPlan);

  const [fullName, setFullName] = useState('');
  const [selectedMascot, setSelectedMascot] = useState('owl');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const levelName = {
    BASIC: 'Cơ bản',
    APPLIED: 'Vận dụng',
    ADVANCED: 'Vận dụng cao',
  }[level];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Bé hãy nhập tên của mình nhé!');
      return;
    }
    if (pin.length < 4) {
      setError('Mã PIN cần có 4 chữ số bí mật (ví dụ: 1234)');
      return;
    }

    setIsSaving(true);
    try {
      const mascotObj = MASCOTS.find((m) => m.id === selectedMascot);
      const authRes = await registerStudent({
        fullName: fullName.trim(),
        pin,
        avatarMascot: mascotObj?.icon || '🦉',
        gradeLevel: 3,
      });
      const user = authRes.user;

      // Prepare answers map
      const answersMap: Record<string, string> = submissionData.answers || {};

      const { gradeResult, learningPlan } = await submitAssessment(user.id, answersMap);

      setUser(user);
      setSubmission({
        id: gradeResult.id,
        studentId: user.id,
        totalQuestions: gradeResult.totalQuestions,
        correctAnswersCount: gradeResult.correctCount,
        score: gradeResult.score,
        proficiencyLevel: gradeResult.proficiencyLevel,
        answers: submissionData.answers || [],
        questionsReview: submissionData.questionsReview || [],
        completedAt: gradeResult.completedAt,
      });
      setPlan(learningPlan);
      sound.playSuccess();
      router.push('/plan');
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Không thể lưu bài làm.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MotionDialog
      open={open}
      onClose={onClose}
      ariaLabel="Lưu kết quả và mở lộ trình học tập"
      panelClassName="bg-white rounded-4xl max-w-lg w-full p-6 md:p-8 shadow-2xl space-y-6 border-2 border-kid-border relative"
    >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black flex items-center justify-center text-sm"
        >
          ✕
        </button>

        {/* Header chào đón */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-950 rounded-full text-xs font-black">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Lưu Kết Quả & Mở Lộ Trình
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-black text-slate-800">
            Bé Đạt Cấp Độ {levelName}! 🎉
          </h2>
          <p className="text-sm md:text-base text-slate-700 font-semibold leading-relaxed">
            Nhập tên và mã PIN 4 số đơn giản để bạn Cú Bi mở khóa Kế hoạch học tập nhé!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nhập tên */}
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-amber-500" /> Tên của em là gì?
            </label>
            <input
              type="text"
              required
              placeholder="Ví dụ: Nguyễn Minh Khôi"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 text-sm font-bold focus:border-amber-400 focus:outline-none bg-amber-50/20"
            />
          </div>

          {/* Chọn linh vật Mascot */}
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1.5">
              Chọn bạn linh vật đồng hành cùng em:
            </label>
            <div className="grid grid-cols-5 gap-2">
              {MASCOTS.map((mascot) => (
                <m.button
                  key={mascot.id}
                  type="button"
                  onClick={() => {
                    sound.playPop();
                    setSelectedMascot(mascot.id);
                  }}
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  animate={selectedMascot === mascot.id ? { y: -2, scale: 1.04 } : { y: 0, scale: 1 }}
                  transition={gentleSpring}
                  className={`p-2 rounded-2xl border-2 flex flex-col items-center justify-center transition-colors select-none ${
                    selectedMascot === mascot.id
                      ? 'border-amber-500 bg-amber-100 shadow-tactile-yellow scale-105'
                      : 'border-slate-200 hover:border-amber-300 bg-white'
                  }`}
                >
                  <span className="text-3xl">{mascot.icon}</span>
                  <span className="text-[10px] font-black text-slate-700 mt-1 line-clamp-1">
                    {mascot.label.split(' ')[0]}
                  </span>
                </m.button>
              ))}
            </div>
          </div>

          {/* Nhập mã PIN 4 số */}
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-purple-500" /> Mã PIN bí mật 4 số:
            </label>
            <input
              type="password"
              maxLength={4}
              required
              placeholder="1 2 3 4"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/[^0-9]/g, ''));
                setError('');
              }}
              className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 text-center font-display font-black text-xl tracking-widest focus:border-amber-400 focus:outline-none bg-amber-50/20"
            />
          </div>

          {error && (
            <p className="text-xs font-black text-rose-600 text-center bg-rose-50 p-2 rounded-xl border border-rose-200">
              {error}
            </p>
          )}

          {/* Nút hoàn tất Tactile */}
          <div className="pt-2">
            <TactileButton
              variant="green"
              size="lg"
              type="submit"
              disabled={isSaving}
              isLoading={isSaving}
              loadingText="Đang lưu bài làm..."
              className="w-full font-display font-black text-base"
            >
              <span>🌟 Lưu Bài Làm & Mở Bí Kíp AI</span>
              <ArrowRight className="w-5 h-5" />
            </TactileButton>
          </div>
        </form>
    </MotionDialog>
  );
};
