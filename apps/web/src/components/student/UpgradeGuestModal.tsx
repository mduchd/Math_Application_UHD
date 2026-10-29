'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, KeyRound, User, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { upgradeGuest } from '@/lib/api';
import { TactileButton } from '@/components/kid/TactileButton';
import { sound } from '@/lib/sound';
import { MotionDialog } from '@/components/motion/MotionDialog';

const MASCOTS = [
  { id: 'owl', icon: '🦉', label: 'Cú Thông Thái' },
  { id: 'bear', icon: '🐻', label: 'Gấu Chăm Chỉ' },
  { id: 'rabbit', icon: '🐰', label: 'Thỏ Nhanh Nhẹn' },
  { id: 'lion', icon: '🦁', label: 'Sư Tử Dũng Cảm' },
  { id: 'panda', icon: '🐼', label: 'Trúc Vui Vẻ' },
];

interface UpgradeGuestModalProps {
  open: boolean;
  onClose: () => void;
}

export const UpgradeGuestModal: React.FC<UpgradeGuestModalProps> = ({ open, onClose }) => {
  const currentUser = useAppStore((state) => state.currentUser);
  const setUser = useAppStore((state) => state.setUser);

  const [fullName, setFullName] = useState('');
  const [selectedMascot, setSelectedMascot] = useState('owl');
  const [pin, setPin] = useState('');
  const [gradeLevel, setGradeLevel] = useState(3);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.fullName && !currentUser.fullName.startsWith('Bé Khám Phá')) {
        setFullName(currentUser.fullName);
      }
      if (currentUser.gradeLevel) {
        setGradeLevel(currentUser.gradeLevel);
      }
      const matchedMascot = MASCOTS.find((m) => m.icon === currentUser.avatarMascot);
      if (matchedMascot) {
        setSelectedMascot(matchedMascot.id);
      }
    }
  }, [currentUser, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedName = fullName.trim();
    if (!trimmedName) {
      setError('Bé hãy nhập tên của mình nhé!');
      return;
    }
    if (pin.length < 4) {
      setError('Mã PIN bí mật cần có ít nhất 4 chữ số (ví dụ: 1234)!');
      return;
    }

    setIsSaving(true);
    try {
      const mascotObj = MASCOTS.find((m) => m.id === selectedMascot);
      const res = await upgradeGuest({
        fullName: trimmedName,
        pin,
        avatarMascot: mascotObj?.icon || '🦉',
        gradeLevel,
      });

      setUser(res.user);
      setIsSuccess(true);
      sound.playCelebration();
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1600);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Không thể lưu tài khoản. Bé hãy thử lại nhé!';
      setError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MotionDialog
      open={open}
      onClose={onClose}
      ariaLabel="Lưu tiến trình học tập của bé"
      panelClassName="bg-white rounded-4xl max-w-lg w-full p-6 md:p-8 shadow-2xl border-2 border-kid-border relative"
    >
      {isSuccess ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-4xl shadow-inner">
            🎉
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-2xl md:text-3xl font-black text-slate-800">
              Lưu Tài Khoản Thành Công!
            </h2>
            <p className="text-slate-700 text-sm md:text-base font-bold">
              Từ nay bé có thể đăng nhập bằng tên <span className="text-amber-800 font-black">{fullName}</span> và mã PIN vừa tạo bất cứ lúc nào!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Nút đóng */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black flex items-center justify-center text-sm cursor-pointer"
          >
            ✕
          </button>

          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-xs">
              <ShieldCheck className="w-8 h-8 text-amber-700" />
            </div>
            <h2 className="font-display text-2xl font-black text-slate-800">
              Lưu Tiến Trình Học Tập Của Bé
            </h2>
            <p className="text-slate-700 text-sm font-bold max-w-sm mx-auto">
              Tạo mã PIN 4 số để bảo lưu số sao, cúp vàng và bài làm khi học trên mọi thiết bị!
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs md:text-sm font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Tên học sinh */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wide">
                Tên hoặc Tên đăng nhập của bé:
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Ví dụ: Minh Khôi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-slate-300 rounded-2xl text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all"
                  required
                />
              </div>
            </div>

            {/* Mã PIN bí mật */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wide">
                Mã PIN bí mật (4 - 6 số):
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-purple-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Ví dụ: 1234"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-slate-300 rounded-2xl text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all"
                  required
                />
              </div>
              <p className="text-xs font-semibold text-slate-600">
                💡 Bé nhớ ghi nhớ mã PIN này để đăng nhập vào lần học sau nhé!
              </p>
            </div>

            {/* Chọn khối lớp */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wide">
                Bé đang học lớp mấy?
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setGradeLevel(lvl);
                    }}
                    className={`py-2 rounded-2xl border-2 text-xs md:text-sm font-black transition-all cursor-pointer ${
                      gradeLevel === lvl
                        ? 'border-amber-500 bg-amber-400 text-amber-950 shadow-tactile-yellow'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    Lớp {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Chọn Linh vật đồng hành */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wide">
                Chọn linh vật yêu thích:
              </label>
              <div className="grid grid-cols-5 gap-2">
                {MASCOTS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setSelectedMascot(m.id);
                    }}
                    className={`p-2.5 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      selectedMascot === m.id
                        ? 'border-amber-500 bg-amber-100 shadow-xs scale-105'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="text-2xl">{m.icon}</span>
                    <span className="text-[10px] font-bold text-slate-800 truncate w-full text-center">
                      {m.label.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Nút Submit */}
            <div className="pt-2">
              <TactileButton
                type="submit"
                variant="yellow"
                size="lg"
                isLoading={isSaving}
                loadingText="Đang lưu tài khoản..."
                className="w-full flex items-center justify-center gap-2"
              >
                <span>Lưu Tài Khoản Ngay</span>
                <ArrowRight className="w-4 h-4 text-amber-950" />
              </TactileButton>
            </div>
          </form>
        </div>
      )}
    </MotionDialog>
  );
};
