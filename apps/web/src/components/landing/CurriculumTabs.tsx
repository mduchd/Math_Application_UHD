'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { Volume2, ArrowRight, Check } from 'lucide-react';
import { TactileButton } from '@/components/kid/TactileButton';
import { sound } from '@/lib/sound';

interface GradeData {
  grade: number;
  label: string;
  age: string;
  summary: string;
  mathTopics: string[];
  lifeSkillsTopics: string[];
  highlight: string;
}

const GRADES_DATA: GradeData[] = [
  {
    grade: 1,
    label: 'Lớp 1',
    age: '6 - 7 tuổi',
    summary: 'Bước đệm đầu đời nhẹ nhàng: Làm quen số đếm, hình khối và kỹ năng tự lập khi bước vào trường tiểu học.',
    mathTopics: [
      'Đếm & so sánh số trong phạm vi 10, 20, 100',
      'Phép cộng, trừ đơn giản qua que tính màu',
      'Nhận biết hình vuông, tròn, tam giác, chữ nhật',
      'Xem đồng hồ giờ đúng & các ngày trong tuần',
    ],
    lifeSkillsTopics: [
      'Kỹ năng tự chuẩn bị cặp sách & đồ dùng học tập',
      'Quy tắc ứng xử lễ phép: Chào hỏi, cảm ơn, xin lỗi',
      'Không đi theo và nhận quà của người lạ mặt',
    ],
    highlight: 'Hỗ trợ 100% giọng đọc audio câu hỏi để bé chưa thạo chữ vẫn tự học vui vẻ!',
  },
  {
    grade: 2,
    label: 'Lớp 2',
    age: '7 - 8 tuổi',
    summary: 'Mở rộng tư duy tính toán: Phép cộng trừ có nhớ trong phạm vi 1000 và kỹ năng tự bảo vệ bản thân.',
    mathTopics: [
      'Phép cộng, trừ có nhớ trong phạm vi 100 & 1000',
      'Bắt đầu làm quen bảng nhân, chia 2 và 5',
      'Đơn vị đo độ dài (dm, m, km) & khối lượng (kg)',
      'Bài toán có lời văn một bước tính trực quan',
    ],
    lifeSkillsTopics: [
      'Kỹ năng an toàn khi ở nhà một mình (điện, nước, lửa)',
      'Phòng tránh bắt nạt học đường & chia sẻ cùng cha mẹ',
      'Thói quen rửa tay, vệ sinh cá nhân ngăn nắp',
    ],
    highlight: 'Các bài toán đố minh họa bằng tranh vẽ kích thích sự tò mò của trẻ.',
  },
  {
    grade: 3,
    label: 'Lớp 3',
    age: '8 - 9 tuổi',
    summary: 'Bứt phá kỹ năng: Thành thạo bảng cửu chương, hình học cơ bản và kỹ năng làm việc nhóm hòa đồng.',
    mathTopics: [
      'Bảng nhân & chia đầy đủ từ 2 đến 9 (Cửu chương)',
      'Làm quen số có bốn, năm chữ số & chữ số La Mã',
      'Tính chu vi & diện tích hình vuông, hình chữ nhật',
      'Giải bài toán bằng hai bước tính thông minh',
    ],
    lifeSkillsTopics: [
      'Kỹ năng giao tiếp hòa đồng & giải quyết xích mích với bạn bè',
      'Ý thức bảo vệ môi trường, tiết kiệm điện nước',
      'Kỹ năng sơ cứu vết trầy xước nhẹ',
    ],
    highlight: 'Mini-game rèn luyện tốc độ phản xạ bảng cửu chương cực kỳ hào hứng!',
  },
  {
    grade: 4,
    label: 'Lớp 4',
    age: '9 - 10 tuổi',
    summary: 'Chinh phục số học chuyên sâu: Phân số, góc hình học và kỹ năng an toàn trên không gian mạng.',
    mathTopics: [
      'Khái niệm & 4 phép tính với Phân số',
      'Góc nhọn, góc tù, đường thẳng song song & vuông góc',
      'Đọc & phân tích biểu đồ cột, bảng số liệu',
      'Dạng toán tìm hai số khi biết Tổng - Tỉ, Hiệu - Tỉ',
    ],
    lifeSkillsTopics: [
      'An toàn khi dùng Internet & phòng tránh lừa đảo mạng',
      'Kỹ năng quản lý thời gian biểu tự giác',
      'Nhận thức về giá trị đồng tiền và tiết kiệm',
    ],
    highlight: 'Hệ thống AI phân tích điểm yếu phân số và hướng dẫn phương pháp giải từng bước.',
  },
  {
    grade: 5,
    label: 'Lớp 5',
    age: '10 - 11 tuổi',
    summary: 'Vững vàng chuyển cấp: Số thập phân, hình học không gian và kỹ năng thuyết trình tự tin.',
    mathTopics: [
      'Số thập phân & các phép tính nâng cao',
      'Tỉ số phần trăm & bài toán tính lãi suất, giảm giá',
      'Hình tròn, hình thang, hình hộp chữ nhật & hình lập phương',
      'Toán chuyển động đều: Vận tốc, Quãng đường, Thời gian',
    ],
    lifeSkillsTopics: [
      'Tư duy phản biện & tự tin thuyết trình trước đám đông',
      'Kỹ năng đối phó với áp lực thi cử chuyển cấp',
      'Trách nhiệm với gia đình và cộng đồng xung quanh',
    ],
    highlight: 'Bộ đề thi thử chuyển cấp kèm bảng phân tích năng lực chi tiết từng chuyên đề.',
  },
];

