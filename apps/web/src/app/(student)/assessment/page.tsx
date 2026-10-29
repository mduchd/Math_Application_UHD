'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, BrainCircuit, Star, Volume2 } from 'lucide-react';
import { LevelBadge } from '@/components/student/LevelBadge';
import { AudioButton } from '@/components/shared/AudioButton';
import { GuestRegisterModal } from '@/components/student/GuestRegisterModal';
import { MascotOwl } from '@/components/kid/MascotOwl';
import { TactileButton } from '@/components/kid/TactileButton';
import { sound } from '@/lib/sound';
import { gentleSpring, listItemVariants, staggerContainerVariants } from '@/lib/motion';

interface Question {
  id: string;
  questionText: string;
  audioPrompt: string;
  options: { id: string; letter: string; text: string }[];
  correctOptionId: string;
  explanation: string;
}

const mockQuestions: Question[] = [
  {
    id: 'q1',
    questionText: 'Tính nhẩm nhanh: 25 + 38 = ?',
    audioPrompt: 'Hãy tính nhẩm: hai mươi lăm cộng ba mươi tám bằng bao nhiêu?',
    options: [
      { id: 'opt_a', letter: 'A', text: '53' },
      { id: 'opt_b', letter: 'B', text: '63' },
      { id: 'opt_c', letter: 'C', text: '62' },
      { id: 'opt_d', letter: 'D', text: '73' },
    ],
    correctOptionId: 'opt_b',
    explanation: 'Ta cộng hàng đơn vị trước: 5 + 8 = 13 (viết 3 nhớ 1). Sau đó 2 + 3 + 1 = 6. Kết quả chính xác là 63!',
  },
  {
    id: 'q2',
    questionText: 'Bạn Lan có 15 viên kẹo, cho Mai 4 viên và cho Hùng 3 viên. Hỏi Lan còn lại bao nhiêu viên kẹo?',
    audioPrompt: 'Bạn Lan có 15 viên kẹo, cho Mai 4 viên và cho Hùng 3 viên. Hỏi Lan còn lại bao nhiêu viên kẹo?',
    options: [
      { id: 'opt_a', letter: 'A', text: '7 viên' },
      { id: 'opt_b', letter: 'B', text: '8 viên' },
      { id: 'opt_c', letter: 'C', text: '9 viên' },
      { id: 'opt_d', letter: 'D', text: '10 viên' },
    ],
    correctOptionId: 'opt_b',
    explanation: 'Tổng số kẹo Lan đã cho bạn là: 4 + 3 = 7 (viên). Số kẹo Lan còn lại là: 15 - 7 = 8 (viên).',
  },
  {
    id: 'q3',
    questionText: 'Trong giờ ra chơi ở sân trường, nếu em thấy bạn làm rơi đồ thì em nên làm gì?',
    audioPrompt: 'Trong giờ ra chơi ở sân trường, nếu em thấy bạn làm rơi đồ thì em nên làm gì?',
    options: [
      { id: 'opt_a', letter: 'A', text: 'Cất vào cặp mang về nhà' },
      { id: 'opt_b', letter: 'B', text: 'Nhặt lên và gửi thầy cô giáo hoặc ban giám hiệu' },
      { id: 'opt_c', letter: 'C', text: 'Bỏ đi xem như không thấy' },
      { id: 'opt_d', letter: 'D', text: 'Đem cho một bạn khác cùng lớp' },
    ],
    correctOptionId: 'opt_b',
    explanation: 'Kỹ năng sống: Khi nhặt được của rơi, em cần gửi lại thầy cô hoặc phòng Đội để tìm và trả lại người đánh mất nhé!',
  },
  {
    id: 'q4',
    questionText: 'Tìm số tiếp theo trong quy luật dãy số: 2, 4, 8, 16, ...',
    audioPrompt: 'Tìm số tiếp theo trong quy luật dãy số: 2, 4, 8, 16',
    options: [
      { id: 'opt_a', letter: 'A', text: '24' },
      { id: 'opt_b', letter: 'B', text: '30' },
      { id: 'opt_c', letter: 'C', text: '32' },
      { id: 'opt_d', letter: 'D', text: '64' },
    ],
    correctOptionId: 'opt_c',
    explanation: 'Quy luật nhân đôi: Mỗi số sau gấp 2 lần số liền trước. Ta có 16 x 2 = 32!',
  },
];

