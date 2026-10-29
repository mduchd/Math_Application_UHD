'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { m } from 'framer-motion';
import { Star, Sparkles, Crown, ArrowRight, Shirt } from 'lucide-react';
import { TactileButton } from '@/components/kid/TactileButton';
import { sound } from '@/lib/sound';

export const GamificationRanks: React.FC = () => {
  const router = useRouter();

  const ranks = [
    {
      level: 1,
      title: 'Mầm Non Tri Thức',
      icon: '🌱',
      starsRequired: '0 - 100 ⭐',
      badgeColor: 'border-emerald-300 bg-emerald-50 text-emerald-900',
      description: 'Làm quen bài tập đầu tiên, tích lũy thói quen học tập tự giác mỗi ngày.',
      unlockedItem: '🎒 Ba Lô Vàng Thông Thái',
    },
    {
      level: 2,
      title: 'Tú Tài Siêu Đẳng',
      icon: '📜',
      starsRequired: '101 - 300 ⭐',
      badgeColor: 'border-sky-300 bg-sky-50 text-sky-900',
      description: 'Thành thạo các phép tính nhanh và phản xạ kỹ năng an toàn xuất sắc.',
      unlockedItem: '👓 Kính Tri Thức & Kính Lúp',
    },
    {
      level: 3,
      title: 'Trạng Nguyên Nhí',
      icon: '👑',
      starsRequired: '301+ ⭐',
      badgeColor: 'border-purple-300 bg-purple-50 text-purple-900',
      description: 'Đạt danh hiệu học sinh thông thái xuất sắc nhất trường, vinh danh bảng vàng!',
      unlockedItem: '🎓 Mũ Trạng Nguyên & Huy Hiệu Vàng',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/30 to-kid-cream relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
            Chinh Phục Cấp Bậc & Vinh Danh Bảng Vàng
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-bold">
            Mỗi bài giải đúng là một bước tiến rực rỡ! Bé tích lũy Sao Vàng để đổi phụ kiện độc quyền cho chú Cú Vàng của riêng mình.
          </p>
        </div>

        {/* 3 Ranks Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {ranks.map((rank) => (
            <div
              key={rank.level}
              className={`border-3 rounded-4xl p-6 sm:p-7 shadow-sm flex flex-col justify-between relative group hover:scale-102 transition-transform duration-200 ${rank.badgeColor}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl sm:text-4xl p-2 bg-white rounded-2xl shadow-xs border border-slate-100">
                    {rank.icon}
                  </span>
                  <span className="px-3 py-1 bg-white/90 rounded-full text-xs font-black shadow-2xs">
                    {rank.starsRequired}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-wider opacity-70">
                    Cấp Bậc {rank.level}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-slate-800">
                    {rank.title}
                  </h3>
                  <p className="text-slate-700 text-sm font-semibold leading-relaxed pt-1">
                    {rank.description}
                  </p>
                </div>
              </div>

              {/* Unlocked Reward Box */}
              <div className="mt-5 pt-4 border-t border-slate-200/60 bg-white/70 p-3 rounded-2xl border border-white">
                <div className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Shirt className="w-3.5 h-3.5 text-purple-600" />
                  <span>Phần Thưởng Mở Khóa:</span>
                </div>
                <div className="text-sm font-black text-slate-900 mt-1">
                  {rank.unlockedItem}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Mascot Showcase Strip */}
        <div className="bg-white border-3 border-amber-300 rounded-4xl p-6 sm:p-8 shadow-md flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl sm:text-5xl p-3 bg-amber-100 rounded-3xl border-2 border-amber-300 shadow-xs">
              🦉✨
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-black text-lg sm:text-xl text-slate-800">
                Nhận Ngay 50 Sao Vàng Đầu Tiên Hôm Nay!
              </h4>
              <p className="text-slate-700 text-sm font-bold">
                Tham gia khảo sát khởi động 5 câu hỏi để mở khóa huy hiệu Mầm Non ngay tức thì.
              </p>
            </div>
          </div>

          <TactileButton
            variant="yellow"
            size="md"
            onClick={() => {
              sound.playPop();
              router.push('/assessment');
            }}
            className="font-black font-display text-amber-950 text-xs sm:text-sm"
          >
            <span>Nhận 50 Sao Khởi Đầu</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </TactileButton>
        </div>
      </div>
    </section>
  );
};
