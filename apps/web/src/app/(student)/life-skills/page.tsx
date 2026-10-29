'use client';

import React from 'react';
import { m } from 'framer-motion';
import { HeartHandshake, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { AudioButton } from '@/components/shared/AudioButton';
import { cardMotion, gentleSpring, listItemVariants, staggerContainerVariants } from '@/lib/motion';

const skills = [
  {
    id: 1,
    title: 'Kỹ năng tự bảo vệ khi bị lạc ở nơi công cộng',
    category: 'An toàn cá nhân',
    scenario: 'Khi đi siêu thị hoặc công viên đông người mà không thấy bố mẹ, em cần làm gì?',
    steps: [
      'Đứng yên một vị trí an toàn, không chạy lung tung tìm kiếm.',
      'Tìm chú bảo vệ, cô thu ngân hoặc người mặc đồng phục để nhờ gọi điện cho bố mẹ.',
      'Ghi nhớ chính xác số điện thoại của bố hoặc mẹ.',
      'Tuyệt đối không đi theo người lạ dù họ cho kẹo hay đồ chơi đẹp.',
    ],
    icon: '🛡️',
  },
  {
    id: 2,
    title: 'Ứng xử thông minh: Nhặt được của rơi trả người đánh mất',
    category: 'Đạo đức & Văn minh',
    scenario: 'Trong giờ ra chơi ở sân trường, em thấy bạn làm rơi ví hoặc đồ chơi.',
    steps: [
      'Nhặt đồ vật cẩn thận và quan sát xung quanh xem có ai đang tìm kiếm không.',
      'Đem nộp ngay cho thầy cô giáo chủ nhiệm hoặc văn phòng ban giám hiệu.',
      'Không tự ý cất vào cặp hoặc mang về nhà.',
    ],
    icon: '🤝',
  },
  {
    id: 3,
    title: 'Em làm quen với quản lý tiền tiêu vặt',
    category: 'Quản lý tài chính nhí',
    scenario: 'Bé được bố mẹ thưởng tiền tiêu vặt hoặc tiền lì xì, làm sao để sử dụng hợp lý?',
    steps: [
      'Phân biệt giữa thứ em CẦN (sách vở, bút thước) và thứ em MUỐN (đồ chơi xa xỉ).',
      'Bỏ ống heo tiết kiệm một phần tiền mỗi tuần để mua món đồ ý nghĩa.',
      'Lập kế hoạch mua sắm nhỏ cùng bố mẹ trước khi đi siêu thị.',
    ],
    icon: '💰',
  },
];

export default function LifeSkillsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black text-orange-800 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/60 px-3.5 py-1.5 rounded-full border border-orange-300 dark:border-orange-800">
            Giáo Dục Toàn Diện
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-black text-slate-800 dark:text-white mt-2">
            Kỹ Năng Sống Cho Học Sinh Tiểu Học
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-semibold mt-1">
            Những bài học tình huống thực tế giúp bé tự tin, an toàn và ứng xử lễ phép mỗi ngày.
          </p>
        </div>
      </div>

      <m.div variants={staggerContainerVariants} initial={false} animate="visible" className="space-y-6">
        {skills.map((skill) => (
          <m.div
            key={skill.id}
            variants={listItemVariants}
            whileHover={cardMotion.whileHover}
            transition={gentleSpring}
            className="bg-white dark:bg-slate-900/90 rounded-4xl border-2 border-kid-border dark:border-slate-800 p-6 md:p-8 shadow-xs hover:border-orange-300 dark:hover:border-orange-500 transition-colors space-y-5"
          >
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-orange-50 dark:bg-orange-950/60 rounded-3xl border-2 border-orange-200 dark:border-orange-800 flex items-center justify-center text-4xl shrink-0">
                  {skill.icon}
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-black text-orange-800 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/60 px-3 py-0.5 rounded-full inline-block border border-orange-200 dark:border-orange-800">
                    {skill.category}
                  </span>
                  <h3 className="font-display text-xl font-black text-slate-800 dark:text-white">{skill.title}</h3>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-semibold bg-amber-50/70 dark:bg-amber-950/40 p-3 rounded-2xl border border-amber-200 dark:border-amber-800/60 mt-2">
                    💡 <strong>Tình huống:</strong> &ldquo;{skill.scenario}&rdquo;
                  </p>
                </div>
              </div>

              <div className="shrink-0 self-end sm:self-start">
                <AudioButton textToRead={`Tình huống: ${skill.scenario}. Các bước xử lý: ${skill.steps.join('. ')}`} />
              </div>
            </div>

            <div className="bg-slate-50/80 dark:bg-slate-800/60 rounded-3xl p-5 border-2 border-slate-100 dark:border-slate-700/60 space-y-3">
              <h4 className="font-display text-xs md:text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                Các bước bé nên làm:
              </h4>
              <ul className="space-y-2.5">
                {skill.steps.map((st, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-emerald-300 dark:border-emerald-800">
                      {i + 1}
                    </div>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>
          </m.div>
        ))}
      </m.div>
    </div>
  );
}
