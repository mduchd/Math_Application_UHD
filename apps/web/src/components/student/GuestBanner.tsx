'use client';

import React, { useState } from 'react';
import { Sparkles, ShieldAlert, KeyRound, X, ChevronRight } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { UpgradeGuestModal } from './UpgradeGuestModal';
import { sound } from '@/lib/sound';

export const GuestBanner: React.FC = () => {
  const currentUser = useAppStore((state) => state.currentUser);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Chỉ hiển thị khi là tài khoản khách và chưa dismiss
  if (!currentUser?.isGuest || isDismissed) {
    return null;
  }

  const handleOpenUpgrade = () => {
    sound.playPop();
    setShowUpgradeModal(true);
  };

  const handleDismiss = () => {
    sound.playPop();
    setIsDismissed(true);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 border-b-2 border-amber-500/30 text-amber-950 px-4 py-2.5 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          {/* Thông tin thông báo */}
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-xl bg-amber-500/20 text-base shrink-0">
              🎮
            </span>
            <p className="text-xs sm:text-sm font-bold text-amber-950">
              Bé đang học ở <strong className="font-black text-amber-950">Chế độ Khách</strong>. Hãy lưu mã PIN để không bị mất số sao và huy hiệu khi đổi máy nhé!
            </p>
          </div>

          {/* Hành động */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleOpenUpgrade}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Lưu tài khoản</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleDismiss}
              title="Tạm ẩn"
              className="p-1 text-amber-900 hover:text-amber-950 rounded-full hover:bg-amber-500/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <UpgradeGuestModal
        open={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  );
};
