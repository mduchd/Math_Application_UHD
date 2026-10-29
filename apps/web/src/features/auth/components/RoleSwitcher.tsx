'use client';

import React from 'react';
import { m } from 'framer-motion';
import { sound } from '@/lib/sound';
import { AuthRole } from '../types';

interface RoleSwitcherProps {
  role: AuthRole;
  onChange: (newRole: AuthRole) => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ role, onChange }) => {
  const handleSelect = (selectedRole: AuthRole) => {
    if (selectedRole !== role) {
      sound.playPop();
      onChange(selectedRole);
    }
  };

  return (
    <div className="relative p-1.5 bg-amber-50 rounded-2xl grid grid-cols-2 gap-1.5 select-none border-2 border-amber-200/80">
      <button
        type="button"
        onClick={() => handleSelect('student')}
        className={`relative z-10 py-2.5 px-3 rounded-xl font-display font-black text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 ${
          role === 'student' ? 'text-amber-950 font-black' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <span>🎒</span>
        <span>Học Sinh</span>
      </button>

      <button
        type="button"
        onClick={() => handleSelect('teacher')}
        className={`relative z-10 py-2.5 px-3 rounded-xl font-display font-black text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 ${
          role === 'teacher' ? 'text-amber-950 font-black' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <span>👩‍🏫</span>
        <span>Giáo Viên</span>
      </button>

      {/* Animated pill background indicator in tactile yellow */}
      <m.div
        layout
        className="absolute inset-y-1.5 rounded-xl bg-amber-400 shadow-sm border border-amber-500/80"
        style={{
          left: role === 'student' ? '6px' : '50%',
          right: role === 'student' ? '50%' : '6px',
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
      />
    </div>
  );
};
