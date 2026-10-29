'use client';

import React, { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Award, CheckCircle2, Sparkles, Loader2, School, RefreshCw } from 'lucide-react';
import { cardMotion, gentleSpring, listItemVariants, staggerContainerVariants } from '@/lib/motion';
import { getTeacherAnalytics, seedDemoClass } from '@/lib/api';
import { sound } from '@/lib/sound';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [data, setData] = useState<{
    totalClasses: number;
    totalStudents: number;
    totalSubmissions: number;
    avgScore: number;
    completionRate: number;
    levels: Array<{ name: string; count: number; percent: string; color: string }>;
    recentSubmissions: Array<any>;
  } | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await getTeacherAnalytics();
      setData(res);
    } catch {
      // Fallback mặc định
      setData({
        totalClasses: 0,
        totalStudents: 0,
        totalSubmissions: 0,
        avgScore: 0,
        completionRate: 0,
        levels: [
          { name: 'Cần cố gắng (Dưới 50đ)', count: 0, percent: '0%', color: 'bg-rose-400' },
          { name: 'Hoàn thành (50 - 80đ)', count: 0, percent: '0%', color: 'bg-sky-400' },
          { name: 'Hoàn thành tốt (Trên 80đ)', count: 0, percent: '0%', color: 'bg-emerald-400' },
        ],
        recentSubmissions: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleSeedDemo = async () => {
    sound.playPop();
    setSeeding(true);
    try {
      await seedDemoClass();
      sound.playSuccess();
      await fetchAnalytics();
      alert('Đã nạp thành công Lớp 3A mẫu cùng 3 học sinh và bài thi thực tế!');
    } catch (err: any) {
      alert(err?.message || 'Không thể tạo dữ liệu mẫu.');
    } finally {
      setSeeding(false);
    }
  };

  const stats = [
    {
      label: 'Tổng số học sinh',
      value: data?.totalStudents ? `${data.totalStudents} em` : '0 em',
      change: `${data?.totalClasses || 0} lớp học đang quản lý`,
      icon: Users,
      color: 'text-sky-600 bg-sky-50',
    },
    {
      label: 'Điểm khảo sát TB',
      value: data?.avgScore ? `${data.avgScore}/100` : '--',
      change: 'Theo thang điểm 100',
      icon: TrendingUp,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      label: 'Tỉ lệ hoàn thành test',
      value: data?.completionRate ? `${data.completionRate}%` : '0%',
      change: `${data?.totalSubmissions || 0} bài đã nộp`,
      icon: CheckCircle2,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      label: 'Học sinh Hoàn thành tốt',
      value: `${data?.levels?.find((l) => l.name.includes('tốt'))?.count || 0} em`,
      change: 'Đạt trên 80 điểm',
      icon: Award,
      color: 'text-amber-600 bg-amber-50',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Header with Seed Demo Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 font-display">
            Thống Kê Tiến Độ & Phổ Điểm Sư Phạm
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-semibold">
            Đánh giá năng lực học sinh theo chuẩn Thông tư 27 của Bộ GD&ĐT dựa trên kết quả bài làm thực tế.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchAnalytics}
            disabled={loading}
            className="p-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
            title="Làm mới số liệu"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleSeedDemo}
            disabled={seeding}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black text-xs rounded-2xl shadow-tactile-green hover:brightness-105 transition-all"
          >
            {seeding ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>Nạp Lớp Học & Bài Thi Mẫu (1-Click Demo)</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-slate-500">Đang tổng hợp dữ liệu từ Neon Cloud...</p>
        </div>
      ) : (
        <>
          {/* Stats Bar */}
          <m.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <m.div
                  key={idx}
                  variants={listItemVariants}
                  whileHover={cardMotion.whileHover}
                  transition={gentleSpring}
                  className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-700">{s.label}</span>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${s.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-800 font-display">{s.value}</div>
                  <div className="text-xs text-slate-600 font-bold">{s.change}</div>
                </m.div>
              );
            })}
          </m.div>

          {/* Level Breakdown Chart */}
          <div className="bg-white rounded-4xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-black text-slate-800 font-display">
                  Phân Loại Mức Độ Năng Lực Học Sinh (Chuẩn Thông Tư 27)
                </h2>
                <p className="text-sm font-semibold text-slate-700 mt-0.5">
                  Tự động xếp nhóm dựa trên điểm khảo sát đầu vào và bài tập rèn luyện.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black">
                Dữ liệu thực tế
              </span>
            </div>

            <div className="space-y-5">
              {data?.levels.map((lvl) => (
                <div key={lvl.name} className="space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-black">
                    <span className="text-slate-800">{lvl.name}</span>
                    <span className="text-slate-700">
                      {lvl.count} học sinh ({lvl.percent})
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3.5 p-0.5 overflow-hidden border border-slate-200">
                    <m.div
                      className={`h-full rounded-full ${lvl.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: lvl.percent }}
                      transition={{ ...gentleSpring, delay: 0.16 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {data?.totalStudents === 0 && (
              <div className="p-6 bg-amber-50 rounded-3xl border border-amber-200 text-center space-y-2">
                <p className="text-sm font-bold text-amber-900">
                  Thầy/Cô chưa có học sinh nào nộp bài thi trong các lớp học hiện tại.
                </p>
                <p className="text-xs text-amber-700">
                  Hãy bấm nút <strong>&quot;Nạp Lớp Học & Bài Thi Mẫu (1-Click Demo)&quot;</strong> ở góc trên để xem trước biểu đồ phân tích thực tế!
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
