'use client';

import React, { useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Gamepad2, Play, RotateCcw, Sparkles, Trophy, XCircle, Star, Compass } from 'lucide-react';
import { TactileButton } from '@/components/kid/TactileButton';
import { sound } from '@/lib/sound';
import { cardMotion, gentleSpring, listItemVariants, staggerContainerVariants } from '@/lib/motion';

type Question = { prompt: string; options: string[]; answer: string; hint: string };
type GameMap = {
  id: string;
  title: string;
  badge: string;
  setting: string;
  description: string;
  icon: string;
  themeColor: 'blue' | 'yellow' | 'green' | 'purple' | 'orange' | 'coral';
  questions: Question[];
};

const maps: GameMap[] = [
  {
    id: 'addition',
    title: 'Đảo Mây Cộng Số',
    badge: 'Phép cộng có nhớ',
    setting: '☁️ Bầu trời',
    icon: '☁️',
    themeColor: 'blue',
    description: 'Thu thập ngôi sao phép cộng để đưa khinh khí cầu của bạn Cú bay lên cao.',
    questions: [
      { prompt: '24 + 15 = ?', options: ['29', '39', '49'], answer: '39', hint: 'Cộng hàng đơn vị: 4 + 5 = 9, rồi cộng hàng chục: 2 + 1 = 3.' },
      { prompt: '36 + 27 = ?', options: ['53', '63', '73'], answer: '63', hint: '6 + 7 = 13 (viết 3 nhớ 1 sang hàng chục). Kết quả là 63.' },
      { prompt: '48 + 12 = ?', options: ['50', '60', '70'], answer: '60', hint: 'Tách 12 thành 10 và 2: 48 + 2 = 50, 50 + 10 = 60.' },
    ],
  },
  {
    id: 'subtraction',
    title: 'Đại Dương Trừ Số',
    badge: 'Phép trừ có mượn',
    setting: '🌊 Dưới nước',
    icon: '🐠',
    themeColor: 'green',
    description: 'Giúp chú cá heo tìm đường về rạn san hô bằng những phép trừ chính xác.',
    questions: [
      { prompt: '53 - 21 = ?', options: ['22', '32', '42'], answer: '32', hint: 'Trừ hàng đơn vị: 3 - 1 = 2, rồi hàng chục: 5 - 2 = 3.' },
      { prompt: '70 - 36 = ?', options: ['24', '34', '44'], answer: '34', hint: 'Mượn 1 chục: 10 - 6 = 4. Hàng chục còn 6 - 3 = 3.' },
      { prompt: '95 - 40 = ?', options: ['45', '55', '65'], answer: '55', hint: 'Trừ số chục trước: 90 - 40 = 50. Hàng đơn vị giữ nguyên 5.' },
    ],
  },
  {
    id: 'mixed',
    title: 'Rừng Phép Tính Liên Hoàn',
    badge: 'Cộng trừ kết hợp',
    setting: '🌳 Rừng xanh',
    icon: '🦜',
    themeColor: 'yellow',
    description: 'Mở cánh cổng cổ tích trong rừng bằng cách giải chuỗi phép tính thần tốc.',
    questions: [
      { prompt: '15 + 8 - 6 = ?', options: ['15', '17', '19'], answer: '17', hint: 'Tính lần lượt từ trái sang phải: 15 + 8 = 23, rồi 23 - 6 = 17.' },
      { prompt: '40 - 12 + 5 = ?', options: ['23', '33', '43'], answer: '33', hint: '40 - 12 = 28, sau đó lấy 28 + 5 = 33.' },
      { prompt: '23 + 17 - 10 = ?', options: ['20', '30', '40'], answer: '30', hint: 'Cộng trước để được số tròn chục: 23 + 17 = 40, rồi 40 - 10 = 30.' },
    ],
  },
  {
    id: 'properties',
    title: 'Xưởng Lắp Ráp Robot',
    badge: 'Tính chất phép tính',
    setting: '🤖 Phòng thí nghiệm',
    icon: '🤖',
    themeColor: 'purple',
    description: 'Lắp ráp cánh tay robot bằng cách tìm các biểu thức có kết quả bằng nhau.',
    questions: [
      { prompt: 'Phép tính nào có kết quả bằng 7 + 5?', options: ['5 + 7', '7 - 5', '5 - 7'], answer: '5 + 7', hint: 'Tính chất giao hoán: Đổi chỗ các số hạng thì tổng không đổi.' },
      { prompt: '(4 + 6) + 3 bằng biểu thức nào?', options: ['4 + (6 + 3)', '4 - (6 + 3)', '4 + (6 - 3)'], answer: '4 + (6 + 3)', hint: 'Tính chất kết hợp của phép cộng: Khi cộng nhiều số, có thể nhóm tùy ý.' },
      { prompt: 'Số nào cộng với 0 vẫn bằng chính nó?', options: ['Mọi số', 'Chỉ số 0', 'Chỉ số 9'], answer: 'Mọi số', hint: 'Bất kỳ số nào cộng với 0 cũng bằng chính nó.' },
    ],
  },
  {
    id: 'missing-addend',
    title: 'Hòm Kho Báu Số Hạng',
    badge: 'Tìm số chưa biết',
    setting: '🏝️ Đảo hoang',
    icon: '🗺️',
    themeColor: 'orange',
    description: 'Tìm chính xác số bị giấu để mở khóa chiếc rương vàng của thuyền trưởng.',
    questions: [
      { prompt: '□ + 8 = 17. Số trong ô vuông là?', options: ['7', '8', '9'], answer: '9', hint: 'Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết: 17 - 8 = 9.' },
      { prompt: '25 + □ = 40. Số trong ô vuông là?', options: ['5', '15', '25'], answer: '15', hint: 'Lấy 40 - 25 = 15.' },
      { prompt: '□ + 16 = 30. Số trong ô vuông là?', options: ['14', '16', '24'], answer: '14', hint: 'Lấy 30 - 16 = 14.' },
    ],
  },
  {
    id: 'review',
    title: 'Đấu Trường Trạng Nguyên',
    badge: 'Thử thách tổng hợp',
    setting: '🏆 Sân vận động',
    icon: '🏆',
    themeColor: 'coral',
    description: 'Vượt qua 3 câu hỏi nhanh cuối cùng để giành cúp vàng Nhà Toán Học Nhí.',
    questions: [
      { prompt: '18 + 24 = ?', options: ['32', '42', '52'], answer: '42', hint: '8 + 4 = 12 (viết 2 nhớ 1). 1 + 2 + 1 = 4. Kết quả là 42.' },
      { prompt: '61 - 19 = ?', options: ['32', '42', '52'], answer: '42', hint: '11 - 9 = 2, 5 - 1 = 4. Kết quả là 42.' },
      { prompt: '□ + 13 = 20. Số trong ô vuông là?', options: ['6', '7', '8'], answer: '7', hint: '20 - 13 = 7.' },
    ],
  },
];

