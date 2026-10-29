'use client';

import React, { useState } from 'react';
import { m } from 'framer-motion';
import { BookOpen, Sparkles, CheckCircle2, Play, Clock, Star } from 'lucide-react';
import { TactileButton } from '@/components/kid/TactileButton';
import { sound } from '@/lib/sound';
import { cardMotion, gentleSpring, listItemVariants, staggerContainerVariants } from '@/lib/motion';

const lessonsData = [
  {
    id: 1,
    title: 'Phép cộng có nhớ trong phạm vi 100',
    grade: 'Lớp 3',
    subject: 'Toán học',
    duration: '15 phút',
    points: 20,
    completed: true,
    description: 'Học cách thực hiện phép tính cộng có nhớ hàng chục và hàng đơn vị một cách chính xác.',
    icon: '➕',
  },
  {
    id: 2,
    title: 'Tính nhanh các số tròn chục và tròn trăm',
    grade: 'Lớp 3',
    subject: 'Toán học',
    duration: '20 phút',
    points: 25,
    completed: false,
    description: 'Bí quyết tính nhẩm thần tốc giúp bé giải toán nhanh như chớp!',
    icon: '⚡',
  },
  {
    id: 3,
    title: 'Bài toán tìm hai số khi biết Tổng và Hiệu',
    grade: 'Lớp 3 - 4',
    subject: 'Toán tư duy',
    duration: '25 phút',
    points: 30,
    completed: false,
    description: 'Phương pháp vẽ sơ đồ đoạn thẳng giải quyết dạng toán kinh điển bậc tiểu học.',
    icon: '📐',
  },
  {
    id: 4,
    title: 'Hình học trực quan: Chu vi & Diện tích hình chữ nhật',
    grade: 'Lớp 3',
    subject: 'Hình học',
    duration: '18 phút',
    points: 20,
    completed: false,
    description: 'Quan sát các ví dụ thực tế xung quanh cuộc sống để ghi nhớ công thức dễ dàng.',
    icon: '🟧',
  },
];

export default function LessonsPage() {
  const [selectedSubject, setSelectedSubject] = useState('Tất cả');

  const filtered = selectedSubject === 'Tất cả' 
    ? lessonsData 
    : lessonsData.filter(l => l.subject === selectedSubject);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black text-sky-700 bg-sky-100 px-3.5 py-1.5 rounded-full border border-sky-300">
            Kho Bài Giảng Vui Nhộn
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-black text-slate-800 mt-2">
            Bài Học Toán Thông Thái
          </h1>
          <p className="text-slate-600 text-sm font-semibold mt-1">
            Mỗi bài học được thiết kế ngắn gọn, trực quan kèm các ví dụ sinh động giúp bé nắm vững kiến thức.
          </p>
        </div>
      </div>

      {/* Tabs lọc môn học dạng tactile */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['Tất cả', 'Toán học', 'Toán tư duy', 'Hình học'].map((sub) => {
          const isActive = selectedSubject === sub;
          return (
            <m.button
              key={sub}
              onClick={() => {
                sound.playPop();
                setSelectedSubject(sub);
              }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              animate={isActive ? { y: -2, scale: 1.02 } : { y: 0, scale: 1 }}
              transition={gentleSpring}
              className={`px-4 py-2 rounded-2xl text-xs md:text-sm font-black transition-colors shrink-0 select-none border-2 ${
                isActive
                  ? 'bg-amber-400 border-amber-500 text-amber-950 shadow-tactile-yellow translate-y-[-2px]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
              }`}
            >
              {sub}
            </m.button>
          );
        })}
      </div>

      {/* Danh sách thẻ bài học */}
      <m.div
        key={selectedSubject}
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {filtered.map((lesson) => (
          <m.div
            key={lesson.id}
            layout
            variants={listItemVariants}
            whileHover={cardMotion.whileHover}
            transition={gentleSpring}
            className="bg-white rounded-4xl border-2 border-kid-border p-6 shadow-xs hover:border-amber-400 hover:shadow-tactile-yellow transition-colors flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{lesson.icon}</span>
                  <span className="text-xs font-black text-sky-800 bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
                    {lesson.subject}
                  </span>
                </div>
                {lesson.completed ? (
                  <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Đã hoàn thành
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> +{lesson.points} sao
                  </span>
                )}
              </div>

              <h3 className="font-display font-black text-slate-800 text-lg leading-snug">
                {lesson.title}
              </h3>
              <p className="text-sm text-slate-700 font-semibold leading-relaxed">
                {lesson.description}
              </p>
            </div>

            <div className="pt-4 border-t-2 border-kid-border flex items-center justify-between text-sm font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-600" /> {lesson.duration}
              </span>
              <TactileButton
                variant={lesson.completed ? 'white' : 'yellow'}
                size="sm"
                onClick={() => sound.playPop()}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{lesson.completed ? 'Ôn lại bài 🔄' : 'Bắt đầu học 🚀'}</span>
              </TactileButton>
            </div>
          </m.div>
        ))}
      </m.div>
    </div>
  );
}
