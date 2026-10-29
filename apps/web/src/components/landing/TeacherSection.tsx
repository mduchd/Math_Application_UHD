'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { m } from 'framer-motion';
import { KeyRound, BarChart3, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
import { TactileButton } from '@/components/kid/TactileButton';
import { sound } from '@/lib/sound';
import { getStoredToken } from '@/lib/api';

export const TeacherSection: React.FC = () => {
  const router = useRouter();

  const handleTeacherAction = () => {
    sound.playPop();
    const token = getStoredToken();
    if (token) {
      router.push('/classes');
    } else {
      router.push('/login?role=teacher');
    }
  };

  return (
    <section id="thay-co" className="py-16 md:py-24 bg-emerald-50/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Copywriting & Feature points (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
                Quản Lý Lớp Học Thông Minh & Giảm Tải Áp Lực Sư Phạm
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-bold leading-relaxed">
                Được thiết kế riêng theo quy chế đánh giá học sinh tiểu học của Bộ Giáo dục & Đào tạo. Giúp Thầy Cô giao bài, chấm điểm và theo dõi tiến độ cả lớp chỉ với vài cú nhấp chuột.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-3xl border-2 border-emerald-200 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <h4 className="font-display font-black text-slate-800 text-base">
                  Cấp Mã PIN Không Cần Email
                </h4>
                <p className="text-slate-700 text-sm font-semibold leading-relaxed">
                  Các bé không cần nhớ email hay mật khẩu dài. Giáo viên cấp mã PIN 4-6 số đơn giản là học sinh vào lớp ngay.
                </p>
              </div>

              <div className="bg-white p-4 rounded-3xl border-2 border-emerald-200 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <h4 className="font-display font-black text-slate-800 text-base">
                  Phổ Điểm 3 Mức Chuẩn BGD
                </h4>
                <p className="text-slate-700 text-sm font-semibold leading-relaxed">
                  Tự động phân nhóm: Hoàn thành tốt (HT-T), Hoàn thành (HT), Cần cố gắng (CCG) chuẩn Thông tư 27.
                </p>
              </div>

              <div className="bg-white p-4 rounded-3xl border-2 border-emerald-200 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h4 className="font-display font-black text-slate-800 text-base">
                  Ngân Hàng Bài Tập 5 Khối
                </h4>
                <p className="text-slate-700 text-sm font-semibold leading-relaxed">
                  Hàng ngàn bài tập trắc nghiệm và câu hỏi tình huống có sẵn, hoặc tự soạn đề bài riêng của lớp mình.
                </p>
              </div>

              <div className="bg-white p-4 rounded-3xl border-2 border-emerald-200 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-display font-black text-slate-800 text-base">
                  Duyệt Học Sinh &amp; Bảo Mật
                </h4>
                <p className="text-slate-700 text-sm font-semibold leading-relaxed">
                  Kiểm soát tuyệt đối thành viên trong lớp học, tránh người ngoài vào quấy rầy không gian học trò.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <TactileButton
                variant="green"
                size="lg"
                onClick={handleTeacherAction}
                className="font-black font-display text-sm sm:text-base"
              >
                <span>Mở Lớp Học Miễn Phí Ngay</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </TactileButton>

              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  router.push('/login?role=teacher');
                }}
                className="px-5 py-3 rounded-2xl border-2 border-emerald-300 bg-white hover:bg-emerald-50 text-xs font-black text-emerald-900 transition-colors"
              >
                Thầy/Cô Đã Có Tài Khoản? Đăng Nhập
              </button>
            </div>
          </div>

          {/* Right Column: Simulated Teacher Dashboard (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white border-4 border-emerald-300 rounded-5xl p-6 sm:p-7 shadow-xl space-y-5 relative">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-display font-black text-sm shadow-xs">
                    3A
                  </div>
                  <div>
                    <h3 className="font-display font-black text-slate-800 text-base">
                      Lớp 3A - Tiểu Học Ánh Sao
                    </h3>
                    <p className="text-xs font-bold text-slate-700">
                      GVCN: Cô Nguyễn Thị Mai Lan
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black">
                  Đang hoạt động
                </span>
              </div>

              {/* Join code display card */}
              <div className="bg-emerald-50 border-2 border-dashed border-emerald-300 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider font-black text-emerald-800">
                    Mã Tham Gia Lớp Học (PIN)
                  </div>
                  <div className="font-display font-black text-2xl text-emerald-950 tracking-widest mt-0.5">
                    L3A-8899
                  </div>
                </div>
                <div className="px-3 py-1.5 bg-white text-emerald-800 rounded-xl text-xs font-black border border-emerald-200 shadow-2xs">
                  Copy Mã Mời
                </div>
              </div>

              {/* Mini Stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                  <div className="text-xl font-black text-slate-800">32</div>
                  <div className="text-xs font-bold text-slate-700">Học Sinh</div>
                </div>
                <div className="bg-emerald-50 p-2.5 rounded-2xl border border-emerald-200">
                  <div className="text-xl font-black text-emerald-800">96.8%</div>
                  <div className="text-xs font-bold text-emerald-800">Nộp Bài Đúng Hạn</div>
                </div>
                <div className="bg-amber-50 p-2.5 rounded-2xl border border-amber-200">
                  <div className="text-xl font-black text-amber-800">28/32</div>
                  <div className="text-xs font-bold text-amber-800">Đạt Điểm Tốt</div>
                </div>
              </div>

              {/* Competency Level Chart mockup */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-black">
                  <span className="text-slate-700">Đánh giá năng lực tuần này:</span>
                  <span className="text-emerald-600">Theo TT27</span>
                </div>

                <div className="space-y-1.5 text-xs font-bold">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span>Hoàn thành tốt (HT-T)</span>
                    </span>
                    <span className="font-black text-slate-700">22 em (68%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '68%' }} />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span>Hoàn thành (HT)</span>
                    </span>
                    <span className="font-black text-slate-700">9 em (28%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-amber-400 h-2 rounded-full" style={{ width: '28%' }} />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                      <span>Cần cố gắng (CCG)</span>
                    </span>
                    <span className="font-black text-slate-700">1 em (4%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-rose-400 h-2 rounded-full" style={{ width: '4%' }} />
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center text-xs font-bold text-slate-700">
                ⚡ Tự động cập nhật bảng xếp hạng và biểu đồ tiến độ thời gian thực
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