export const CurriculumTabs: React.FC = () => {
  const router = useRouter();
  const [selectedGrade, setSelectedGrade] = useState<number>(1);

  const currentGradeData =
    GRADES_DATA.find((g) => g.grade === selectedGrade) || GRADES_DATA[0];

  const handleSelectGrade = (grade: number) => {
    sound.playPop();
    setSelectedGrade(grade);
  };

  return (
    <section id="chuong-trinh" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-10">
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
            Chương Trình Học Từ Lớp 1 Đến Lớp 5
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-bold">
            Nội dung thiết kế chuẩn mực theo chương trình giáo dục phổ thông mới, chia nhỏ theo từng bài học trực quan kèm giọng đọc.
          </p>
        </div>

        {/* Grade Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {GRADES_DATA.map((item) => (
            <button
              key={item.grade}
              onClick={() => handleSelectGrade(item.grade)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-black text-xs sm:text-sm font-display transition-all border-2 ${
                selectedGrade === item.grade
                  ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-tactile-yellow scale-105'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-amber-50'
              }`}
            >
              <span>{item.label}</span>
              <span className="hidden sm:inline-block ml-1.5 text-[10px] opacity-80">
                ({item.age})
              </span>
            </button>
          ))}
        </div>

        {/* Grade Details Showcase Card */}
        <AnimatePresence mode="wait">
          <m.div
            key={currentGradeData.grade}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-kid-cream border-3 border-amber-300 rounded-5xl p-6 sm:p-9 shadow-md space-y-6"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/70 pb-4">
              <div>
                <span className="inline-block px-3 py-1 bg-amber-200 text-amber-950 rounded-full text-xs font-black mb-1">
                  Khối {currentGradeData.label} • Độ tuổi: {currentGradeData.age}
                </span>
                <p className="text-slate-700 font-bold text-sm sm:text-base">
                  {currentGradeData.summary}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white rounded-2xl border border-amber-200 text-xs font-black text-amber-800 shadow-xs">
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>{currentGradeData.highlight}</span>
              </div>
            </div>

            {/* Content Columns: Math vs Life Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Math column */}
              <div className="bg-white rounded-3xl border-2 border-amber-200 p-5 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-amber-800 font-display font-black text-base sm:text-lg">
                  <span className="text-xl">📐</span>
                  <span>Chuyên Đề Toán Học Trọng Tâm</span>
                </div>
                <div className="space-y-2">
                  {currentGradeData.mathTopics.map((topic, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Life skills column */}
              <div className="bg-white rounded-3xl border-2 border-emerald-200 p-5 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-display font-black text-base sm:text-lg">
                  <span className="text-xl">🛡️</span>
                  <span>Kỹ Năng Sống & Rèn Nhân Cách</span>
                </div>
                <div className="space-y-2">
                  {currentGradeData.lifeSkillsTopics.map((topic, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom action */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm font-bold text-slate-700">
                ⭐ Tất cả bài học đều tích hợp bài tập tương tác & chấm điểm tự động.
              </span>
              <TactileButton
                variant="yellow"
                size="md"
                onClick={() => {
                  sound.playPop();
                  router.push(`/assessment?grade=${currentGradeData.grade}`);
                }}
                className="font-black font-display text-amber-950 text-xs sm:text-sm"
              >
                <span>Làm Khảo Sát Năng Lực {currentGradeData.label}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </TactileButton>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
