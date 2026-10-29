'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { Sparkles, Target, Calendar, CheckCircle2, BookOpen, Gamepad2, ArrowRight, Star, Trophy, Compass } from 'lucide-react';
import { LevelBadge } from '@/components/student/LevelBadge';
import { MascotOwl } from '@/components/kid/MascotOwl';
import { TactileButton } from '@/components/kid/TactileButton';
import { useAppStore } from '@/stores/useAppStore';
import { sound } from '@/lib/sound';
import { cardMotion, gentleSpring, listItemVariants, staggerContainerVariants } from '@/lib/motion';

export default function AIPlanPage() {
  const currentPlan = useAppStore((state) => state.currentPlan);
  const currentSubmission = useAppStore((state) => state.currentSubmission);
  const setPlan = useAppStore((state) => state.setPlan);

  useEffect(() => {
    if (currentPlan || typeof window === 'undefined') return;
    const savedPlan = localStorage.getItem('kid_plan');
    if (savedPlan) {
      try {
        setPlan(JSON.parse(savedPlan));
      } catch {
        localStorage.removeItem('kid_plan');
      }
    }
  }, [currentPlan, setPlan]);

  const defaultPlanData = {
    level: 'APPLIED' as const,
    score: 75,
    summary:
      'Bé có khả năng tính nhẩm nhanh và phản xạ tình huống rất tốt! Để chạm tay vào cúp Trạng Nguyên, chúng mình hãy cùng nhau luyện thêm các bài toán đố hai bước tính và ứng phó các tình huống nhé!',
    strengths: ['Tính nhẩm siêu tốc, cộng trừ chính xác', 'Ghi nhớ kiến thức nhanh nhẹn'],
    areasToImprove: ['Thử thách với bài toán giải bằng lời văn', 'Phản xạ ứng phó khi gặp người lạ'],
    weeks: [
      {
        week: 1,
        islandName: 'Đảo Thần Tốc',
        islandIcon: '🏝️',
        title: 'Tuần 1: Chinh phục bài toán hai phép tính',
        focus: 'Toán đố & Tư duy logic',
        status: 'CURRENT',
        lessons: ['Bài 3: Tìm hai số khi biết tổng và hiệu', 'Bài 4: Bài toán nhiều hơn, ít hơn'],
        games: ['Đảo Mây Cộng Số', 'Đại Dương Trừ Số'],
        targetMinutes: '15 phút mỗi ngày',
      },
      {
        week: 2,
        islandName: 'Đảo Hiệp Sĩ',
        islandIcon: '🛡️',
        title: 'Tuần 2: Rèn luyện Kỹ năng sống & Tự lập',
        focus: 'Kỹ năng an toàn & Ứng phó sự cố',
        status: 'UPCOMING',
        lessons: ['Kỹ năng 1: Lạc người thân thì làm gì?', 'Kỹ năng 2: Ứng xử thông minh nơi công cộng'],
        games: ['Thám tử nhí siêu trí tuệ'],
        targetMinutes: '20 phút mỗi ngày',
      },
      {
        week: 3,
        islandName: 'Đỉnh Trạng Nguyên',
        islandIcon: '👑',
        title: 'Tuần 3: Ôn tập nâng cao & Về đích',
        focus: 'Thử thách Trạng Nguyên Vận dụng cao',
        status: 'UPCOMING',
        lessons: ['Bài 7: Tìm quy luật dãy số thần tốc'],
        games: ['Đấu trường Tổng Kết'],
        targetMinutes: '20 phút mỗi ngày',
      },
    ],
  };

  const planData = currentPlan
    ? {
        level: currentPlan.level,
        score: currentSubmission?.score ?? 75,
        summary: currentPlan.summary,
        strengths: currentPlan.strengths,
        areasToImprove: currentPlan.areasToImprove,
        weeks: currentPlan.weeklyMilestones.map((milestone, idx) => ({
          week: milestone.week,
          islandName: idx === 0 ? 'Đảo Thần Tốc' : idx === 1 ? 'Đảo Hiệp Sĩ' : 'Đỉnh Trạng Nguyên',
          islandIcon: idx === 0 ? '🏝️' : idx === 1 ? '🛡️' : '👑',
          title: milestone.title,
          focus: milestone.focusArea,
          status: idx === 0 ? 'CURRENT' : 'UPCOMING',
          lessons: milestone.recommendedLessons,
          games: milestone.recommendedGames,
          targetMinutes: `${milestone.dailyPracticeMinutes} phút mỗi ngày`,
        })),
      }
    : defaultPlanData;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      {/* BANNER BẢN ĐỒ BÍ KÍP */}
      <div className="bg-white dark:bg-slate-900/90 border-2 border-kid-border dark:border-slate-800 rounded-4xl p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-center gap-6">
        <MascotOwl
          size="lg"
          mood="celebrating"
          speechBubble="Lộ trình 3 tuần này được thiết kế riêng cho bé đó! 🗺️"
        />

        <div className="space-y-3 flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-950/60 px-3.5 py-1.5 rounded-full text-xs font-black text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Bản Đồ Thám Hiểm Tri Thức
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-black text-slate-800 dark:text-white">
            Bí Kíp Học Tập Cá Nhân Hóa Của Bé
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base font-semibold leading-relaxed">
            Dựa trên kết quả khảo sát, bạn Cú Bi đã vẽ ra một chuyến hải trình 3 tuần để cùng bé khám phá các hòn đảo Toán học và Kỹ năng sống!
          </p>

          <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <LevelBadge level={planData.level} score={planData.score} />
          </div>
        </div>
      </div>

      {/* ĐÁNH GIÁ NĂNG LỰC: BÙA CHÚ SIÊU NĂNG LỰC */}
      <div className="bg-white dark:bg-slate-900/90 rounded-4xl border-2 border-kid-border dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6">
        <div className="border-b-2 border-kid-border dark:border-slate-800 pb-4">
          <h2 className="font-display text-xl font-black text-slate-800 dark:text-white">
            Lời Nhắn Nhủ Của Bạn Cú Bi 🦉
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-semibold mt-2 leading-relaxed bg-amber-50/70 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-800/60">
            &ldquo;{planData.summary}&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Siêu năng lực */}
          <div className="p-5 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800/60 space-y-3">
            <h3 className="font-display text-sm font-black text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
              <span className="text-lg">✨</span> Siêu Năng Lực Hiện Tại Của Bé
            </h3>
            <ul className="text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-2">
              {planData.strengths.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Thử thách cần vượt qua */}
          <div className="p-5 rounded-3xl bg-amber-50/60 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800/60 space-y-3">
            <h3 className="font-display text-sm font-black text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <span className="text-lg">🎯</span> Thử Thách Cần Chinh Phục
            </h3>
            <ul className="text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-2">
              {planData.areasToImprove.map((a, idx) => (
                <li key={idx} className="flex items-start gap-2 font-bold">
                  <Target className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* LỘ TRÌNH 3 ĐẢO THÁM HIỂM (ISLAND QUEST TRAIL) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-amber-500" /> Hành Trình 3 Hòn Đảo Nhiệm Vụ
          </h2>
          <span className="text-xs font-black text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800">
            Hoàn thành để nhận Cúp Vàng
          </span>
        </div>

        <m.div variants={staggerContainerVariants} initial={false} animate="visible" className="space-y-6">
          {planData.weeks.map((week, idx) => {
            const isCurrent = week.status === 'CURRENT';
            return (
              <m.div
                key={week.week}
                variants={listItemVariants}
                whileHover={cardMotion.whileHover}
                transition={gentleSpring}
                className={`bg-white dark:bg-slate-900/90 rounded-4xl border-2 p-6 md:p-8 shadow-xs transition-colors relative overflow-hidden ${
                  isCurrent
                    ? 'border-amber-400 dark:border-amber-500 shadow-tactile-yellow'
                    : 'border-kid-border dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Dải ruy băng chặng */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-kid-border dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-3xl flex items-center justify-center text-3xl font-black border-2 ${
                        isCurrent
                          ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 dark:border-amber-600 text-amber-950 dark:text-amber-200'
                          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {week.islandIcon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-xs font-black px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          Chặng {week.week}
                        </span>
                        {isCurrent && (
                          <span className="font-display text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950">
                            ⭐ Đang khám phá
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-black text-slate-800 dark:text-white text-lg md:text-xl mt-0.5">
                        {week.islandName}: {week.title}
                      </h3>
                      <p className="text-xs font-bold text-amber-700 dark:text-amber-400">Trọng tâm: {week.focus}</p>
                    </div>
                  </div>

                  <span className="text-xs font-black text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                    ⏱️ {week.targetMinutes}
                  </span>
                </div>

                {/* Danh sách bài học và game tương ứng */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
                  {/* Bài học gợi ý */}
                  <div className="space-y-2">
                    <span className="font-display text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-sky-500" /> Bài học khuyên làm:
                    </span>
                    <div className="space-y-2">
                      {week.lessons.map((lesson, lIdx) => (
                        <div
                          key={lIdx}
                          className="p-3 rounded-2xl bg-sky-50/50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 font-bold text-xs md:text-sm text-slate-800 dark:text-white flex items-center justify-between hover:bg-sky-50 dark:hover:bg-sky-950/50 transition-colors"
                        >
                          <span className="line-clamp-1">{lesson}</span>
                          <Link
                            href="/lessons"
                            onClick={() => sound.playPop()}
                            className="text-xs font-black text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 shrink-0 ml-2"
                          >
                            Học ngay →
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trò chơi luyện tập */}
                  <div className="space-y-2">
                    <span className="font-display text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Gamepad2 className="w-4 h-4 text-pink-500" /> Trò chơi bổ trợ:
                    </span>
                    <div className="space-y-2">
                      {week.games.map((game, gIdx) => (
                        <div
                          key={gIdx}
                          className="p-3 rounded-2xl bg-pink-50/50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800 font-bold text-xs md:text-sm text-slate-800 dark:text-white flex items-center justify-between hover:bg-pink-50 dark:hover:bg-pink-950/50 transition-colors"
                        >
                          <span className="line-clamp-1">🎮 {game}</span>
                          <Link
                            href="/games"
                            onClick={() => sound.playPop()}
                            className="text-xs font-black text-pink-600 hover:text-pink-800 shrink-0 ml-2"
                          >
                            Vào chơi →
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nút hành động */}
                <div className="mt-5 pt-4 border-t-2 border-kid-border flex justify-end">
                  <TactileButton
                    variant={isCurrent ? 'yellow' : 'white'}
                    size="sm"
                    onClick={() => {
                      sound.playPop();
                      window.location.href = '/games';
                    }}
                  >
                    <span>{isCurrent ? 'Vào Làm Nhiệm Vụ Ngay' : 'Xem Thử Thách'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </TactileButton>
                </div>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </div>
  );
}
