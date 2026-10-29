'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { AppLogo } from '@/components/kid/AppLogo';
import { TactileButton } from '@/components/kid/TactileButton';
import { sound } from '@/lib/sound';

export const LandingFooter: React.FC = () => {
  const router = useRouter();

  return (
    <footer className="bg-gradient-to-b from-kid-surface/60 via-white to-amber-50/50 text-slate-800 pt-16 pb-12 relative overflow-hidden border-t-2 border-kid-border/80">
      {/* Soft Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-purple-100/40 rounded-full blur-2xl pointer-events-none" />

      {/* Decorative stars */}
      <div className="absolute top-10 left-12 text-amber-400 text-xl opacity-75 pointer-events-none animate-pulse">
        ✦
      </div>
      <div className="absolute top-24 right-20 text-purple-400 text-2xl opacity-75 pointer-events-none animate-pulse">
        ✦
      </div>
      <div className="absolute bottom-20 left-1/3 text-sky-400 text-lg opacity-60 pointer-events-none">
        ✦
      </div>
      <div className="absolute top-36 left-2/3 text-emerald-400 text-base opacity-60 pointer-events-none">
        ★
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Big Final CTA Card */}
        <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 rounded-5xl p-8 sm:p-12 text-slate-950 border-4 border-amber-300 shadow-xl shadow-amber-500/10 relative overflow-hidden text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <h3 className="font-display text-2xl sm:text-4xl font-black tracking-tight leading-tight text-amber-950">
              Hãy để mỗi ngày học tập là một chuyến phiêu lưu kỳ thú! 🎒
            </h3>
            <p className="text-amber-950/90 text-sm sm:text-base font-bold leading-relaxed">
              Làm bài khảo sát vui 3 phút, nhận ngay 50 Sao Vàng đầu tiên và bắt đầu hành trình trở thành Trạng Nguyên Nhí cùng Cú Vàng.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <TactileButton
              variant="white"
              size="lg"
              onClick={() => {
                sound.playPop();
                router.push('/assessment');
              }}
              className="font-black font-display text-amber-950 text-sm sm:text-base shadow-tactile-white hover:scale-105 transition-transform"
            >
              <span>Bé Khám Phá Ngay (0đ)</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </TactileButton>

            <button
              type="button"
              onClick={() => {
                sound.playPop();
                router.push('/classes');
              }}
              className="px-6 py-3.5 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 text-xs sm:text-sm font-black transition-all shadow-md hover:shadow-lg active:translate-y-0.5"
            >
              Dành Cho Thầy Cô →
            </button>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6 border-t-2 border-kid-border/80">
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <AppLogo size="sm" variant="icon" />
              <div className="flex flex-col">
                <span className="font-display font-black text-lg text-slate-900 tracking-tight leading-none">
                  Toán Vui
                </span>
                <span className="text-[11px] font-extrabold text-amber-700 font-display mt-0.5">
                  Toán Tiểu Học Lớp 1 - 5
                </span>
              </div>
            </div>
            <p className="text-slate-700 text-sm font-bold leading-relaxed">
              Nền tảng học Toán thông minh &amp; Kỹ năng sống tích hợp AI dành riêng cho học sinh cấp Tiểu học Việt Nam.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-black shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Tiêu chuẩn an toàn mạng cho trẻ em</span>
            </div>
          </div>

          {/* Col 2: For Students */}
          <div className="space-y-2.5">
            <h4 className="font-display font-black text-sm uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <span>⭐</span>
              <span>Góc Của Bé</span>
            </h4>
            <ul className="space-y-2 text-sm font-bold text-slate-700">
              <li>
                <Link href="/assessment" className="hover:text-amber-700 hover:translate-x-1 transition-all inline-block">
                  Bài Khảo Sát Khởi Động
                </Link>
              </li>
              <li>
                <Link href="/login?role=student" className="hover:text-amber-700 hover:translate-x-1 transition-all inline-block">
                  Nhập Mã PIN Vào Lớp
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-amber-700 hover:translate-x-1 transition-all inline-block">
                  Mini-Game Toán &amp; Kỹ Năng
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-amber-700 hover:translate-x-1 transition-all inline-block">
                  Kho Thư Viện Bài Học
                </Link>
              </li>
              <li>
                <Link href="#tai-app" className="hover:text-amber-700 hover:translate-x-1 transition-all inline-block text-amber-900 font-black">
                  💻 Tải App Máy Tính (Windows &amp; Mac)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: For Teachers & Parents */}
          <div className="space-y-2.5">
            <h4 className="font-display font-black text-sm uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <span>📚</span>
              <span>Thầy Cô &amp; Ba Mẹ</span>
            </h4>
            <ul className="space-y-2 text-sm font-bold text-slate-700">
              <li>
                <Link href="/classes" className="hover:text-emerald-700 hover:translate-x-1 transition-all inline-block">
                  Quản Lý Lớp Học &amp; Cấp Mã PIN
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-emerald-700 hover:translate-x-1 transition-all inline-block">
                  Báo Cáo Phổ Điểm Theo TT27
                </Link>
              </li>
              <li>
                <Link href="/register?role=teacher" className="hover:text-emerald-700 hover:translate-x-1 transition-all inline-block">
                  Đăng Ký Tài Khoản Giáo Viên
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-emerald-700 hover:translate-x-1 transition-all inline-block">
                  Đăng Nhập Cổng Sư Phạm
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: SaaS Policies & Support */}
          <div className="space-y-2.5">
            <h4 className="font-display font-black text-sm uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
              <span>🛡️</span>
              <span>Dịch Vụ &amp; Pháp Lý</span>
            </h4>
            <ul className="space-y-2 text-sm font-bold text-slate-700">
              <li>
                <Link href="#bang-gia" className="hover:text-sky-700 hover:translate-x-1 transition-all inline-block">
                  Bảng Giá &amp; Gói Trường Học
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-sky-700 hover:translate-x-1 transition-all inline-block">
                  Điều Khoản Dịch Vụ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-sky-700 hover:translate-x-1 transition-all inline-block">
                  Chính Sách Bảo Mật Trẻ Em
                </Link>
              </li>
              <li>
                <Link href="#hoi-dap" className="hover:text-sky-700 hover:translate-x-1 transition-all inline-block">
                  Trung Tâm Trợ Giúp &amp; FAQ
                </Link>
              </li>
              <li>
                <a href="mailto:support@kidelearning.vn" className="hover:text-sky-700 hover:translate-x-1 transition-all inline-block">
                  Hợp Tác Nhà Trường &amp; Sở GD
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t-2 border-kid-border/80 text-center sm:flex sm:items-center sm:justify-between text-xs font-bold text-slate-700 space-y-2 sm:space-y-0">
          <div>
            © 2026 Toán Vui (Kid E-Learning). Tận tâm vì tương lai thế hệ măng non.
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <span>Thiết kế vì tình yêu măng non Việt Nam</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
};
