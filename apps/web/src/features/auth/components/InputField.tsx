'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  isPassword?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  error,
  isPassword = false,
  type = 'text',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const actualType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-black text-slate-800 flex items-center gap-1.5">
          {icon && <span>{icon}</span>}
          <span>{label}</span>
        </label>
      )}

      <div className="relative flex items-center">
        <input
          type={actualType}
          className={`w-full px-4 py-3 sm:py-3.5 rounded-2xl border-2 transition-all duration-200 text-sm font-bold placeholder:text-slate-400 placeholder:font-semibold focus:outline-none ${
            error
              ? 'border-rose-400 bg-rose-50/40 text-rose-900 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
              : 'border-slate-200 bg-slate-50/80 text-slate-800 hover:border-amber-300 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/20'
          } ${isPassword ? 'pr-11' : ''} ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 p-1 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200/50 transition-colors focus:outline-none"
            title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs font-bold text-rose-600 mt-1 pl-1">
          {error}
        </p>
      )}
    </div>
  );
};
