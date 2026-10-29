'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { m } from 'framer-motion';
import { Check, Sparkles, Star, ShieldCheck, ArrowRight, School, User, GraduationCap } from 'lucide-react';
import { TactileButton } from '@/components/kid/TactileButton';
import { sound } from '@/lib/sound';

export const PricingSection: React.FC = () => {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      id: 'free',
      name: 'Mầm Non Khởi Đầu',
      target: 'Dành cho bé & phụ huynh học thử',
      icon: '🌱',
      badge: 'Miễn Phí Trọn Đời',
      priceMonthly: 0,
      priceYearly: 0,
      period: '0đ / mãi mãi',
      description: 'Trải nghiệm phương pháp học vui tương tác và khảo sát năng lực ban đầu.',
      features: [
        'Khảo sát năng lực đầu vào miễn phí',
        'Tối đa 5 bài tập Toán & Kỹ năng mỗi ngày',
        'Kho 3 mini-game rèn luyện cơ bản',
        '100% không quảng cáo gây xao nhãng',
        'Hỗ trợ giọng đọc audio câu hỏi',
      ],
      ctaText: 'Bắt Đầu Học Miễn Phí',
      ctaVariant: 'yellow' as const,
      highlight: false,
      onClick: () => {
        sound.playPop();
        router.push('/assessment');
      },
    },
    {
      id: 'pro-student',
      name: 'Trạng Nguyên Nhí (Pro)',
      target: 'Gói gia đình & cá nhân hóa cao cấp',
      icon: '⭐',
      badge: 'Phổ Biến Nhất',
      priceMonthly: 79000,
      priceYearly: 59000, // 708k/year
      period: billingCycle === 'yearly' ? '59.000đ / tháng (tiết kiệm 25%)' : '79.000đ / tháng',
      description: 'Gia sư AI DeepSeek đồng hành 24/7, tự động bồi dưỡng điểm yếu cho bé.',
      features: [
        'Mở khóa toàn bộ bài học từ Lớp 1 đến Lớp 5',
        'Gia sư AI DeepSeek phân tích năng lực & ra đề thích ứng',
        'Không giới hạn bài tập & mini-game mỗi ngày',
        'Mở khóa toàn bộ tủ đồ trang phục Cú Vàng',
        'Báo cáo tiến độ chi tiết gửi định kỳ cho ba mẹ',
        'Huy hiệu Trạng Nguyên danh dự trên Bảng Vàng',
      ],
      ctaText: 'Đăng Ký Gói Trạng Nguyên',
      ctaVariant: 'yellow' as const,
      highlight: true,
      onClick: () => {
        sound.playPop();
        router.push('/register?role=student&plan=pro');
      },
    },
    {
      id: 'pro-teacher',
      name: 'Sư Phạm & Lớp Học',
      target: 'Dành cho Thầy Cô & Nhà Trường',
      icon: '🏫',
      badge: 'Giải Pháp Giáo Dục',
      priceMonthly: 149000,
      priceYearly: 119000,
      period: billingCycle === 'yearly' ? '119.000đ / tháng (tiết kiệm 20%)' : '149.000đ / tháng',
      description: 'Bộ công cụ sư phạm toàn diện: Mở lớp, chấm bài tự động và báo cáo TT27.',
      features: [
        'Quản lý không giới hạn lớp học & học sinh',
        'Cấp mã PIN 6 số cho học sinh vào lớp 1-click',
        'Ngân hàng 10,000+ câu hỏi chuẩn SGK mới Bộ GD&ĐT',
        'Tự động phân nhóm 3 mức năng lực theo Thông tư 27',
        'Xuất bảng điểm Excel / PDF gửi phụ huynh 1-click',
        'Lưu trữ tài liệu và học liệu riêng trên Neon Storage',
      ],
      ctaText: 'Đăng Ký Cổng Thầy Cô',
      ctaVariant: 'green' as const,
      highlight: false,
      onClick: () => {
        sound.playPop();
        router.push('/register?role=teacher&plan=school');
      },
    },
  ];

  return (
    <section id="bang-gia" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-10">
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
            Gói Đăng Ký Phù Hợp Với Mọi Nhu Cầu
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-bold">
            Đầu tư cho tương lai con trẻ với chi phí chỉ bằng một ly trà sữa mỗi tháng. Dùng thử miễn phí, hủy bất cứ lúc nào.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 inline-flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setBillingCycle('monthly');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-slate-800 shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Thanh Toán Theo Tháng
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setBillingCycle('yearly');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${
                  billingCycle === 'yearly'
                    ? 'bg-amber-400 text-amber-950 shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <span>Thanh Toán Theo Năm</span>
                <span className="px-1.5 py-0.5 bg-rose-500 text-white rounded-full text-[10px] font-black">
                  Tiết kiệm 25%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-4xl p-7 flex flex-col justify-between relative transition-all duration-200 ${
                plan.highlight
                  ? 'bg-gradient-to-b from-amber-50 to-white border-4 border-amber-400 shadow-xl scale-103 z-20'
                  : 'bg-white border-2 border-slate-200 hover:border-amber-300 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-amber-400 text-amber-950 rounded-full text-xs font-black shadow-xs flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-950 text-amber-950" />
                  <span>Gói Được Yêu Thích Nhất</span>
                </div>
              )}

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl p-2 bg-slate-50 rounded-2xl border border-slate-100">
                      {plan.icon}
                    </span>
                    <div>
                      <h3 className="font-display font-black text-xl text-slate-800">
                        {plan.name}
                      </h3>
                      <p className="text-xs font-bold text-slate-600">{plan.target}</p>
                    </div>
                  </div>
                </div>

                {/* Price Display */}
                <div className="py-2 border-y border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-black text-3xl sm:text-4xl text-slate-800">
                      {plan.priceMonthly === 0
                        ? '0đ'
                        : `${(billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly).toLocaleString('vi-VN')}đ`}
                    </span>
                    <span className="text-sm font-bold text-slate-700">/ tháng</span>
                  </div>
                  <div className="text-xs font-black text-amber-800 mt-1">{plan.period}</div>
                </div>

                <p className="text-sm text-slate-700 font-semibold leading-relaxed">
                  {plan.description}
                </p>

                {/* Feature Checklist */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-black uppercase tracking-wider text-slate-700">
                    Quyền lợi bao gồm:
                  </div>
                  {plan.features.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm font-bold text-slate-800">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-slate-100">
                <TactileButton
                  variant={plan.ctaVariant}
                  size="md"
                  onClick={plan.onClick}
                  className="w-full font-black font-display text-xs sm:text-sm"
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </TactileButton>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise & School Banner */}
        <div className="bg-slate-900 text-white rounded-4xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-2xl font-black shrink-0">
              🏛️
            </div>
            <div>
              <h4 className="font-display font-black text-lg sm:text-xl text-white">
                Dành Cho Các Trường Tiểu Học & Phòng Giáo Dục
              </h4>
              <p className="text-slate-300 text-sm font-semibold">
                Triển khai đồng bộ toàn trường, kết nối cơ sở dữ liệu ngành, tập huấn sư phạm và hóa đơn tài chính VAT hợp lệ.
              </p>
            </div>
          </div>
          <a
            href="mailto:contact@kidelearning.vn?subject=Tư vấn gói Trường Học Kid E-Learning"
            className="px-6 py-3 rounded-2xl bg-white text-slate-900 hover:bg-amber-400 hover:text-slate-950 text-xs sm:text-sm font-black transition-all shrink-0 text-center"
          >
            Liên Hệ Báo Giá Trường Học →
          </a>
        </div>
      </div>
    </section>
  );
};
