'use client';

import React, { useState } from 'react';
import {
  Laptop,
  Smartphone,
  Sparkles,
  Download,
  CheckCircle2,
  Share2,
  PlusSquare,
  Zap,
  HardDrive,
  RefreshCw,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { sound } from '@/lib/sound';

export const WebAppInstallCard: React.FC = () => {
  const { canInstall, isInstalled, isIos, isStandalone, installApp } = usePwaInstall();
  const [showIosTutorial, setShowIosTutorial] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  const handleInstallClick = async () => {
    sound.playPop();

    if (isIos) {
      setShowIosTutorial(true);
      return;
    }

    if (canInstall) {
      const success = await installApp();
      if (success) {
        sound.playSuccess();
        setInstallSuccess(true);
      }
    } else {
      // If browser doesn't expose beforeinstallprompt (e.g. desktop Chrome already prompted or Firefox)
      setShowIosTutorial(true);
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100/70 border-3 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden space-y-6">
      {/* Decorative Glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-300/30 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 border-2 border-amber-500 text-amber-950 flex items-center justify-center shadow-sm shrink-0">
            <Laptop className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
              Cài Đặt App Web Toán Vui Trực Tiếp ⚡
            </h3>
            <p className="text-xs sm:text-sm font-bold text-amber-950/80 mt-0.5">
              Công nghệ Web App (PWA) cài đặt tức thì không tốn dung lượng
            </p>
          </div>
        </div>

        {/* State Badge */}
        {isStandalone || isInstalled || installSuccess ? (
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-100 border-2 border-emerald-400 text-emerald-900 font-black text-xs sm:text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Đã Cài Đặt Trên Thiết Bị Này</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleInstallClick}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-amber-950 font-black text-sm sm:text-base border-2 border-amber-500 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 select-none shrink-0"
          >
            <Download className="w-5 h-5 stroke-[2.5]" />
            <span>Cài App Web Vào Máy (0đ)</span>
          </button>
        )}
      </div>

      <p className="text-sm sm:text-base font-bold text-slate-700 leading-relaxed max-w-3xl">
        Không cần vào App Store hay Google Play! App Web cho phép bạn cài đặt biểu tượng Toán Vui trực tiếp ra{' '}
        <strong className="text-slate-900 font-black">Màn hình chính (Điện thoại/iPad)</strong> hoặc{' '}
        <strong className="text-slate-900 font-black">Desktop (Máy tính bàn/Laptop)</strong>, mở lên học ngay toàn màn
        hình mà không có thanh địa chỉ phiền toái.
      </p>

      {/* 4 Super Advantages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-3.5 rounded-2xl bg-white border border-amber-200/80 shadow-2xs space-y-1.5">
          <div className="flex items-center gap-2 text-amber-700 font-black text-xs">
            <Zap className="w-4 h-4 text-amber-600" />
            <span>Mở Ngay Trong 0.5 Giây</span>
          </div>
          <p className="text-xs font-bold text-slate-600">
            Khởi động siêu tốc, chuyển bài tập mượt mà gấp 2 lần duyệt web thông thường.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-amber-200/80 shadow-2xs space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-700 font-black text-xs">
            <HardDrive className="w-4 h-4 text-emerald-600" />
            <span>Siêu Nhẹ (&lt; 5MB)</span>
          </div>
          <p className="text-xs font-bold text-slate-600">
            Không lo đầy bộ nhớ iPad, điện thoại của ba mẹ như các app nặng hàng trăm MB.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-amber-200/80 shadow-2xs space-y-1.5">
          <div className="flex items-center gap-2 text-sky-700 font-black text-xs">
            <RefreshCw className="w-4 h-4 text-sky-600" />
            <span>Tự Động Cập Nhật</span>
          </div>
          <p className="text-xs font-bold text-slate-600">
            Mỗi khi thầy cô thêm bài học mới, app tự làm mới, không cần vào Store bấm Update.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-amber-200/80 shadow-2xs space-y-1.5">
          <div className="flex items-center gap-2 text-purple-700 font-black text-xs">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span>An Toàn &amp; Cách Ly</span>
          </div>
          <p className="text-xs font-bold text-slate-600">
            Hoạt động trong sandbox bảo mật của trình duyệt, không đòi quyền danh bạ hay vị trí.
          </p>
        </div>
      </div>

      {/* Step-by-step Tutorial if prompt is not native (Safari or manual desktop) */}
      {showIosTutorial && (
        <div className="mt-4 p-5 rounded-2xl bg-white border-2 border-amber-300 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-black text-sm sm:text-base text-slate-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600" />
              <span>Hướng Dẫn Cài Đặt Thủ Công Theo Từng Thiết Bị:</span>
            </h4>
            <button
              onClick={() => setShowIosTutorial(false)}
              className="text-xs font-black text-slate-500 hover:text-slate-800 underline"
            >
              Thu gọn
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
            {/* iPad / iPhone Safari */}
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
              <div className="font-black text-amber-950 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-amber-700" />
                <span>Dành cho iPad / iPhone (Trình duyệt Safari):</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                <li>
                  Bấm vào nút <strong className="text-slate-900 font-black">Chia sẻ (Share <Share2 className="w-3.5 h-3.5 inline text-sky-600" />)</strong> ở thanh dưới cùng hoặc góc trên Safari.
                </li>
                <li>
                  Cuộn xuống và chọn dòng <strong className="text-slate-900 font-black">&quot;Thêm vào MH chính&quot; (Add to Home Screen <PlusSquare className="w-3.5 h-3.5 inline text-amber-700" />)</strong>.
                </li>
                <li>
                  Bấm <strong className="text-slate-900 font-black">&quot;Thêm&quot; (Add)</strong> ở góc phải. Biểu tượng Toán Vui sẽ xuất hiện ngay trên màn hình iPad/iPhone!
                </li>
              </ol>
            </div>

            {/* Chrome / Edge on Windows & Mac */}
            <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200 space-y-2">
              <div className="font-black text-sky-950 flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-sky-700" />
                <span>Dành cho Máy tính bàn / Laptop (Chrome hoặc Edge):</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                <li>
                  Nhìn vào thanh địa chỉ URL ở góc trên bên phải, bấm vào biểu tượng{' '}
                  <strong className="text-slate-900 font-black">&quot;Cài đặt ứng dụng&quot; (Install <Download className="w-3.5 h-3.5 inline text-sky-600" />)</strong>.
                </li>
                <li>
                  Hoặc bấm vào menu <strong className="text-slate-900 font-black">3 dấu chấm [⋮]</strong> &rarr; Chọn{' '}
                  <strong className="text-slate-900 font-black">&quot;Lưu và chia sẻ&quot;</strong> &rarr;{' '}
                  <strong className="text-slate-900 font-black">&quot;Cài đặt Toán Vui làm ứng dụng&quot;</strong>.
                </li>
                <li>
                  App sẽ mở riêng trong một cửa sổ app độc lập và gắn biểu tượng lên Desktop / Taskbar của máy tính!
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
