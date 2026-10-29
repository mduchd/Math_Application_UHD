'use client';

import React, { useState } from 'react';
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

  const handleSelectOption = (optionId: string) => {
    sound.playPop();
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleNext = () => {
    sound.playPop();
    if (currentIdx < mockQuestions.length - 1) {
      setDirection(1);
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    sound.playPop();
    if (currentIdx > 0) {
      setDirection(-1);
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmit = async () => {
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
  };

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
    { badgeBg: 'bg-amber-100 text-amber-800 border-amber-300', activeBorder: 'border-amber-400 bg-amber-50/70 shadow-tactile-yellow' },
    { badgeBg: 'bg-sky-100 text-sky-800 border-sky-300', activeBorder: 'border-sky-400 bg-sky-50/70 shadow-tactile-blue' },
    { badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300', activeBorder: 'border-emerald-400 bg-emerald-50/70 shadow-tactile-green' },
    { badgeBg: 'bg-purple-100 text-purple-800 border-purple-300', activeBorder: 'border-purple-400 bg-purple-50/70 shadow-tactile-purple' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* BANNER THÂN THIỆN CÓ LINH VẬT CÚ BI BÁC HỌC */}
      <div className="bg-white border-2 border-kid-border rounded-4xl p-6 shadow-xs flex flex-col sm:flex-row items-center gap-5">
        <MascotOwl size="md" mood={isSubmitted ? 'celebrating' : 'thinking'} />
        <div className="text-center sm:text-left flex-1 space-y-1.5">
          <h1 className="font-display text-2xl md:text-3xl font-black text-slate-800">
            Khảo Sát Năng Lực Đầu Vào
          </h1>
          <p className="text-slate-700 text-sm font-bold">
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
          className="bg-white rounded-4xl border-2 border-kid-border p-6 md:p-8 shadow-xs space-y-6"
        >
          {/* Thanh tiến độ dạng kẹo chạy đua */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs md:text-sm font-black text-slate-600">
              <span className="flex items-center gap-1.5 font-display text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                ⭐ Thử thách {currentIdx + 1} / {mockQuestions.length}
              </span>
              <AudioButton textToRead={currentQ.audioPrompt} />
            </div>

            <div className="w-full bg-slate-100 rounded-full h-3.5 p-0.5 border border-slate-200 overflow-hidden">
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
            <h2 className="font-display text-xl md:text-2xl font-black text-slate-800 leading-snug">
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
                      : 'border-slate-200 border-b-4 hover:border-amber-300 text-slate-700 bg-white hover:bg-amber-50/30'
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
                    <span className="font-bold text-slate-800 text-sm md:text-base">{opt.text}</span>
                  </div>

                  <m.div
                    animate={isSelected ? { scale: [0.65, 1.18, 1] } : { scale: 1 }}
                    transition={gentleSpring}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-black text-xs ${
                      isSelected
                        ? 'border-amber-500 bg-amber-400 text-amber-950'
                        : 'border-slate-300 bg-white text-transparent'
                    }`}
                  >
                    ✓
                  </m.div>
                </m.button>
              );
            })}
          </div>

          {/* Điều hướng chuyển câu với Tactile Button */}
          <div className="flex items-center justify-between pt-6 border-t-2 border-kid-border">
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
          <m.div variants={listItemVariants} className="bg-white rounded-4xl border-2 border-kid-border p-8 shadow-xs text-center space-y-4">
            <m.div
              initial={shouldReduceMotion ? false : { scale: 0.55, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ ...gentleSpring, delay: 0.08 }}
              className="text-6xl"
            >🏆</m.div>
            <h2 className="font-display text-3xl font-black text-slate-800">
              Chúc Mừng Bé Đã Hoàn Thành!
            </h2>
            <p className="text-slate-600 text-base font-semibold">
              Bé đã trả lời đúng <strong className="text-emerald-600 text-lg">{correctCount}</strong> trên tổng số{' '}
              <strong className="text-slate-800">{mockQuestions.length}</strong> câu hỏi.
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
          <m.div variants={listItemVariants} className="bg-white rounded-4xl border-2 border-kid-border p-6 md:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b-2 border-kid-border pb-4">
              <h3 className="font-display text-xl font-black text-slate-800">
                Xem Lại Lời Giải & Hướng Dẫn
              </h3>
              <span className="text-sm font-bold text-slate-700">
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
                        ? 'border-emerald-200 bg-emerald-50/30'
                        : 'border-rose-200 bg-rose-50/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="font-bold text-slate-800 text-sm md:text-base">
                        <span className="text-slate-600 font-extrabold mr-2">Câu {qIndex + 1}:</span>
                        {q.questionText}
                      </div>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-black text-xs shrink-0 bg-emerald-100 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Đúng
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-600 font-black text-xs shrink-0 bg-rose-100 px-2.5 py-1 rounded-full">
                          <XCircle className="w-3.5 h-3.5" /> Chưa đúng
                        </span>
                      )}
                    </div>

                    <div className="text-xs md:text-sm text-slate-600 space-y-1 my-3 bg-white p-3 rounded-2xl border border-slate-100">
                      <div>
                        Đáp án của bé: <strong className={isCorrect ? 'text-emerald-600' : 'text-rose-600'}>{userOpt?.letter}. {userOpt?.text || 'Chưa chọn'}</strong>
                      </div>
                      {!isCorrect && (
                        <div>
                          Đáp án đúng là: <strong className="text-emerald-600">{correctOpt?.letter}. {correctOpt?.text}</strong>
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-slate-600 bg-amber-50/80 p-3 rounded-2xl border border-amber-200 flex items-start gap-2">
                      <span className="text-base">💡</span>
                      <p className="leading-relaxed font-semibold">
                        <strong>Lời giải của Cú Bi:</strong> {q.explanation}
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
