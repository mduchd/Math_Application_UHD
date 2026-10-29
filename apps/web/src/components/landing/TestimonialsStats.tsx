'use client';

import React from 'react';
import { m } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsStats: React.FC = () => {
  const stats = [
    { value: '50,000+', label: 'Bài tập hoàn thành mỗi tuần', icon: '📝' },
    { value: '1,200+', label: 'Lớp học tiểu học hoạt động', icon: '🏫' },
    { value: '98.5%', label: 'Phụ huynh thấy con tự giác hơn', icon: '❤️' },
    { value: '0', label: 'Quảng cáo & An toàn tuyệt đối', icon: '🛡️' },
  ];

  const testimonials = [
    {
      author: 'Cô Nguyễn Thị Mai Lan',
      role: 'Giáo viên Chủ nhiệm Lớp 2A • TH Thực Nghiệm (Hà Nội)',
      avatar: '👩‍🏫',
      rating: 5,
      content:
        'Từ ngày áp dụng nền tảng cho lớp 2A, các con mê tít việc giải toán để tích sao nuôi Cú Vàng. Tính năng phát mã PIN lớp học 6 số giúp các bé vào lớp trong 10 giây mà không cần phụ huynh phải tạo email hay nhớ mật khẩu.',
    },
    {
      author: 'Chị Trần Thu Hương',
      role: 'Phụ huynh bé Gia Huy (Lớp 1) • Quận 3 (TP.HCM)',
      avatar: '👩',
      rating: 5,
      content:
        'Bé nhà mình mới vào lớp 1 chưa đọc chữ nhanh, nhưng nhờ có nút loa đọc to câu hỏi tiếng Việt rất tự nhiên nên con tự tin ngồi làm bài độc lập, không cần mẹ phải ngồi kèm chỉ từng chữ như trước nữa.',
    },
    {
      author: 'Thầy Lê Hoàng Nam',
      role: 'Tổ trưởng Chuyên môn Khối 4 • TH Chu Văn An',
      avatar: '👨‍🏫',
      rating: 5,
      content:
        'Biểu đồ thống kê 3 mức năng lực (Hoàn thành tốt, Hoàn thành, Cần cố gắng) thiết kế đúng theo chuẩn Thông tư 27 của Bộ GD&ĐT. Tôi xuất báo cáo gửi phụ huynh cuối tuần cực kỳ khoa học và nhàn nhã.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-kid-cream border-2 border-amber-200 rounded-3xl p-5 text-center space-y-1 shadow-xs hover:border-amber-400 transition-colors"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-slate-800">
                {item.value}
              </div>
              <div className="text-xs font-bold text-slate-600">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
            Hàng Ngàn Lớp Học Đã Chọn Chúng Tôi
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-bold">
            Lắng nghe những chia sẻ chân thực từ các thầy cô đứng lớp và phụ huynh đồng hành cùng con mỗi tối.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-kid-cream border-3 border-amber-200 rounded-4xl p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* 5 Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed italic">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-3 pt-3 border-t border-amber-200/60">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-xl shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-display font-black text-slate-800 text-xs sm:text-sm">
                    {t.author}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-700">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
