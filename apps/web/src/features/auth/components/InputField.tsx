'use client';

import React, { useId, useState } from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isPassword?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  isPassword = false,
  type = 'text',
  className = '',
  id: providedId,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = useId();
  const inputId = providedId ?? generatedId;
  const actualType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-black text-slate-800">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          id={inputId}
          type={actualType}
          className={`w-full px-4 py-3 sm:py-3.5 rounded-2xl border-2 transition-all duration-200 text-sm font-bold placeholder:text-slate-700 placeholder:font-semibold focus:outline-none ${
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
            className="absolute right-2 flex size-11 items-center justify-center rounded-xl text-sm font-extrabold text-slate-700 transition-colors hover:bg-slate-200 hover:text-slate-900 focus:outline-none"
            title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            {showPassword ? 'Ẩn' : 'Hiện'}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1 pl-1 text-sm font-bold text-rose-700">
          {error}
        </p>
      )}
    </div>
  );
};
