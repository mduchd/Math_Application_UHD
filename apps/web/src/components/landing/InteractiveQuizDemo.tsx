'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Star, CheckCircle, RotateCcw, ArrowRight, Lightbulb } from 'lucide-react';
import { AudioButton } from '@/components/shared/AudioButton';
import { TactileButton } from '@/components/kid/TactileButton';
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
    title: 'Toán Vui Đếm Thỏ 🐰',
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
    title: 'Kỹ Năng An Toàn Khi Tan Trường 🎒',
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
    SAMPLE_QUESTIONS.find((q) => q.category === activeTab) || SAMPLE_QUESTIONS[0];

  const handleSelectTab = (tab: 'math' | 'lifeskill') => {
    sound.playPop();
    setActiveTab(tab);
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const handleSelectOption = (optionId: string) => {
    sound.playPop();
    if (isSubmitted) return;
    setSelectedOption(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);

    const chosen = currentQuestion.options.find((o) => o.id === selectedOption);
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
        // Safe fallback
      }
    }
  };

  const handleReset = () => {
    sound.playPop();
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const selectedAnswerObj = currentQuestion.options.find((o) => o.id === selectedOption);
  const isCorrect = selectedAnswerObj?.isCorrect;

  return (
    <section id="hoc-thu" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
            Thử tài bé ngay hôm nay!
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-bold">
            Không cần tài khoản, bé có thể bấm loa nghe đề bài và giải thử ngay 1 câu đố dưới đây:
          </p>
        </div>

        {/* 3D Claymorphic Tablet Mockup */}
        <div className="bg-amber-50/70 border-4 border-amber-300 rounded-5xl p-4 sm:p-8 shadow-xl relative max-w-3xl mx-auto">
          {/* Top Category Tabs */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <button
              onClick={() => handleSelectTab('math')}
              className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm font-display transition-all border-2 ${
                activeTab === 'math'
                  ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-tactile-yellow scale-105'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-amber-50'
              }`}
            >
              🔢 1. Toán Vui Đếm Số
            </button>
            <button
              onClick={() => handleSelectTab('lifeskill')}
              className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm font-display transition-all border-2 ${
                activeTab === 'lifeskill'
                  ? 'bg-emerald-400 text-emerald-950 border-emerald-500 shadow-tactile-green scale-105'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-emerald-50'
              }`}
            >
              🛡️ 2. Kỹ Năng Sống An Toàn
            </button>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl border-2 border-amber-200 p-5 sm:p-7 space-y-5 shadow-xs">
            {/* Header: Title & Audio Speaker */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <span className="font-display font-black text-base sm:text-lg text-slate-800">
                {currentQuestion.title}
              </span>
              <AudioButton textToRead={currentQuestion.question} />
            </div>

            {/* Illustration */}
            <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl tracking-widest select-none">
                {currentQuestion.illustration}
              </div>
            </div>

            {/* Question Text */}
            <p className="text-slate-800 text-sm sm:text-base font-bold leading-relaxed">
              {currentQuestion.question}
            </p>

            {/* Options List */}
            <div className="grid grid-cols-1 gap-3 pt-1">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOption === option.id;
                let optionStyle =
                  'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-400 hover:bg-amber-50/60';

                if (isSelected && !isSubmitted) {
                  optionStyle = 'bg-amber-100 border-amber-500 text-amber-950 shadow-xs';
                } else if (isSubmitted) {
                  if (option.isCorrect) {
                    optionStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-xs';
                  } else if (isSelected && !option.isCorrect) {
                    optionStyle = 'bg-rose-100 border-rose-400 text-rose-900';
                  }
                }

                return (
                  <button
                    key={option.id}
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(option.id)}
                    className={`flex items-center justify-between px-4 py-3 sm:py-3.5 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all select-none ${optionStyle}`}
                  >
                    <span>{option.text}</span>
                    {isSubmitted && option.isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback Box (Shown after submit) */}
            <AnimatePresence>
              {isSubmitted && (
                <m.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className={`p-4 rounded-2xl border-2 flex items-start gap-3 ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  <div className="text-2xl shrink-0">{isCorrect ? '🎉' : '💡'}</div>
                  <div className="space-y-1 text-xs sm:text-sm font-bold">
                    <div className="flex items-center gap-1.5 font-black">
                      {isCorrect ? (
                        <>
                          <span className="text-emerald-700">Tuyệt vời! Bé trả lời đúng rồi!</span>
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-amber-200 text-amber-900 rounded-full text-xs">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> +{currentQuestion.rewardStars} Sao
                          </span>
                        </>
                      ) : (
                        <span className="text-amber-800">Chưa chuẩn xác rồi, nhưng không sao!</span>
                      )}
                    </div>
                    <p className="text-slate-600 font-semibold">{currentQuestion.explanation}</p>
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              {!isSubmitted ? (
                <TactileButton
                  variant="yellow"
                  size="md"
                  disabled={!selectedOption}
                  onClick={handleCheckAnswer}
                  className="w-full sm:w-auto font-black font-display text-amber-950"
                >
                  <span>Kiểm Tra Đáp Án</span>
                  <CheckCircle className="w-4 h-4 ml-1" />
                </TactileButton>
              ) : (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-black text-slate-700"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm Lại</span>
                  </button>
                  <TactileButton
                    variant="yellow"
                    size="md"
                    onClick={() => {
                      sound.playPop();
                      router.push('/assessment');
                    }}
                    className="font-black font-display text-amber-950"
                  >
                    <span>Làm Khảo Sát Đầy Đủ</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </TactileButton>
                </div>
              )}

              <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                Bấm nút Loa ở góc để nghe Cú Vàng đọc đề bài nhé! 🔊
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
