'use client';

import React, { useState } from 'react';
import {
  Monitor,
  Laptop,
  Download,
  Apple,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FolderDown,
  ExternalLink,
  Keyboard,
  Eye,
  School,
  HardDrive,
  Cpu,
  RefreshCw,
  Terminal,
} from 'lucide-react';
import { AppLogo } from '@/components/kid/AppLogo';
import { TactileButton } from '@/components/kid/TactileButton';
import { AppDownloadModal } from './AppDownloadModal';
import { sound } from '@/lib/sound';

export const AppDownloadSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadingOs, setDownloadingOs] = useState<string | null>(null);

  const handleDownload = (osName: string, fileName: string) => {
    sound.playPop();
    setDownloadingOs(osName);

    // Simulate instant safe file trigger
    const link = document.createElement('a');
    link.href = '#';
    link.setAttribute('download', fileName);
    setTimeout(() => {
      setDownloadingOs(null);
      sound.playSuccess();
      setIsModalOpen(true);
    }, 600);
  };

  const desktopBenefits = [
    {
      icon: Eye,
      title: 'Màn Hình Lớn - Bảo Vệ Thị Lực',
      desc: 'Giúp bé ngồi đúng khoảng cách chuẩn 50 - 60cm, hạn chế tối đa nguy cơ cận thị so với màn hình điện thoại nhỏ.',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      icon: Keyboard,
      title: 'Luyện Bấm Phím Số (Numpad)',
      desc: 'Rèn luyện phản xạ tính toán nhanh bằng bàn phím số chuyên dụng, sẵn sàng cho các kỳ thi Violympic & Trạng Nguyên.',
      color: 'bg-amber-100 text-amber-800 border-amber-300',
    },
    {
      icon: ShieldCheck,
      title: 'Chế Độ Toàn Màn Hình Khóa Tab',
      desc: 'Cách ly hoàn toàn với trình duyệt web, không có tab Youtube, mạng xã hội hay game lạ làm bé xao nhãng.',
      color: 'bg-purple-100 text-purple-800 border-purple-300',
    },
    {
      icon: School,
      title: 'Tối Ưu Cho Phòng Máy Trường Học',
      desc: 'Hỗ trợ bản cài đặt hàng loạt (.MSI) cho giáo viên tin học, tương thích mượt mà bảng tương tác thông minh (Smart Board).',
      color: 'bg-sky-100 text-sky-800 border-sky-300',
    },
  ];

  return (
    <section
      id="tai-app"
      className="py-16 sm:py-24 bg-gradient-to-b from-amber-400 via-amber-300 to-amber-400 text-slate-900 relative overflow-hidden"
    >
      {/* Background Decorative Circles & Stars */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-12 right-12 text-amber-100/80 text-3xl font-black select-none pointer-events-none animate-pulse">
        ✦
      </div>
      <div className="absolute bottom-16 left-10 text-amber-100/80 text-2xl font-black select-none pointer-events-none">
        ★
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Showcase Container */}
        <div className="bg-white rounded-5xl border-4 border-amber-300 shadow-[0_20px_50px_rgba(217,119,6,0.18)] p-6 sm:p-10 lg:p-14 relative overflow-hidden space-y-10">
          {/* Version Status Bar */}
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-2.5 bg-slate-100 px-3.5 py-1.5 rounded-2xl border border-slate-200 text-xs font-black text-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Phiên bản Desktop v2.4.0 (Mới nhất)</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600">Dung lượng: ~35 MB</span>
            </div>
          </div>

          {/* Center 2-Column Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT COLUMN: Catchy Copy & Download Buttons */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
                  Tải Ứng Dụng Toán Vui Cho{' '}
                  <span className="text-amber-600 block sm:inline">Máy Tính (Desktop App)</span> 💻
                </h2>
                <p className="text-base sm:text-lg font-bold text-slate-700 leading-relaxed">
                  Cài đặt trực tiếp lên máy tính bàn (PC), Laptop hoặc Bảng thông minh lớp học. Chạy độc lập, tốc độ
                  phản hồi tức thì, không bị giật lag và chống xao nhãng 100%.
                </p>
              </div>

              {/* Big Chunky Desktop OS Download Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {/* Windows Button */}
                <button
                  type="button"
                  onClick={() => handleDownload('Windows', 'ToanVui-Desktop-Setup-v2.4.0.exe')}
                  className="flex items-center gap-3.5 px-5 py-4 bg-slate-950 hover:bg-slate-800 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 border-2 border-slate-900 group text-left relative overflow-hidden"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {/* Windows Logo SVG */}
                    <svg className="w-6 h-6 text-sky-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span>Khuyên Dùng Cho PC &amp; Laptop</span>
                      <span className="px-1.5 py-0.2 rounded bg-sky-500 text-white text-[9px] font-black">64-bit</span>
                    </div>
                    <div className="font-display font-black text-base sm:text-lg leading-tight tracking-tight text-white mt-0.5">
                      Tải Cho Windows (.exe)
                    </div>
                  </div>
                  <FolderDown className="w-5 h-5 text-sky-400 shrink-0 group-hover:translate-y-0.5 transition-transform" />
                </button>

                {/* macOS Button */}
                <button
                  type="button"
                  onClick={() => handleDownload('macOS', 'ToanVui-Desktop-v2.4.0.dmg')}
                  className="flex items-center gap-3.5 px-5 py-4 bg-slate-950 hover:bg-slate-800 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 border-2 border-slate-900 group text-left relative overflow-hidden"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Apple className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span>Dành Cho MacBook &amp; iMac</span>
                      <span className="px-1.5 py-0.2 rounded bg-amber-400 text-amber-950 text-[9px] font-black">
                        M1/M2/M3 &amp; Intel
                      </span>
                    </div>
                    <div className="font-display font-black text-base sm:text-lg leading-tight tracking-tight text-white mt-0.5">
                      Tải Cho macOS (.dmg)
                    </div>
                  </div>
                  <FolderDown className="w-5 h-5 text-amber-400 shrink-0 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>

              {/* Secondary Options: School Package & Web App Desktop */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    sound.playPop();
                    setIsModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-xs sm:text-sm border-2 border-amber-300 transition-all shadow-xs"
                >
                  <School className="w-4 h-4 text-amber-700" />
                  <span>Bản Cài Đặt Phòng Máy Trường Học (.MSI)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playPop();
                    setIsModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs sm:text-sm border border-slate-300 transition-all"
                >
                  <Monitor className="w-4 h-4 text-slate-600" />
                  <span>Cài Đặt Web App Desktop (PWA)</span>
                </button>
              </div>

              {/* Safe Download Footnote */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Chữ ký số an toàn (Code-Signed &amp; Sạch 100%)</span>
                </div>
                <span>•</span>
                <span className="text-slate-600">Tương thích Windows 10, Windows 11</span>
                <span>•</span>
                <span className="text-slate-600">Hỗ trợ chip Apple M-Series &amp; Intel</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Realistic Desktop Monitor Frame Mockup */}
            <div className="lg:col-span-5 flex justify-center relative">
              {/* Floating Top Badge */}
              <div className="absolute -top-5 -right-2 z-20 hidden sm:block">
                <div className="bg-amber-400 border-2 border-amber-500 text-amber-950 font-black text-xs px-3.5 py-1.5 rounded-2xl shadow-lg flex items-center gap-1.5 animate-bounce">
                  <span>⚡ Phím số Numpad sẵn sàng!</span>
                </div>
              </div>

              {/* Desktop Monitor Frame */}
              <div className="w-full max-w-[420px] sm:max-w-[460px] flex flex-col items-center">
                {/* Screen Bezel */}
                <div className="w-full bg-slate-900 rounded-3xl p-3 sm:p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border-4 border-slate-700 relative">
                  {/* Webcam dot */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-800 border border-slate-700" />

                  {/* Window Bar (Close, Min, Max controls) */}
                  <div className="bg-slate-800 rounded-t-xl px-3 py-1.5 flex items-center justify-between border-b border-slate-700 mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="text-[10px] font-black text-slate-300 font-mono flex items-center gap-1">
                      <span>Toán Vui Desktop v2.4.0</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold">F11 Toàn Màn Hình</div>
                  </div>

                  {/* Inner Screen App Content */}
                  <div className="bg-gradient-to-b from-amber-50 via-white to-amber-100 rounded-xl overflow-hidden p-4 space-y-3.5 border border-amber-200">
                    {/* Header inside desktop app */}
                    <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center text-xs font-black shadow-xs">
                          🦉
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-900">Phòng Máy Lớp 3A</div>
                          <div className="text-[10px] font-bold text-amber-700">Chế độ thi Violympic có bấm giờ</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300 text-amber-950 text-xs font-black">
                        <span>⏱️ 14:28 còn lại</span>
                      </div>
                    </div>

                    {/* Question Card */}
                    <div className="bg-white rounded-xl p-3.5 border-2 border-amber-200 shadow-xs space-y-2.5">
                      <div className="flex items-center justify-between text-[10px] font-black text-slate-500">
                        <span>CÂU HỎI 08 / 20</span>
                        <span className="text-emerald-700 font-extrabold">Độ khó: Vận dụng cao</span>
                      </div>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                        Một hình chữ nhật có chiều dài 24cm, chiều rộng bằng 1/3 chiều dài. Chu vi hình chữ nhật đó là:
                      </p>

                      {/* 4 Choices */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-center text-xs font-black text-slate-700 flex items-center justify-between px-3">
                          <span className="text-slate-400 text-[10px]">Phím [1]</span>
                          <span>48 cm</span>
                        </div>
                        <div className="p-2 rounded-lg bg-emerald-500 border-2 border-emerald-600 text-center text-xs font-black text-white shadow-sm flex items-center justify-between px-3">
                          <span className="text-emerald-200 text-[10px]">Phím [2]</span>
                          <span>64 cm ✓</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-center text-xs font-black text-slate-700 flex items-center justify-between px-3">
                          <span className="text-slate-400 text-[10px]">Phím [3]</span>
                          <span>32 cm</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-center text-xs font-black text-slate-700 flex items-center justify-between px-3">
                          <span className="text-slate-400 text-[10px]">Phím [4]</span>
                          <span>72 cm</span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Status Bar */}
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 pt-1">
                      <span className="text-emerald-700 font-black">● Đã kết nối máy chủ trường học</span>
                      <span>Bấm Enter để xác nhận đáp án</span>
                    </div>
                  </div>
                </div>

                {/* Monitor Stand */}
                <div className="w-16 h-8 bg-slate-700 border-x-4 border-slate-800" />
                <div className="w-44 h-3 bg-slate-800 rounded-full shadow-md border-b-2 border-slate-950" />
              </div>
            </div>
          </div>

          {/* 4 Core Benefits of Desktop */}
          <div className="pt-8 border-t-2 border-amber-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {desktopBenefits.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all space-y-2 group"
                >
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 ${item.color} shadow-xs group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-black text-sm text-slate-900 group-hover:text-amber-950 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs font-bold text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Download & Technical Setup Modal */}
      <AppDownloadModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
