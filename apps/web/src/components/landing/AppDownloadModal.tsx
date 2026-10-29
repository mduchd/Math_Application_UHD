'use client';

import React, { useState } from 'react';
import {
  X,
  Monitor,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Apple,
  CheckCircle2,
} from 'lucide-react';
import { MotionDialog } from '@/components/motion/MotionDialog';
import { AppLogo } from '@/components/kid/AppLogo';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { sound } from '@/lib/sound';

interface AppDownloadModalProps {
  open: boolean;
  onClose: () => void;
}

type DesktopPlatform = 'windows' | 'mac' | 'school' | 'pwa';

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState<DesktopPlatform>('windows');
  const [copied, setCopied] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const { canInstall, isInstalled, installApp } = usePwaInstall();

  const desktopFiles = {
    windows: {
      fileName: 'ToanVui-Desktop-Setup-v2.4.0.exe',
      size: '34.8 MB',
      type: 'Bộ Cài Đặt Windows (.exe - 64-bit)',
      os: 'Windows 10, Windows 11 (Tất cả phiên bản)',
      url: 'https://download.toanvui.vn/desktop/windows/ToanVui-Desktop-Setup-v2.4.0.exe',
      instructions: [
        'Tải file ToanVui-Desktop-Setup-v2.4.0.exe về máy tính.',
        'Mở file vừa tải về và bấm "Cài đặt" (Installation).',
        'Biểu tượng Cú Vàng sẽ xuất hiện ngay trên màn hình Desktop của bạn!',
      ],
    },
    mac: {
      fileName: 'ToanVui-Desktop-v2.4.0.dmg',
      size: '41.2 MB',
      type: 'Tệp Hình Ảnh Đĩa macOS (.dmg)',
      os: 'macOS 11.0 Big Sur trở lên (Hỗ trợ Apple M1/M2/M3 & Intel)',
      url: 'https://download.toanvui.vn/desktop/mac/ToanVui-Desktop-v2.4.0.dmg',
      instructions: [
        'Tải file ToanVui-Desktop-v2.4.0.dmg về máy Mac.',
        'Kéo biểu tượng Toán Vui vào thư mục Applications (Ứng dụng).',
        'Mở Launchpad và khởi chạy Toán Vui để bé bắt đầu học!',
      ],
    },
    school: {
      fileName: 'ToanVui-School-Lab-Silent-Setup-v2.4.0.msi',
      size: '32.5 MB',
      type: 'Gói Cài Đặt Hàng Loạt Phòng Máy (.msi)',
      os: 'Windows Server, Windows 10/11 Pro/Edu (Active Directory / GPO)',
      url: 'https://download.toanvui.vn/desktop/school/ToanVui-School-Lab-Silent-Setup-v2.4.0.msi',
      instructions: [
        'Dùng cho quản trị viên tin học trường học triển khai qua Group Policy (GPO).',
        'Chạy lệnh cài đặt im lặng: msiexec /i ToanVui-School.msi /qn',
        'Tự động kết nối máy chủ quản lý điểm số của nhà trường.',
      ],
    },
    pwa: {
      fileName: 'PWA Web Desktop App',
      size: '< 2 MB',
      type: 'Ứng Dụng Chrome / Edge Desktop Trực Tiếp',
      os: 'Mọi máy tính có cài Google Chrome, Microsoft Edge hoặc Cốc Cốc',
      url: 'https://toanvui.vn',
      instructions: [
        'Nhìn lên thanh địa chỉ trình duyệt ở góc trên bên phải.',
        'Bấm vào nút "Cài đặt ứng dụng Toán Vui" (Biểu tượng máy tính có mũi tên xuống).',
        'Phần mềm sẽ mở ra dưới dạng cửa sổ độc lập như một app máy tính thực thụ!',
      ],
    },
  };

  const currentInfo = desktopFiles[activeTab];

  const handleTriggerDownload = () => {
    sound.playPop();
    setDownloadStarted(true);
    setTimeout(() => {
      sound.playSuccess();
    }, 800);
    setTimeout(() => {
      setDownloadStarted(false);
    }, 4000);
  };

  const handleCopyLink = () => {
    sound.playPop();
    navigator.clipboard.writeText(currentInfo.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <MotionDialog
      open={open}
      onClose={onClose}
      ariaLabel="Tải ứng dụng Toán Vui cho máy tính bàn và laptop"
      panelClassName="relative w-full max-w-2xl bg-white border-4 border-amber-300 rounded-4xl shadow-2xl overflow-hidden p-6 sm:p-8"
    >
      {/* Close Button */}
      <button
        onClick={() => {
          sound.playPop();
          onClose();
        }}
        className="absolute top-4 right-4 p-2 rounded-2xl bg-amber-100 text-amber-950 hover:bg-amber-200 transition-colors z-20"
        aria-label="Đóng cửa sổ"
      >
        <X className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Header */}
      <div className="flex items-center gap-3.5 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-white shrink-0 shadow-md">
          <Monitor className="w-6 h-6 text-amber-400 stroke-[2.2]" />
        </div>
        <div>
          <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
            Trung Tâm Tải Ứng Dụng Máy Tính
          </h3>
          <p className="text-xs sm:text-sm font-bold text-slate-700 mt-0.5">
            Dành cho Laptop, PC gia đình, phòng máy tin học &amp; bảng tương tác trường học
          </p>
        </div>
      </div>

      {/* Desktop Platform Switcher Tabs */}
      <div className="grid grid-cols-4 gap-1.5 bg-slate-100 p-1.5 rounded-2xl mb-6">
        <button
          type="button"
          onClick={() => {
            sound.playPop();
            setActiveTab('windows');
          }}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
            activeTab === 'windows'
              ? 'bg-white text-slate-950 shadow-md font-black scale-[1.02]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {/* Windows icon */}
          <svg className="w-4 h-4 text-sky-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801" />
          </svg>
          <span>Windows (.exe)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playPop();
            setActiveTab('mac');
          }}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
            activeTab === 'mac'
              ? 'bg-white text-slate-950 shadow-md font-black scale-[1.02]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Apple className="w-4 h-4 text-slate-900 shrink-0" />
          <span>macOS (.dmg)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playPop();
            setActiveTab('school');
          }}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
            activeTab === 'school'
              ? 'bg-white text-slate-950 shadow-md font-black scale-[1.02]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Trường Học (.msi)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playPop();
            setActiveTab('pwa');
          }}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
            activeTab === 'pwa'
              ? 'bg-white text-slate-950 shadow-md font-black scale-[1.02]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Web Desktop</span>
        </button>
      </div>

      {/* Main Download Card Details */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-200">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-800">
              {currentInfo.type}
            </div>
            <h4 className="font-display font-black text-lg sm:text-xl text-slate-900 mt-0.5">
              {currentInfo.fileName}
            </h4>
            <div className="text-xs font-bold text-slate-600 mt-1">
              Hệ điều hành: <strong className="text-slate-900 font-extrabold">{currentInfo.os}</strong>
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="inline-block px-3 py-1 bg-white border border-amber-300 rounded-xl text-xs font-black text-amber-950 shadow-2xs">
              Dung lượng: {currentInfo.size}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {activeTab === 'pwa' && canInstall && !isInstalled ? (
            <button
              type="button"
              onClick={async () => {
                sound.playPop();
                const ok = await installApp();
                if (ok) {
                  sound.playSuccess();
                  onClose();
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm border-2 border-amber-500 shadow-md transition-all active:translate-y-0.5"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Cài Đặt Web App Desktop Ngay</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleTriggerDownload}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-black text-sm shadow-md transition-all active:translate-y-0.5 border border-slate-900"
            >
              <Download className="w-4 h-4 text-amber-400 stroke-[2.5]" />
              <span>{downloadStarted ? 'Đang Bắt Đầu Tải...' : `Tải Xuống Ngay (${currentInfo.size})`}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border-2 border-slate-300 transition-all shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-black">Đã chép link tải!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600" />
                <span>Sao chép link tải</span>
              </>
            )}
          </button>
        </div>

        {/* Download notification */}
        {downloadStarted && (
          <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-black text-emerald-900 flex items-center gap-2 animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Trình duyệt đang tải tệp tin {currentInfo.fileName} về máy của bạn!</span>
          </div>
        )}

        {/* 3 Step Instructions */}
        <div className="bg-white/80 rounded-2xl p-4 border border-amber-200/80 space-y-2">
          <div className="text-xs font-black uppercase text-amber-900">
            Hướng Dẫn Cài Đặt Nhanh 3 Bước:
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-xs font-bold text-slate-700 leading-relaxed">
            {currentInfo.instructions.map((step, idx) => (
              <li key={idx}>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Safety & Developer Architecture Footer */}
      <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-700">
        <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Cam kết chữ ký số an toàn (Code-Signed), không chứa phần mềm lạ</span>
        </div>
        <div className="text-slate-600">
          Bản phát hành chính thức: <strong className="text-slate-900 font-black">v2.4.0 Desktop</strong>
        </div>
      </div>
    </MotionDialog>
  );
};
