'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  Lightbulb,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { AudioButton } from '@/components/shared/AudioButton';
import { sound } from '@/lib/sound';

interface Question {
  id: string;
  category: 'math' | 'lifeskill';
  title: string;
  question: string;
  illustration: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
  rewardStars: number;
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 'm1',
    category: 'math',
    title: 'Toán vui đếm thỏ',
    question: 'Bác Thỏ có 3 củ cà rốt trong giỏ. Bé gấu tặng thêm 2 củ nữa. Hỏi bác Thỏ có tất cả mấy củ cà rốt?',
    illustration: '🥕 🥕 🥕  +  🥕 🥕',
    options: [
      { id: 'a', text: '4 củ cà rốt', isCorrect: false },
      { id: 'b', text: '5 củ cà rốt', isCorrect: true },
      { id: 'c', text: '6 củ cà rốt', isCorrect: false },
    ],
    explanation: 'Chính xác! Ta lấy 3 + 2 = 5 củ cà rốt. Bé đếm siêu quá!',
    rewardStars: 10,
  },
  {
    id: 's1',
    category: 'lifeskill',
    title: 'Kỹ năng an toàn khi tan trường',
    question: 'Khi tan trường chưa thấy bố mẹ đến đón, có một người lạ mặt tiến lại cho kẹo và rủ bé lên xe máy đi cùng. Bé sẽ làm gì?',
    illustration: '🏫 🚶‍♂️ 🍬 🛵',
    options: [
      { id: 'a', text: 'Nhận kẹo rồi lên xe đi luôn', isCorrect: false },
      { id: 'b', text: 'Lễ phép từ chối và chạy vào phòng bảo vệ hoặc thầy cô', isCorrect: true },
      { id: 'c', text: 'Đứng lại nói chuyện một mình với người lạ', isCorrect: false },
    ],
    explanation: 'Bé thật thông minh và dũng cảm! Tuyệt đối không nhận đồ hay đi theo người lạ, hãy báo ngay cho bác bảo vệ hoặc thầy cô giáo nhé.',
    rewardStars: 15,
  },
];

