'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Check, RefreshCw, Palette, Layers, Eye } from 'lucide-react';
import { AppLogo } from '@/components/kid/AppLogo';
import { TactileButton } from '@/components/kid/TactileButton';

export default function LogoPreviewPage() {
  const [showCap, setShowCap] = useState(true);
  const [showGlasses, setShowGlasses] = useState(true);
  const [showStarAi, setShowStarAi] = useState(true);
  const [showSymbols, setShowSymbols] = useState(true);
  const [activeBg, setActiveBg] = useState<'cream' | 'white' | 'dark' | 'blue'>('cream');

  const bgClasses = {
    cream: 'bg-[#FDFBF7] text-slate-800 border-amber-200',
    white: 'bg-white text-slate-800 border-slate-200',
    dark: 'bg-slate-900 text-white border-slate-800',
    blue: 'bg-sky-500 text-white border-sky-400',
  };

  return (
    <div className="min-h-screen bg-kid-cream p-4 md:p-8 font-body">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-kid-border">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-black text-amber-700 hover:text-amber-800 mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Về Trang Chủ
            </Link>
            <h1 className="text-2xl md:text-4xl font-display font-black text-slate-900 tracking-tight">
              Bản Thử Nghiệm Logo App &amp; Hệ Thống Nhân Vật
            </h1>
            <p className="text-sm md:text-base font-semibold text-slate-600 mt-1">
              Dự án: <span className="font-bold text-amber-800">Bé Thông Thái</span> • Phong cách:{' '}
              <span className="font-bold text-amber-800">Chunky Vector Chibi &amp; 3D Tactile</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-xs font-black text-emerald-800">
              <Check className="w-3.5 h-3.5" /> Chuẩn Scale Modular
            </span>
          </div>
        </div>

        {/* Section 1: Dual Showcase (AI 3D Render vs Vector SVG Code) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 1A: 3D Rendered Concept (AI Visual Benchmark) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-200/80 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-extrabold text-xs flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Bản 3D Tactile (App Store / Marketing)
                </span>
                <span className="text-xs font-bold text-slate-700">Render 1024x1024</span>
              </div>
              <p className="text-sm font-semibold text-slate-700 mb-4">
                Phiên bản nổi khối chân thực, thích hợp làm Avatar ứng dụng trên Google Play / App Store, banner quảng bá và thú nhồi bông/vật phẩm quà tặng.
              </p>
            </div>

            <div className="relative aspect-square max-w-sm mx-auto w-full rounded-4xl overflow-hidden shadow-2xl border-4 border-amber-300 group">
              <Image
                src="/logo-app.jpg"
                alt="Logo Bé Thông Thái 3D"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 text-center">
              <span className="text-xs font-extrabold text-slate-700">
                ✨ Đặc trưng: Cú Bi đeo kính, Mũ cử nhân AI Star, Trái tim Kỹ năng sống &amp; Dấu toán học
              </span>
            </div>
          </div>

          {/* 1B: Pure SVG Vector Component (Production Web / In-App) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-200/80 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-950 font-extrabold text-xs flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-sky-600" /> Bản Vector SVG Siêu Nhẹ (Web &amp; In-App)
                </span>
                <span className="text-xs font-bold text-slate-700">Zero-Lag Vector</span>
              </div>
              <p className="text-sm font-semibold text-slate-700 mb-4">
                Phiên bản vẽ bằng mã nguồn SVG thuần túy, dung lượng &lt; 3KB, phóng to vô hạn không vỡ nét, cho phép đổi màu và tháo lắp trang phục bằng code.
              </p>
            </div>

            {/* Interactive Preview Canvas */}
            <div
              className={`rounded-4xl p-8 border-2 transition-all flex flex-col items-center justify-center min-h-[320px] shadow-inner ${bgClasses[activeBg]}`}
            >
              <AppLogo
                size="2xl"
                variant="full"
                showAccessories={{
                  cap: showCap,
                  glasses: showGlasses,
                  starAi: showStarAi,
                  symbols: showSymbols,
                }}
              />
            </div>

            {/* Background Switcher for contrast check */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-slate-600" /> Thử nền:
              </span>
              <div className="flex items-center gap-2">
                {(['cream', 'white', 'dark', 'blue'] as const).map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setActiveBg(bg)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      bg === 'cream'
                        ? 'bg-[#FDFBF7] border-amber-300'
                        : bg === 'white'
                          ? 'bg-white border-slate-300'
                          : bg === 'dark'
                            ? 'bg-slate-900 border-slate-700'
                            : 'bg-sky-500 border-sky-600'
                    } ${activeBg === bg ? 'scale-125 shadow-md ring-2 ring-amber-500' : 'opacity-80'}`}
                    title={`Nền ${bg}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Modular Item Slot Customizer (Thử nghiệm tháo lắp trang bị) */}
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-200/80 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-display font-black text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-600" /> Thử Nghiệm Tháo Lắp Vật Phẩm (Modular Slot System)
              </h2>
              <p className="text-xs md:text-sm font-semibold text-slate-600 mt-1">
                Bật/tắt các phụ kiện dưới đây để thấy khả năng mở rộng (scale) làm đồ thưởng Gamification trong tương lai:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => setShowCap(!showCap)}
              className={`p-3 rounded-2xl border-2 font-extrabold text-xs flex flex-col items-center gap-2 transition-all ${
                showCap
                  ? 'bg-sky-50 border-sky-400 text-sky-950 shadow-xs'
                  : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              <span className="text-2xl">🎓</span>
              <span>Mũ Cử Nhân (Headwear)</span>
              <span className="text-xs uppercase tracking-wider font-black">{showCap ? 'Đang Đeo' : 'Đã Tháo'}</span>
            </button>

            <button
              onClick={() => setShowStarAi(!showStarAi)}
              disabled={!showCap}
              className={`p-3 rounded-2xl border-2 font-extrabold text-xs flex flex-col items-center gap-2 transition-all ${
                !showCap
                  ? 'bg-slate-100 border-slate-200 text-slate-500 opacity-50 cursor-not-allowed'
                  : showStarAi
                    ? 'bg-amber-50 border-amber-400 text-amber-950 shadow-xs'
                    : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              <span className="text-2xl">✨</span>
              <span>Sao AI Dẫn Lối (Badge)</span>
              <span className="text-xs uppercase tracking-wider font-black">{showStarAi ? 'Đang Đeo' : 'Đã Tháo'}</span>
            </button>

            <button
              onClick={() => setShowGlasses(!showGlasses)}
              className={`p-3 rounded-2xl border-2 font-extrabold text-xs flex flex-col items-center gap-2 transition-all ${
                showGlasses
                  ? 'bg-amber-50 border-amber-400 text-amber-950 shadow-xs'
                  : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              <span className="text-2xl">👓</span>
              <span>Kính Cận Tròn (Eyewear)</span>
              <span className="text-xs uppercase tracking-wider font-black">{showGlasses ? 'Đang Đeo' : 'Đã Tháo'}</span>
            </button>

            <button
              onClick={() => setShowSymbols(!showSymbols)}
              className={`p-3 rounded-2xl border-2 font-extrabold text-xs flex flex-col items-center gap-2 transition-all ${
                showSymbols
                  ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-xs'
                  : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              <span className="text-2xl">➕ ❤️</span>
              <span>Ký Hiệu Toán &amp; Tim</span>
              <span className="text-xs uppercase tracking-wider font-black">{showSymbols ? 'Đang Bật' : 'Đã Ẩn'}</span>
            </button>
          </div>
        </div>

        {/* Section 3: Scalability Check (Các kích thước thực tế) */}
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-200/80 shadow-md space-y-6">
          <div>
            <h2 className="text-xl font-display font-black text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-amber-600" /> Kiểm Tra Độ Rõ Nét Ở Các Kích Thước Khác Nhau
            </h2>
            <p className="text-xs md:text-sm font-semibold text-slate-600 mt-1">
              Đảm bảo logo không bị nhòe hay mất chi tiết từ kích cỡ nhỏ nhất (Favicon 28px) đến kích cỡ bảng hiệu (140px):
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* Favicon Size */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col items-center gap-2 text-center">
              <span className="text-xs font-extrabold text-slate-500">Favicon (28px)</span>
              <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center border border-amber-200">
                <AppLogo size="xs" variant="icon" />
              </div>
              <span className="text-[11px] font-bold text-slate-600">Tab trình duyệt</span>
            </div>

            {/* Mobile Topbar Size */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col items-center gap-2 text-center">
              <span className="text-xs font-extrabold text-slate-500">Topbar Mobile (36px)</span>
              <div className="py-2 px-3 rounded-xl bg-white shadow-xs border border-amber-200">
                <AppLogo size="sm" variant="full" withSubtitle={false} />
              </div>
              <span className="text-[11px] font-bold text-slate-600">Header điện thoại</span>
            </div>

            {/* Desktop Navbar Size */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col items-center gap-2 text-center">
              <span className="text-xs font-extrabold text-slate-500">Desktop Navbar (44px)</span>
              <div className="py-2 px-3 rounded-xl bg-white shadow-xs border border-amber-200">
                <AppLogo size="md" variant="full" />
              </div>
              <span className="text-[11px] font-bold text-slate-600">Thanh điều hướng web</span>
            </div>

            {/* App Icon Home Screen */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col items-center gap-2 text-center">
              <span className="text-xs font-extrabold text-slate-500">Mobile Home Screen (64px)</span>
              <div className="p-2 rounded-2.5xl bg-white shadow-md border border-amber-200">
                <AppLogo size="lg" variant="icon" />
              </div>
              <span className="text-[11px] font-bold text-slate-600">Màn hình điện thoại</span>
            </div>
          </div>
        </div>

        {/* Section 4: Brand Tokens & Color Palette */}
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-200/80 shadow-md">
          <h2 className="text-xl font-display font-black text-slate-900 mb-4">
            Bảng Mã Màu Chuẩn Hóa Của Logo (Brand Design Tokens)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-extrabold">
            <div className="p-3 rounded-xl bg-amber-400 text-amber-950 flex flex-col justify-between h-20 shadow-xs">
              <span>Vàng Mật Ong</span>
              <span>#FFCA28</span>
            </div>
            <div className="p-3 rounded-xl bg-orange-500 text-white flex flex-col justify-between h-20 shadow-xs">
              <span>Cam Năng Động</span>
              <span>#FF9800</span>
            </div>
            <div className="p-3 rounded-xl bg-sky-500 text-white flex flex-col justify-between h-20 shadow-xs">
              <span>Xanh Trí Tuệ</span>
              <span>#38BDF8</span>
            </div>
            <div className="p-3 rounded-xl bg-rose-500 text-white flex flex-col justify-between h-20 shadow-xs">
              <span>Đỏ Trái Tim An Toàn</span>
              <span>#FF5252</span>
            </div>
            <div className="p-3 rounded-xl bg-[#3E2723] text-amber-100 flex flex-col justify-between h-20 shadow-xs">
              <span>Nâu Cà Phê Viền Nét</span>
              <span>#3E2723</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
