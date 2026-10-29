'use client';

import React from 'react';
import { m } from 'framer-motion';
import { Calculator, ShieldAlert, Bot, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { cardMotion, listItemVariants, staggerContainerVariants } from '@/lib/motion';

export const BentoFeatures: React.FC = () => {
  return (
    <section id="kham-pha" className="py-16 md:py-24 bg-kid-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
            4 Trụ Cột Tri Thức Toàn Diện Cho Bé
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-bold">
            Kết hợp hài hòa giữa phát triển tư duy logic Toán học và xây dựng kỹ năng tự vệ, nhân cách nhân văn cho học sinh tiểu học.
          </p>
        </div>

        {/* Bento Grid */}
        <m.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1: Toán Học Trực Quan (Large 2 cols on md) */}
          <m.div
            variants={listItemVariants}
            whileHover={cardMotion.whileHover}
            transition={cardMotion.transition}
            className="md:col-span-2 bg-gradient-to-br from-amber-100/80 via-white to-amber-50/60 border-3 border-amber-300 rounded-4xl p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-200/30 rounded-full -translate-y-16 translate-x-16 group-hover:scale-125 transition-transform" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 border-2 border-amber-500 shadow-tactile-yellow flex items-center justify-center text-amber-950">
                <Calculator className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-black text-amber-800 uppercase tracking-wider">
                  Trụ cột số 01 • Tư duy Logic
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-800">
                  Toán Học Trực Quan & Vui Nhộn
                </h3>
                <p className="text-slate-600 text-sm sm:text-base font-bold leading-relaxed max-w-xl">
                  Tạm biệt những con số khô khan! Mỗi bài toán là một câu chuyện minh họa bằng quả táo, chú thỏ, chiếc bánh kem giúp các bé lớp 1-5 hiểu thấu đáo bản chất phép tính thay vì học vẹt.
                </p>
              </div>

              {/* Visual preview pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="flex items-center gap-2 bg-white/80 p-3 rounded-2xl border border-amber-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-bold text-slate-700">Tia số sinh động & Que tính màu</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-3 rounded-2xl border border-amber-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-bold text-slate-700">Giọng đọc audio tiếng Việt mọi đề bài</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-3 rounded-2xl border border-amber-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-bold text-slate-700">Phép nhân, chia, phân số dễ hiểu</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-3 rounded-2xl border border-amber-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-bold text-slate-700">Hình học không gian qua mô hình 3D</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-200/60 flex items-center justify-between text-xs font-black text-amber-800">
              <span>Bám sát chương trình sách giáo khoa mới Bộ GD&ĐT</span>
              <span className="text-lg">🍎 📐 🧩</span>
            </div>
          </m.div>

          {/* Card 2: Kỹ Năng Sống An Toàn (1 col) */}
          <m.div
            variants={listItemVariants}
            whileHover={cardMotion.whileHover}
            transition={cardMotion.transition}
            className="bg-gradient-to-br from-emerald-100/80 via-white to-emerald-50/60 border-3 border-emerald-300 rounded-4xl p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-200/30 rounded-full -translate-y-12 translate-x-12 group-hover:scale-125 transition-transform" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400 border-2 border-emerald-500 shadow-tactile-green flex items-center justify-center text-emerald-950">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">
                  Trụ cột số 02 • Tự Vệ & Văn Minh
                </span>
                <h3 className="font-display text-2xl font-black text-slate-800">
                  Kỹ Năng Sống An Toàn
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-bold leading-relaxed">
                  Rèn luyện phản xạ thực tế qua hơn 100 tình huống gần gũi: phòng tránh người lạ, an toàn khi tan trường, phòng chống đuối nước và kỹ năng giao tiếp hòa đồng.
                </p>
              </div>

              <div className="space-y-2 pt-1 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                  <span>🚨 Kỹ năng xử lý khi bị lạc</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                  <span>🏊 Phòng tránh tai nạn sông nước</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                  <span>🤝 Ứng xử lễ phép & tự lập</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-200/60 flex items-center justify-between text-xs font-black text-emerald-800">
              <span>Trẻ tự tin & tự lập mỗi ngày</span>
              <span className="text-lg">🛡️ 🎒 🌟</span>
            </div>
          </m.div>

          {/* Card 3: Gia Sư AI DeepSeek (1 col) */}
          <m.div
            variants={listItemVariants}
            whileHover={cardMotion.whileHover}
            transition={cardMotion.transition}
            className="bg-gradient-to-br from-sky-100/80 via-white to-sky-50/60 border-3 border-sky-300 rounded-4xl p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-sky-200/30 rounded-full -translate-y-12 translate-x-12 group-hover:scale-125 transition-transform" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-sky-400 border-2 border-sky-500 shadow-tactile-blue flex items-center justify-center text-sky-950">
                <Bot className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-black text-sky-800 uppercase tracking-wider">
                  Trụ cột số 03 • AI Đồng Hành
                </span>
                <h3 className="font-display text-2xl font-black text-slate-800">
                  Gia Sư AI Thấu Hiểu
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-bold leading-relaxed">
                  Được hỗ trợ bởi mô hình DeepSeek AI, hệ thống tự động nhận diện dạng bài bé đang lúng túng để thiết kế lộ trình ôn tập vừa vặn, không tạo áp lực điểm số.
                </p>
              </div>

              <div className="space-y-2 pt-1 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-sky-200">
                  <span>🧠 Phân tích năng lực 5 cấp độ</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-sky-200">
                  <span>🎯 Bài tập gợi mở từng bước</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-sky-200/60 flex items-center justify-between text-xs font-black text-sky-800">
              <span>Học đúng tốc độ riêng của bé</span>
              <span className="text-lg">🤖 💡 🚀</span>
            </div>
          </m.div>

          {/* Card 4: Đấu Trường Trạng Nguyên & Gamification (Large 2 cols on md) */}
          <m.div
            variants={listItemVariants}
            whileHover={cardMotion.whileHover}
            transition={cardMotion.transition}
            className="md:col-span-2 bg-gradient-to-br from-purple-100/80 via-white to-purple-50/60 border-3 border-purple-300 rounded-4xl p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-200/30 rounded-full -translate-y-16 translate-x-16 group-hover:scale-125 transition-transform" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-purple-400 border-2 border-purple-500 shadow-tactile-purple flex items-center justify-center text-purple-950">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-black text-purple-800 uppercase tracking-wider">
                  Trụ cột số 04 • Hứng Thú Vượt Trội
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-800">
                  Đấu Trường Trạng Nguyên & Đổi Quà Linh Vật
                </h3>
                <p className="text-slate-600 text-sm sm:text-base font-bold leading-relaxed max-w-xl">
                  Biến giờ học thành một chuyến phiêu lưu kỳ thú! Bé làm bài đúng để nhận Sao Vàng ⭐, tích điểm thăng cấp từ Mầm Non lên Trạng Nguyên Nhí và mở khóa trang phục cho chú Cú Vàng.
                </p>
              </div>

              {/* Badges progression showcase */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-purple-200 shadow-xs">
                  <span className="text-lg">🌱</span>
                  <div>
                    <div className="text-xs font-black text-slate-800">Cấp 1: Mầm Non</div>
                    <div className="text-xs text-slate-700 font-bold">Khởi đầu hào hứng</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-purple-200 shadow-xs">
                  <span className="text-lg">📜</span>
                  <div>
                    <div className="text-xs font-black text-slate-800">Cấp 2: Tú Tài</div>
                    <div className="text-xs text-slate-700 font-bold">Chăm chỉ rèn luyện</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-amber-200 to-purple-200 px-3.5 py-2 rounded-2xl border-2 border-amber-400 shadow-xs">
                  <span className="text-lg">👑</span>
                  <div>
                    <div className="text-xs font-black text-purple-950">Cấp 3: Trạng Nguyên Nhí</div>
                    <div className="text-[10px] text-purple-800 font-bold">Đỉnh cao tri thức</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-200/60 flex items-center justify-between text-xs font-black text-purple-800">
              <span>Học sinh tự giác làm bài mỗi ngày</span>
              <span className="text-lg">⭐ 🏆 🎩</span>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
};
