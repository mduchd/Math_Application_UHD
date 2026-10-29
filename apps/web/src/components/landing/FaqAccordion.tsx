'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { sound } from '@/lib/sound';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  icon: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Bé học lớp 1 mới học đánh vần có tự sử dụng được không?',
    answer:
      'Hoàn toàn được! Nền tảng tích hợp sẵn nút loa giọng đọc audio chuẩn tiếng Việt truyền cảm cho tất cả các câu hỏi, bài tập và tình huống kỹ năng sống. Các bé chỉ cần bấm nút Loa là có thể nghe Cú Vàng đọc đề bài chậm rãi, rõ ràng.',
    icon: '🔊',
  },
  {
    id: 'faq-2',
    question: 'Tài khoản học sinh có bắt buộc phải có Email hay Số điện thoại không?',
    answer:
      'Không cần! Để thuận tiện nhất cho trẻ nhỏ, học sinh tiểu học chỉ cần Tên đăng nhập và Mã PIN 4-6 số dễ nhớ (hoặc nhập mã lớp do thầy cô cung cấp) là có thể vào học ngay, phụ huynh không cần tạo email riêng cho con.',
    icon: '🔑',
  },
  {
    id: 'faq-3',
    question: 'Nền tảng có thu phí hay chứa quảng cáo độc hại làm xao nhãng trẻ không?',
    answer:
      'Chúng tôi cam kết 100% KHÔNG chứa quảng cáo thương mại, không có banner lạ hay liên kết ra ngoài. Môi trường học tập thuần khiết, an toàn tuyệt đối và bảo vệ tối đa thị lực cũng như sự tập trung của trẻ em.',
    icon: '🛡️',
  },
  {
    id: 'faq-4',
    question: 'Nền tảng có dùng mượt mà trên iPad, máy tính bảng hay điện thoại không?',
    answer:
      'Có! Giao diện được thiết kế theo tiêu chuẩn công thái học trẻ em: Nút bấm 3D to bản (Tactile Buttons 52px+), khoảng cách chạm rộng rãi, tương thích hoàn hảo trên iPad, máy tính bảng Android, điện thoại của ba mẹ và máy tính bàn.',
    icon: '📱',
  },
  {
    id: 'faq-5',
    question: 'Thầy cô giáo muốn mở lớp và giao bài tập cho học sinh thì làm thế nào?',
    answer:
      'Thầy Cô chỉ cần chọn "Tôi Là Giáo Viên", đăng nhập bằng Email hoặc Google Login, sau đó bấm "Tạo lớp học mới". Hệ thống sẽ cấp một Mã PIN tham gia lớp học (ví dụ: L3A-8899). Thầy Cô gửi mã này cho học sinh để các em tự động vào danh sách lớp.',
    icon: '👩‍🏫',
  },
];

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    sound.playPop();
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="hoi-dap" className="py-16 md:py-24 bg-kid-cream relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
            Câu Hỏi Thường Gặp Của Ba Mẹ & Thầy Cô
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-bold">
            Mọi thắc mắc của bạn về chương trình học và độ an toàn đều được giải đáp cặn kẽ tại đây.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-3xl border-2 transition-all ${
                  isOpen
                    ? 'border-amber-400 shadow-md ring-2 ring-amber-200/50'
                    : 'border-amber-200 hover:border-amber-300 shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between gap-4 text-left select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl p-1.5 bg-amber-50 rounded-xl shrink-0">
                      {faq.icon}
                    </span>
                    <span className="font-display font-black text-slate-800 text-sm sm:text-base md:text-lg">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-amber-400 text-amber-950' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <m.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-7 pb-5 pt-1 text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed border-t border-slate-100 ml-12 sm:ml-14">
                        {faq.answer}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