export default function AssessmentPage() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const currentQ = mockQuestions[currentIdx];

  const handleSelectOption = useCallback((optionId: string) => {
    sound.playPop();
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  }, [currentQ.id]);

  const handleNext = useCallback(() => {
    sound.playPop();
    if (currentIdx < mockQuestions.length - 1) {
      setDirection(1);
      setCurrentIdx((prev) => prev + 1);
    }
  }, [currentIdx]);

  const handlePrev = useCallback(() => {
    sound.playPop();
    if (currentIdx > 0) {
      setDirection(-1);
      setCurrentIdx((prev) => prev - 1);
    }
  }, [currentIdx]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitted(true);
    setShowRegisterModal(true);
    sound.playCelebration();
    if (!shouldReduceMotion) {
      try {
        const { default: confetti } = await import('canvas-confetti');
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (error) {
        console.warn('Không thể phát hiệu ứng chúc mừng', error);
      }
    }
  }, [shouldReduceMotion]);

  // Hỗ trợ phím tắt A, B, C, D (hoặc 1, 2, 3, 4) và Enter/Arrow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Bỏ qua khi đang mở modal đăng ký hoặc đã nộp bài
      if (isSubmitted || showRegisterModal) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;

      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT' ||
        target?.isContentEditable
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      // Ánh xạ phím A, B, C, D (hỗ trợ cả gõ tiếng Việt Telex/VNI và phím số 1-4)
      let targetLetter = '';
      if (key === 'a' || key === 'â' || key === 'ă' || key === '1') targetLetter = 'A';
      else if (key === 'b' || key === '2') targetLetter = 'B';
      else if (key === 'c' || key === '3') targetLetter = 'C';
      else if (key === 'd' || key === 'đ' || key === '4') targetLetter = 'D';

      if (targetLetter) {
        const matched = currentQ.options.find(
          (opt) => opt.letter.toUpperCase() === targetLetter
        );
        if (matched) {
          e.preventDefault();
          handleSelectOption(matched.id);
          return;
        }
      }

      // Enter hoặc ArrowRight để chuyển câu tiếp theo (nếu đã chọn đáp án)
      if (e.key === 'Enter' || e.key === 'ArrowRight') {
        if (selectedAnswers[currentQ.id]) {
          e.preventDefault();
          if (currentIdx < mockQuestions.length - 1) {
            handleNext();
          } else {
            void handleSubmit();
          }
        }
        return;
      }

      // ArrowLeft để quay lại câu trước
      if (e.key === 'ArrowLeft') {
        if (currentIdx > 0) {
          e.preventDefault();
          handlePrev();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isSubmitted,
    showRegisterModal,
    currentQ.options,
    currentQ.id,
    currentIdx,
    selectedAnswers,
    handleSelectOption,
    handleNext,
    handlePrev,
    handleSubmit,
  ]);

  // Tính điểm & Xếp loại
  let correctCount = 0;
  mockQuestions.forEach((q) => {
    if (selectedAnswers[q.id] === q.correctOptionId) {
      correctCount++;
    }
  });

  const score = Math.round((correctCount / mockQuestions.length) * 100);
  const level: 'BASIC' | 'APPLIED' | 'ADVANCED' =
    score < 50 ? 'BASIC' : score <= 80 ? 'APPLIED' : 'ADVANCED';

  const optionColors = [
    { badgeBg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700/60', activeBorder: 'border-amber-400 bg-amber-50/70 dark:bg-amber-950/40 shadow-tactile-yellow' },
    { badgeBg: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-700/60', activeBorder: 'border-sky-400 bg-sky-50/70 dark:bg-sky-950/40 shadow-tactile-blue' },
    { badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700/60', activeBorder: 'border-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-tactile-green' },
    { badgeBg: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700/60', activeBorder: 'border-purple-400 bg-purple-50/70 dark:bg-purple-950/40 shadow-tactile-purple' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* BANNER THÂN THIỆN CÓ LINH VẬT CÚ BI BÁC HỌC */}
      <div className="flex flex-col sm:flex-row items-center gap-5">
        <MascotOwl size="md" mood={isSubmitted ? 'celebrating' : 'thinking'} />
        <div className="text-center sm:text-left flex-1 space-y-1.5">
          <h1 className="font-display text-2xl md:text-3xl font-black text-slate-800 dark:text-white">
            Khảo Sát Năng Lực Đầu Vào
          </h1>
          <p className="text-slate-700 dark:text-slate-300 text-sm font-bold">
            Bé hãy tự tin chọn đáp án nhé! Cú Bi sẽ gợi ý kế hoạch học tập siêu vui phù hợp với bé.
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
      {!isSubmitted ? (
        /* MÀN HÌNH ĐANG LÀM BÀI */
        <m.div
          key={`question-${currentQ.id}`}
          initial={shouldReduceMotion ? false : { opacity: 0, x: direction * 22 }}
          animate={{ opacity: 1, x: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, x: direction * -16 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white dark:bg-slate-900/90 rounded-4xl border-2 border-kid-border dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6"
        >
          {/* Thanh tiến độ dạng kẹo chạy đua */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs md:text-sm font-black text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5 font-display text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-700/60">
                ⭐ Thử thách {currentIdx + 1} / {mockQuestions.length}
              </span>
              <AudioButton textToRead={currentQ.audioPrompt} />
            </div>

            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3.5 p-0.5 border border-slate-200 dark:border-slate-700 overflow-hidden">
              <m.div
                className="bg-amber-400 h-full rounded-full shadow-inner"
                initial={false}
                animate={{ width: `${((currentIdx + 1) / mockQuestions.length) * 100}%` }}
                transition={gentleSpring}
              />
            </div>
          </div>

          {/* Câu hỏi to rõ ràng */}
          <div className="py-2">
            <h2 className="font-display text-xl md:text-2xl font-black text-slate-800 dark:text-white leading-snug">
              {currentQ.questionText}
            </h2>
          </div>

          {/* Danh sách 4 đáp án dạng Chunky Tactile Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === opt.id;
              const colorConfig = optionColors[idx % optionColors.length];
              return (
                <m.button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  animate={isSelected ? { scale: [1, 1.025, 1] } : { scale: 1 }}
                  transition={gentleSpring}
                  className={`p-4 md:p-5 rounded-3xl border-2 font-extrabold text-left transition-colors duration-100 flex items-center justify-between text-base select-none ${
                    isSelected
                      ? `border-b-4 ${colorConfig.activeBorder} scale-[1.01]`
                      : 'border-slate-200 dark:border-slate-700 border-b-4 hover:border-amber-300 dark:hover:border-amber-500 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800/80 hover:bg-amber-50/30 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center font-display font-black text-sm border-2 ${
                        isSelected
                          ? 'bg-amber-400 border-amber-500 text-amber-950'
                          : colorConfig.badgeBg
                      }`}
                    >
                      {opt.letter}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-white text-sm md:text-base">{opt.text}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`hidden sm:inline-flex items-center justify-center px-2 py-0.5 text-xs font-black rounded-lg border transition-colors ${
                        isSelected
                          ? 'bg-amber-200/70 dark:bg-amber-900/50 text-amber-950 dark:text-amber-200 border-amber-300 dark:border-amber-700'
                          : 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/60 border-slate-200 dark:border-slate-600'
                      }`}
                      title={`Bấm phím ${opt.letter} trên bàn phím`}
                    >
                      Phím {opt.letter}
                    </span>
                    <m.div
                      animate={isSelected ? { scale: [0.65, 1.18, 1] } : { scale: 1 }}
                      transition={gentleSpring}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-black text-xs ${
                        isSelected
                          ? 'border-amber-500 bg-amber-400 text-amber-950'
                          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-transparent'
                      }`}
                    >
                      ✓
                    </m.div>
                  </div>
                </m.button>
              );
            })}
          </div>

          {/* Hướng dẫn phím tắt trực quan */}
          <div className="hidden sm:flex items-center justify-center gap-2 text-xs md:text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 py-2.5 px-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            <span>Bé có thể nhấn phím</span>
            <span className="inline-flex items-center gap-1">
              {['A', 'B', 'C', 'D'].map((k) => (
                <kbd
                  key={k}
                  className="px-2 py-0.5 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-white font-black text-xs shadow-2xs"
                >
                  {k}
                </kbd>
              ))}
            </span>
            <span>để chọn nhanh, và</span>
            <kbd className="px-2 py-0.5 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-white font-black text-xs shadow-2xs">
              Enter ↵
            </kbd>
            <span>để sang câu tiếp!</span>
          </div>

          {/* Điều hướng chuyển câu với Tactile Button */}
          <div className="flex items-center justify-between pt-6 border-t-2 border-kid-border dark:border-slate-800">
            <TactileButton
              variant="white"
              size="md"
              onClick={handlePrev}
              disabled={currentIdx === 0}
            >
              Quay lại
            </TactileButton>

            {currentIdx < mockQuestions.length - 1 ? (
              <TactileButton
                variant="yellow"
                size="md"
                onClick={handleNext}
                disabled={!selectedAnswers[currentQ.id]}
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </TactileButton>
            ) : (
              <TactileButton
                variant="green"
                size="md"
                onClick={handleSubmit}
                disabled={!selectedAnswers[currentQ.id]}
              >
                <Sparkles className="w-4 h-4" />
                <span>Nộp bài & Xem kết quả</span>
              </TactileButton>
            )}
          </div>
        </m.div>
      ) : (
        /* MÀN HÌNH KẾT QUẢ & XEM LẠI ĐÁP ÁN */
        <m.div
          key="assessment-result"
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Card Tổng kết điểm & Cấp độ */}
          <m.div variants={listItemVariants} className="bg-white dark:bg-slate-900/90 rounded-4xl border-2 border-kid-border dark:border-slate-800 p-8 shadow-xs text-center space-y-4">
            <m.div
              initial={shouldReduceMotion ? false : { scale: 0.55, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ ...gentleSpring, delay: 0.08 }}
              className="text-6xl"
            >🏆</m.div>
            <h2 className="font-display text-3xl font-black text-slate-800 dark:text-white">
              Chúc Mừng Bé Đã Hoàn Thành!
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base font-semibold">
              Bé đã trả lời đúng <strong className="text-emerald-600 dark:text-emerald-400 text-lg">{correctCount}</strong> trên tổng số{' '}
              <strong className="text-slate-800 dark:text-white">{mockQuestions.length}</strong> câu hỏi.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <LevelBadge level={level} score={score} />
              <TactileButton
                variant="purple"
                size="md"
                onClick={() => router.push('/plan')}
              >
                <BrainCircuit className="w-4 h-4" />
                <span>Xem Bí Kíp Học Tập AI</span>
              </TactileButton>
            </div>
          </m.div>

          {/* Khu vực xem lại chi tiết từng câu */}
          <m.div variants={listItemVariants} className="bg-white dark:bg-slate-900/90 rounded-4xl border-2 border-kid-border dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b-2 border-kid-border dark:border-slate-800 pb-4">
              <h3 className="font-display text-xl font-black text-slate-800 dark:text-white">
                Xem Lại Lời Giải & Hướng Dẫn
              </h3>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                {correctCount}/{mockQuestions.length} câu đúng
              </span>
            </div>

            <m.div variants={staggerContainerVariants} className="space-y-5">
              {mockQuestions.map((q, qIndex) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctOptionId;
                const userOpt = q.options.find((o) => o.id === userAns);
                const correctOpt = q.options.find((o) => o.id === q.correctOptionId);

                return (
                  <m.div
                    key={q.id}
                    variants={listItemVariants}
                    className={`p-5 rounded-3xl border-2 ${
                      isCorrect
                        ? 'border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/30 dark:bg-emerald-950/20'
                        : 'border-rose-200 dark:border-rose-800/80 bg-rose-50/30 dark:bg-rose-950/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="font-bold text-slate-800 dark:text-white text-sm md:text-base">
                        <span className="text-slate-600 dark:text-slate-400 font-extrabold mr-2">Câu {qIndex + 1}:</span>
                        {q.questionText}
                      </div>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-black text-xs shrink-0 bg-emerald-100 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Đúng
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-black text-xs shrink-0 bg-rose-100 dark:bg-rose-950/50 px-2.5 py-1 rounded-full border border-rose-300 dark:border-rose-800">
                          <XCircle className="w-3.5 h-3.5" /> Chưa đúng
                        </span>
                      )}
                    </div>

                    <div className="text-xs md:text-sm text-slate-600 dark:text-slate-300 space-y-1 my-3 bg-white dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <div>
                        Đáp án của bé: <strong className={isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>{userOpt?.letter}. {userOpt?.text || 'Chưa chọn'}</strong>
                      </div>
                      {!isCorrect && (
                        <div>
                          Đáp án đúng là: <strong className="text-emerald-600 dark:text-emerald-400">{correctOpt?.letter}. {correctOpt?.text}</strong>
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-300 bg-amber-50/80 dark:bg-amber-950/40 p-3 rounded-2xl border border-amber-200 dark:border-amber-800/60 flex items-start gap-2">
                      <span className="text-base">💡</span>
                      <p className="leading-relaxed font-semibold">
                        <strong className="text-amber-950 dark:text-amber-300">Lời giải của Cú Bi:</strong> {q.explanation}
                      </p>
                    </div>
                  </m.div>
                );
              })}
            </m.div>

            <div className="pt-4 flex justify-center">
              <TactileButton
                variant="white"
                size="md"
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentIdx(0);
                  setSelectedAnswers({});
                }}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Làm lại bài khảo sát</span>
              </TactileButton>
            </div>
          </m.div>
        </m.div>
      )}
      </AnimatePresence>

      {/* MODAL LƯU TÊN & CHỌN LINH VẬT */}
      <GuestRegisterModal
        open={showRegisterModal}
        score={score}
        level={level}
        submissionData={{
          score,
          answers: selectedAnswers,
        }}
        onClose={() => setShowRegisterModal(false)}
      />
    </div>
  );
}
