'use client';

import React from 'react';
import { m } from 'framer-motion';
import { UserSquare2, Search, Filter, Star, Award, CheckCircle2 } from 'lucide-react';
import { gentleSpring, listItemVariants, staggerContainerVariants } from '@/lib/motion';

const studentsList = [
  { id: 1, name: 'Nguyễn Minh Anh', avatar: '🐱', level: 'Vận dụng cao', score: 100, completedTasks: 12, stars: 240 },
  { id: 2, name: 'Trần Thị Bích', avatar: '🐰', level: 'Vận dụng cao', score: 85, completedTasks: 10, stars: 190 },
  { id: 3, name: 'Lê Hoàng Nam', avatar: '🦁', level: 'Vận dụng', score: 75, completedTasks: 8, stars: 150 },
  { id: 4, name: 'Phạm Gia Hưng', avatar: '🐻', level: 'Vận dụng', score: 65, completedTasks: 7, stars: 130 },
  { id: 5, name: 'Đỗ Thảo Vy', avatar: '🦊', level: 'Cơ bản', score: 45, completedTasks: 4, stars: 90 },
];

export default function StudentsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
            Thông Tin & Tiến Độ Học Sinh
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Theo dõi danh sách các bé trong lớp, phân cấp độ và điểm số tích lũy.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-700">Tổng số: {studentsList.length} học sinh</span>
        </div>

        <m.div variants={staggerContainerVariants} initial="hidden" animate="visible" className="divide-y divide-slate-100">
          {studentsList.map((stu) => (
            <m.div
              key={stu.id}
              variants={listItemVariants}
              whileHover={{ x: 3, backgroundColor: 'rgb(248 250 252)' }}
              transition={gentleSpring}
              className="p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl">
                  {stu.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{stu.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        stu.level === 'Vận dụng cao'
                          ? 'bg-emerald-50 text-emerald-800'
                          : stu.level === 'Vận dụng'
                          ? 'bg-sky-50 text-sky-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {stu.level}
                    </span>
                    <span className="text-xs font-bold text-slate-700">Điểm test: {stu.score}/100</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden sm:block text-right">
                  <div className="text-xs font-bold text-slate-800">{stu.completedTasks} bài tập</div>
                  <div className="text-xs font-bold text-slate-600">Đã hoàn thành</div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 font-bold rounded-xl text-xs border border-amber-200">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span>{stu.stars}</span>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </div>
  );
}