export default function GamesPage() {
  const shouldReduceMotion = useReducedMotion();
  const [map, setMap] = useState<GameMap | null>(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const question = map?.questions[index];
  const complete = Boolean(map && index === map.questions.length);

  const start = (nextMap: GameMap) => {
    sound.playPop();
    setMap(nextMap);
    setIndex(0);
    setSelected(null);
    setScore(0);
  };

  const choose = (answer: string) => {
    if (!question || selected) return;
    setSelected(answer);
    if (answer === question.answer) {
      sound.playSuccess();
      setScore((prev) => prev + 1);
    } else {
      sound.playSoftBump();
    }
  };

  const nextQuestion = async () => {
    sound.playPop();
    const nextIdx = index + 1;
    if (map && nextIdx === map.questions.length) {
      sound.playCelebration();
      if (!shouldReduceMotion) {
        try {
          const { default: confetti } = await import('canvas-confetti');
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (error) {
          console.warn('Không thể phát hiệu ứng chúc mừng', error);
        }
      }
    }
    setIndex(nextIdx);
    setSelected(null);
  };

  // MÀN HÌNH ĐANG CHƠI THỬ THÁCH
  if (map && question && !complete) {
    const isCorrect = selected === question.answer;

    return (
      <m.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-3xl space-y-6"
      >
        <m.button
          onClick={() => {
            sound.playPop();
            setMap(null);
          }}
          className="inline-flex items-center gap-2 text-sm font-black text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl border border-kid-border dark:border-slate-700"
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.97 }}
        >
          <ArrowLeft className="h-4 w-4" /> Quay lại bản đồ trò chơi
        </m.button>

        {/* Header Map */}
        <div className="rounded-4xl bg-white dark:bg-slate-900/90 border-2 border-kid-border dark:border-slate-800 p-6 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-black text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-700/60">
              {map.setting} · {map.badge}
            </span>
            <h1 className="font-display text-2xl md:text-3xl font-black text-slate-800 dark:text-white">
              {map.icon} {map.title}
            </h1>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Thử thách {index + 1} / {map.questions.length} · Thu thập được {score} ⭐
            </p>
          </div>

          <div className="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-200 dark:border-amber-700/60 flex items-center justify-center text-3xl">
            {map.icon}
          </div>
        </div>

        {/* Thanh tiến độ thử thách */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3.5 p-0.5 border border-slate-200 dark:border-slate-700 overflow-hidden">
          <m.div
            className="bg-amber-400 h-full rounded-full shadow-inner"
            initial={false}
            animate={{ width: `${((index + 1) / map.questions.length) * 100}%` }}
            transition={gentleSpring}
          />
        </div>

        {/* Thẻ câu hỏi và các phương án */}
        <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={`${map.id}-${index}`}
          initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, x: -16 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-4xl border-2 border-kid-border dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 md:p-8 shadow-xs space-y-6"
        >
          <div>
            <span className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Chọn đáp án đúng để vượt ải:
            </span>
            <h2 className="font-display mt-2 text-3xl md:text-4xl font-black text-slate-800 dark:text-white">
              {question.prompt}
            </h2>
          </div>

          {/* Các nút phương án 3D */}
          <div className="grid gap-3 sm:grid-cols-3">
            {question.options.map((option) => {
              const hasSelected = Boolean(selected);
              const isAnswer = option === question.answer;
              const isChosen = option === selected;

              let style = 'border-slate-200 dark:border-slate-700 border-b-4 hover:border-amber-300 dark:hover:border-amber-500 text-slate-800 dark:text-white bg-white dark:bg-slate-800/80 hover:bg-amber-50/40 dark:hover:bg-slate-800';

              if (hasSelected) {
                if (isAnswer) {
                  style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border-b-4 shadow-tactile-green';
                } else if (isChosen) {
                  style = 'border-rose-400 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-300 border-b-4 shadow-tactile-coral';
                } else {
                  style = 'border-slate-200 dark:border-slate-700 opacity-40 bg-slate-50 dark:bg-slate-800';
                }
              }

              return (
                <m.button
                  key={option}
                  onClick={() => choose(option)}
                  disabled={hasSelected}
                  whileHover={hasSelected ? undefined : { y: -2, scale: 1.02 }}
                  whileTap={hasSelected ? undefined : { scale: 0.97 }}
                  animate={
                    isChosen && !isAnswer
                      ? { x: [0, -6, 6, -4, 4, 0] }
                      : isAnswer && hasSelected
                        ? { scale: [1, 1.06, 1] }
                        : { scale: 1 }
                  }
                  transition={gentleSpring}
                  className={`rounded-3xl border-2 p-5 font-display text-2xl font-black transition-colors select-none ${style}`}
                >
                  {option}
                </m.button>
              );
            })}
          </div>

          {/* Hộp gợi ý sau khi chọn */}
          <AnimatePresence initial={false}>
          {selected ? (
            <m.div
              initial={shouldReduceMotion ? false : { opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`overflow-hidden rounded-3xl p-5 text-sm border-2 ${
                isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-300'
              }`}
            >
              <p className="flex items-center gap-2 font-black text-base font-display">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    Chính xác rồi! Bé nhận được thêm 1 ngôi sao ⭐
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-rose-500 dark:text-rose-400" />
                    Chưa chính xác rồi, cùng xem gợi ý của Cú Bi nhé!
                  </>
                )}
              </p>
              <p className="mt-2 text-xs md:text-sm font-semibold">💡 {question.hint}</p>
            </m.div>
          ) : null}
          </AnimatePresence>

          {/* Nút sang câu tiếp */}
          {selected ? (
            <m.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end pt-2"
            >
              <TactileButton
                variant="yellow"
                size="md"
                onClick={nextQuestion}
                className="font-display font-black"
              >
                <span>{index + 1 === map.questions.length ? 'Xem kết quả' : 'Câu tiếp theo'}</span>
                <Play className="h-4 w-4 fill-current" />
              </TactileButton>
            </m.div>
          ) : null}
        </m.div>
        </AnimatePresence>
      </m.div>
    );
  }

  // MÀN HÌNH HOÀN THÀNH TOÀN BỘ MAP
  if (map && complete) {
    return (
      <m.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-2xl space-y-6 text-center"
      >
        <m.div variants={listItemVariants} className="rounded-4xl border-2 border-kid-border dark:border-slate-800 bg-white dark:bg-slate-900/90 p-8 md:p-10 shadow-xs space-y-5">
          <m.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.5, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={gentleSpring}
            className="text-6xl"
          >🏆</m.div>
          <h1 className="font-display text-3xl font-black text-slate-800 dark:text-white">
            Chiến Thắng {map.title}!
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base font-semibold">
            Bé đã hoàn thành xuất sắc và trả lời đúng <strong className="text-emerald-600 dark:text-emerald-400 text-lg">{score}/{map.questions.length}</strong> thử thách.
          </p>

          <div className="flex justify-center items-center gap-2 py-2">
            {Array.from({ length: score }).map((_, i) => (
              <m.span
                key={i}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ...gentleSpring, delay: 0.12 + i * 0.1 }}
                className="text-3xl"
              >⭐</m.span>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <TactileButton
              variant="yellow"
              size="md"
              onClick={() => start(map)}
            >
              <RotateCcw className="h-4 w-4" />
              <span>Chơi lại</span>
            </TactileButton>

            <TactileButton
              variant="white"
              size="md"
              onClick={() => {
                sound.playPop();
                setMap(null);
              }}
            >
              <Compass className="h-4 w-4" />
              <span>Chọn vùng đất khác</span>
            </TactileButton>
          </div>
        </m.div>
      </m.div>
    );
  }

  // MÀN HÌNH CHỌN BẢN ĐỒ GAME (DANH SÁCH GAME CARTRIDGES)
  return (
    <m.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-5xl space-y-8"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-black text-slate-800 dark:text-white">
            Bản Đồ Trò Chơi Toán Học Nhí
          </h1>
          <p className="mt-1.5 text-sm font-bold text-slate-700 dark:text-slate-300">
            Chọn một hòn đảo thử thách, giải các câu đố và thu thập đủ 18 ngôi sao vàng nhé!
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/60 px-4 py-2 rounded-2xl border-2 border-amber-200 dark:border-amber-700/60">
          <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
          <span className="font-display font-black text-sm text-amber-900 dark:text-amber-200">Tổng điểm: 120 Sao</span>
        </div>
      </div>

      <m.div variants={staggerContainerVariants} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {maps.map((item) => (
          <m.article
            key={item.id}
            variants={listItemVariants}
            whileHover={cardMotion.whileHover}
            whileTap={cardMotion.whileTap}
            transition={cardMotion.transition}
            className="rounded-4xl border-2 border-kid-border dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xs transition-shadow hover:shadow-lg flex flex-col justify-between overflow-hidden group"
          >
            {/* Header banner với màu tươi tắn */}
            <div className="flex items-center justify-between p-6 border-b-2 border-kid-border dark:border-slate-800 bg-amber-50/40 dark:bg-slate-800/40">
              <div>
                <span className="text-xs font-black text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                  {item.setting} · {item.badge}
                </span>
                <h2 className="font-display mt-2 text-xl font-black text-slate-800 dark:text-white group-hover:text-amber-500 transition-colors">
                  {item.title}
                </h2>
              </div>
              <span className="text-5xl group-hover:scale-110 transition-transform">{item.icon}</span>
            </div>

            {/* Nội dung mô tả và nút play */}
            <div className="space-y-4 p-6">
              <p className="text-sm font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
                {item.description}
              </p>

              <div className="flex items-center justify-between border-t-2 border-kid-border dark:border-slate-800 pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-black text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800">
                  <Gamepad2 className="h-4 w-4" /> {item.questions.length} thử thách
                </span>

                <TactileButton
                  variant="yellow"
                  size="sm"
                  onClick={() => start(item)}
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Vào chơi</span>
                </TactileButton>
              </div>
            </div>
          </m.article>
        ))}
      </m.div>
    </m.div>
  );
}