export const InteractiveQuizDemo: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'math' | 'lifeskill'>('math');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion =
    SAMPLE_QUESTIONS.find((question) => question.category === activeTab) ?? SAMPLE_QUESTIONS[0];

  const handleSelectTab = (tab: 'math' | 'lifeskill') => {
    sound.playPop();
    setActiveTab(tab);
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const handleSelectOption = useCallback((optionId: string) => {
    if (isSubmitted) return;
    sound.playPop();
    setSelectedOption(optionId);
  }, [isSubmitted]);

  const handleCheckAnswer = useCallback(() => {
    if (!selectedOption) return;
    setIsSubmitted(true);

    const chosen = currentQuestion.options.find((option) => option.id === selectedOption);
    if (chosen?.isCorrect) {
      sound.playSuccess();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#FFCA28', '#22C55E', '#38BDF8', '#AB47BC', '#FF5252'],
        });
      } catch {
        // Canvas effects are optional; success feedback remains available without them.
      }
    }
  }, [currentQuestion.options, selectedOption]);

  const handleReset = useCallback(() => {
    sound.playPop();
    setSelectedOption(null);
    setIsSubmitted(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

      if (isSubmitted) {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleReset();
        }
        return;
      }

      const key = e.key.toLowerCase();
      let targetId = '';
      if (key === 'a' || key === 'â' || key === 'ă' || key === '1') targetId = 'a';
      else if (key === 'b' || key === '2') targetId = 'b';
      else if (key === 'c' || key === '3') targetId = 'c';

      if (targetId) {
        const exists = currentQuestion.options.some((o) => o.id === targetId);
        if (exists) {
          e.preventDefault();
          handleSelectOption(targetId);
        }
        return;
      }

      if (e.key === 'Enter' && selectedOption) {
        e.preventDefault();
        handleCheckAnswer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion.options, handleCheckAnswer, handleReset, handleSelectOption, isSubmitted, selectedOption]);

  const selectedAnswer = currentQuestion.options.find((option) => option.id === selectedOption);
  const isCorrect = selectedAnswer?.isCorrect;

  return (
    <section id="hoc-thu" className="bg-[#fcfbf8] py-16 md:py-24">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center">
          <h2 className="font-display text-2xl font-black tracking-tight text-slate-800 sm:text-3xl md:text-4xl">
            Thử tài bé ngay hôm nay!
          </h2>
          <p className="text-sm font-bold text-slate-700 sm:text-base">
            Không cần tài khoản, bé có thể bấm loa nghe đề bài và giải thử ngay một câu đố dưới đây.
          </p>
        </div>

        <div className="mx-auto max-w-3xl rounded-3xl border border-[#e8e3d9] bg-white p-4 shadow-[0_16px_40px_rgb(42_37_28_/_0.08)] sm:p-8">
          <div
            className="mx-auto mb-8 flex w-full max-w-md items-center gap-1 rounded-xl bg-stone-100 p-1"
            role="group"
            aria-label="Chọn chủ đề câu hỏi"
          >
            <button
              type="button"
              onClick={() => handleSelectTab('math')}
              aria-pressed={activeTab === 'math'}
              className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 font-display text-sm font-extrabold transition-colors ${
                activeTab === 'math'
                  ? 'bg-amber-400 text-amber-950'
                  : 'text-slate-700 hover:bg-white hover:text-slate-900'
              }`}
            >
              <Calculator className="h-4 w-4" aria-hidden="true" />
              <span>Toán vui</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectTab('lifeskill')}
              aria-pressed={activeTab === 'lifeskill'}
              className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 font-display text-sm font-extrabold transition-colors ${
                activeTab === 'lifeskill'
                  ? 'bg-amber-400 text-amber-950'
                  : 'text-slate-700 hover:bg-white hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span>Kỹ năng sống</span>
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <h3 className="font-display text-base font-black text-slate-800 sm:text-lg">
                {currentQuestion.title}
              </h3>
              <AudioButton textToRead={currentQuestion.question} />
            </div>

            <div className="rounded-2xl bg-amber-50 px-4 py-5 text-center">
              <div className="select-none text-2xl tracking-widest sm:text-3xl">
                {currentQuestion.illustration}
              </div>
            </div>

            <p className="text-sm font-bold leading-relaxed text-slate-800 sm:text-base">
              {currentQuestion.question}
            </p>

            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOption === option.id;
                let optionStyle =
                  'border-slate-200 bg-white text-slate-800 hover:border-amber-400 hover:bg-amber-50/50';

                if (isSelected && !isSubmitted) {
                  optionStyle = 'border-amber-500 bg-amber-50 text-amber-950';
                } else if (isSubmitted && option.isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950';
                } else if (isSubmitted && isSelected) {
                  optionStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                }

                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(option.id)}
                    aria-pressed={isSelected}
                    className={`flex min-h-14 items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-bold transition-colors disabled:cursor-default ${optionStyle}`}
                  >
                    <span>{option.text}</span>
                    {isSubmitted && option.isCorrect && (
                      <CheckCircle className="ml-2 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {isSubmitted && (
                <m.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className={`flex items-start gap-3 rounded-xl border-l-4 p-4 ${
                    isCorrect
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                      : 'border-amber-400 bg-amber-50 text-amber-950'
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
                  ) : (
                    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
                  )}
                  <div className="space-y-1 text-sm font-bold">
                    <p className="font-black">
                      {isCorrect
                        ? `Tuyệt vời! Bé trả lời đúng và nhận ${currentQuestion.rewardStars} sao.`
                        : 'Chưa chuẩn xác rồi, nhưng không sao!'}
                    </p>
                    <p className="font-semibold text-slate-700">{currentQuestion.explanation}</p>
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {!isSubmitted ? (
                <button
                  type="button"
                  disabled={!selectedOption}
                  onClick={handleCheckAnswer}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-amber-400 px-5 py-2.5 font-display text-sm font-black text-amber-950 transition-colors hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 sm:w-auto"
                >
                  Kiểm tra đáp án
                </button>
              ) : (
                <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-800 transition-colors hover:bg-slate-50"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    Làm lại
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      router.push('/assessment');
                    }}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 font-display text-sm font-black text-amber-950 transition-colors hover:bg-amber-300"
                  >
                    Làm khảo sát đầy đủ
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
