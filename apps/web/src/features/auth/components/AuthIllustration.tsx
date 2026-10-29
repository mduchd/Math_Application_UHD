'use client';

import React from 'react';
import { m, useReducedMotion } from 'framer-motion';

export const AuthIllustration: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full aspect-[4/3] max-w-[390px] mx-auto select-none flex items-center justify-center">
      {/* Ambient background glow behind illustration */}
      <div className="absolute inset-0 bg-amber-300/30 rounded-full blur-2xl transform scale-90 -z-0 pointer-events-none" />

      {/* Floating Math & Star Badges */}
      <m.div
        animate={shouldReduceMotion ? undefined : { y: [-4, 4, -4], rotate: [-2, 2, -2] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1 left-2 sm:left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-md border-2 border-amber-300 flex items-center gap-1.5 z-20"
      >
        <span className="text-base">⭐</span>
        <span className="text-xs font-black text-amber-950">+150 Điểm</span>
      </m.div>

      <m.div
        animate={shouldReduceMotion ? undefined : { y: [4, -4, 4], rotate: [2, -2, 2] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-6 right-1 sm:right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-md border-2 border-amber-300 flex items-center gap-1.5 z-20"
      >
        <span className="text-base">🦉</span>
        <span className="text-xs font-black text-amber-950">Cú Bi Đồng Hành</span>
      </m.div>

      {/* Main SVG Composition: Study Desk with CÚ BI Mascot */}
      <svg
        viewBox="0 0 420 320"
        className="w-full h-full drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="deskGrad" x1="50" y1="200" x2="370" y2="210" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFF8E1" />
          </linearGradient>

          <linearGradient id="legGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          <linearGradient id="owlBodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFA726" />
            <stop offset="100%" stopColor="#FB8C00" />
          </linearGradient>

          <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id="innerScreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>

          <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="5" stdDeviation="3" floodColor="#78350F" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* 1. Floor Shadow */}
        <ellipse cx="210" cy="295" rx="165" ry="12" fill="#78350F" fillOpacity="0.18" />

        {/* 2. Desk Legs */}
        <rect x="75" y="210" width="10" height="80" rx="5" fill="url(#legGrad)" />
        <rect x="60" y="285" width="40" height="8" rx="4" fill="url(#legGrad)" />

        <rect x="335" y="210" width="10" height="80" rx="5" fill="url(#legGrad)" />
        <rect x="320" y="285" width="40" height="8" rx="4" fill="url(#legGrad)" />

        {/* 3. Cute Potted Plant on Floor */}
        <g transform="translate(42, 235)">
          <path d="M12 35 L28 35 L25 55 L15 55 Z" fill="#D97706" />
          <ellipse cx="20" cy="35" rx="9" ry="3" fill="#B45309" />
          {/* Leaves */}
          <path d="M20 35 C15 20, 10 22, 12 10 C18 18, 20 28, 20 35 Z" fill="#22C55E" />
          <path d="M20 35 C25 18, 30 18, 28 8 C22 17, 21 27, 20 35 Z" fill="#16A34A" />
          <ellipse cx="20" cy="18" rx="7" ry="14" fill="#4ADE80" />
        </g>

        {/* 4. Desk Surface */}
        <rect x="40" y="200" width="340" height="15" rx="7" fill="url(#deskGrad)" stroke="#FDE68A" strokeWidth="2" filter="url(#shadowFilter)" />

        {/* 5. CÚ BI (MASCOT OWL) SITTING AT THE DESK */}
        <g id="mascot-owl" transform="translate(210, 155)">
          {/* Chair backrest behind Cú Bi */}
          <rect x="-35" y="-10" width="70" height="50" rx="14" fill="#D97706" />
          <rect x="-4" y="38" width="8" height="20" rx="4" fill="#92400E" />

          {/* Cú Bi Feet peeking above/behind desk */}
          <ellipse cx="-16" cy="46" rx="8" ry="4" fill="#FF8F00" />
          <ellipse cx="16" cy="46" rx="8" ry="4" fill="#FF8F00" />

          {/* Main Owl Body */}
          <ellipse cx="0" cy="0" rx="46" ry="44" fill="url(#owlBodyGrad)" />

          {/* Left Wing resting on desk */}
          <path
            d="M-40 -6 C-52 8 -48 30 -32 26 C-30 16 -34 4 -40 -6 Z"
            fill="#FB8C00"
          />

          {/* Right Wing Waving Victory / Peace */}
          <g>
            <path
              d="M38 -12 C54 -28 66 -16 48 8 C40 4 38 -4 38 -12 Z"
              fill="#FB8C00"
            />
            {/* Cute Wing Tip waving sparkles */}
            <circle cx="56" cy="-22" r="2.5" fill="#FEF08A" />
            <circle cx="64" cy="-14" r="2" fill="#FEF08A" />
          </g>

          {/* Belly Patch with Specks */}
          <ellipse cx="0" cy="10" rx="30" ry="26" fill="#FFF8E1" />
          <path d="M-8 4 Q0 8 8 4" stroke="#FFE082" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M-12 14 Q0 18 12 14" stroke="#FFE082" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M-6 24 Q0 28 6 24" stroke="#FFE082" strokeWidth="2.5" strokeLinecap="round" />

          {/* Big Owl Eyes & Background Discs */}
          <ellipse cx="-17" cy="-16" rx="17" ry="17" fill="#FFFFFF" stroke="#FFE082" strokeWidth="2" />
          <ellipse cx="17" cy="-16" rx="17" ry="17" fill="#FFFFFF" stroke="#FFE082" strokeWidth="2" />

          {/* Big Friendly Brown Pupils */}
          <circle cx="-16" cy="-16" r="9" fill="#3E2723" />
          <circle cx="16" cy="-16" r="9" fill="#3E2723" />
          {/* Eye Highlights */}
          <circle cx="-19" cy="-19" r="3" fill="#FFFFFF" />
          <circle cx="-14" cy="-13" r="1.5" fill="#FFFFFF" />
          <circle cx="13" cy="-19" r="3" fill="#FFFFFF" />
          <circle cx="18" cy="-13" r="1.5" fill="#FFFFFF" />

          {/* Smart Round Glasses */}
          <circle cx="-17" cy="-16" r="16" fill="none" stroke="#5D4037" strokeWidth="3" />
          <circle cx="17" cy="-16" r="16" fill="none" stroke="#5D4037" strokeWidth="3" />
          <path d="M-1 -16 L1 -16" stroke="#5D4037" strokeWidth="3" strokeLinecap="round" />

          {/* Cute Orange Beak */}
          <polygon points="0,-12 -7,-3 7,-3" fill="#FF6F00" />

          {/* Rosy Cheeks */}
          <circle cx="-32" cy="-6" r="6" fill="#FF8A80" opacity="0.7" />
          <circle cx="32" cy="-6" r="6" fill="#FF8A80" opacity="0.7" />

          {/* Blue Graduation Cap on Cú Bi */}
          <polygon points="0,-58 38,-46 0,-36 -38,-46" fill="url(#capGrad)" />
          <path d="M-24,-42 L-24,-31 C-24,-24 24,-24 24,-31 L24,-42" fill="#0284C7" />
          {/* Cap Button & Golden Tassel */}
          <circle cx="0,-46" r="3" fill="#FFD54F" />
          <path d="M0,-46 C10,-45 20,-38 22,-28" stroke="#FFD54F" strokeWidth="2.5" fill="none" />
          <rect x="20" y="-29" width="4" height="6" rx="1" fill="#FFC107" />
        </g>

        {/* 6. Desktop Computer on Desk (Left side) */}
        <g id="monitor" transform="translate(85, 120)">
          {/* Stand */}
          <rect x="36" y="65" width="8" height="20" rx="3" fill="#94A3B8" />
          <ellipse cx="40" cy="85" rx="20" ry="4" fill="#64748B" />
          {/* Bezel */}
          <rect x="0" y="0" width="80" height="66" rx="8" fill="url(#screenGrad)" />
          {/* Screen Content */}
          <rect x="4" y="4" width="72" height="54" rx="5" fill="url(#innerScreen)" />
          {/* Math graph & stars on screen */}
          <circle cx="40" cy="24" r="10" fill="#FBBF24" />
          <text x="35" y="28" fill="#78350F" fontSize="11" fontWeight="bold">1+1</text>
          {/* Bar chart lines */}
          <line x1="14" y1="48" x2="66" y2="48" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" />
          <rect x="18" y="38" width="6" height="10" rx="1.5" fill="#FFFFFF" fillOpacity="0.9" />
          <rect x="28" y="30" width="6" height="18" rx="1.5" fill="#FDE047" />
          <rect x="48" y="35" width="6" height="13" rx="1.5" fill="#FFFFFF" fillOpacity="0.9" />
          <rect x="58" y="26" width="6" height="22" rx="1.5" fill="#4ADE80" />
        </g>

        {/* 7. Cute Laptop on Right of Desk */}
        <g id="laptop" transform="translate(265, 155)">
          {/* Screen */}
          <path d="M6 5 L42 2 L40 38 L4 41 Z" fill="#E2E8F0" />
          <path d="M9 7 L39 4 L38 35 L8 38 Z" fill="#F59E0B" />
          {/* Laptop Base */}
          <path d="M0 42 L42 39 L54 48 L12 51 Z" fill="#CBD5E1" />
          {/* Keyboard trace */}
          <polygon points="12,43 38,41 44,47 18,49" fill="#94A3B8" />
        </g>

        {/* 8. Sticky notes & books on the desk */}
        <rect x="150" y="204" width="14" height="12" rx="1" fill="#FEF08A" stroke="#FDE047" strokeWidth="1" transform="rotate(8 150 204)" />
        <rect x="245" y="205" width="16" height="10" rx="1" fill="#BBF7D0" stroke="#86EFAC" strokeWidth="1" transform="rotate(-6 245 205)" />
      </svg>
    </div>
  );
};
