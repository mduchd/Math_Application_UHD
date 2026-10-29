import React from 'react';

export interface AppLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'icon' | 'full' | 'horizontal' | 'badge';
  withSubtitle?: boolean;
  className?: string;
  showAccessories?: {
    cap?: boolean;
    glasses?: boolean;
    starAi?: boolean;
    symbols?: boolean;
  };
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 'md',
  variant = 'full',
  withSubtitle = true,
  className = '',
  showAccessories = { cap: true, glasses: true, starAi: true, symbols: true },
}) => {
  // Dimensional scale for the icon mark
  const iconDims = {
    xs: 28,
    sm: 36,
    md: 44,
    lg: 64,
    xl: 96,
    '2xl': 140,
  }[size];

  const textStyles = {
    xs: { title: 'text-sm', sub: 'text-[9px]' },
    sm: { title: 'text-base', sub: 'text-[10px]' },
    md: { title: 'text-lg md:text-xl', sub: 'text-[11px]' },
    lg: { title: 'text-2xl md:text-3xl', sub: 'text-xs' },
    xl: { title: 'text-3xl md:text-4xl', sub: 'text-sm' },
    '2xl': { title: 'text-4xl md:text-5xl', sub: 'text-base' },
  }[size];

  // SVG Icon Mark: Chunky Vector Chibi Mascot (Cú Bi Thông Thái) inside App Squircle
  const renderIconMark = () => (
    <svg
      width={iconDims}
      height={iconDims}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform hover:scale-105 select-none"
      aria-label="Logo Bé Thông Thái"
    >
      <defs>
        {/* Squircle Background Gradients */}
        <linearGradient id="logoBgGrad" x1="12" y1="12" x2="108" y2="108" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD54F" />
          <stop offset="60%" stopColor="#FFB300" />
          <stop offset="100%" stopColor="#FFA000" />
        </linearGradient>

        <linearGradient id="owlBodyGrad" x1="40" y1="45" x2="80" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="35%" stopColor="#FFE082" />
          <stop offset="100%" stopColor="#FFCA28" />
        </linearGradient>

        <linearGradient id="capGrad" x1="30" y1="20" x2="90" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        <filter id="tactileShadow" x="0" y="0" width="120" height="124" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="0" floodColor="#D99B00" floodOpacity="1" />
        </filter>
      </defs>

      {/* 1. APP SQUIRCLE FRAME (Tactile Chunky Rounded Container) */}
      <rect
        x="6"
        y="6"
        width="108"
        height="104"
        rx="28"
        fill="url(#logoBgGrad)"
        stroke="#FF8F00"
        strokeWidth="3.5"
        filter="url(#tactileShadow)"
      />

      {/* Subtle Inner Highlight on App Frame */}
      <rect
        x="9"
        y="9"
        width="102"
        height="48"
        rx="24"
        fill="#FFFFFF"
        fillOpacity="0.22"
      />

      {/* 2. BACKGROUND SYMBOLS (Math + Life Skill Heart) */}
      {showAccessories.symbols && (
        <g opacity="0.85">
          {/* Math '+' symbol (Top-left playful badge) */}
          <path
            d="M24 30H30M27 27V33"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Life Skill Heart (Bottom-right safety symbol) */}
          <path
            d="M93 87C91 85 88 86 88 88.5C88 91 93 94 93 94C93 94 98 91 98 88.5C98 86 95 85 93 87Z"
            fill="#FF5252"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Tiny spark dot */}
          <circle cx="94" cy="28" r="2.5" fill="#FFFFFF" />
        </g>
      )}

      {/* 3. MASCOT BODY (Cú Bi - Chibi Owl Shape) */}
      <g id="mascot-owl">
        {/* Outer Body Outline / Shadow layer */}
        <ellipse cx="60" cy="74" rx="36" ry="32" fill="#E65100" />
        {/* Main Body */}
        <ellipse cx="60" cy="73" rx="35" ry="31" fill="#FF9800" />

        {/* Belly Plump Patch (Creamy Yellow) */}
        <ellipse cx="60" cy="80" rx="24" ry="20" fill="url(#owlBodyGrad)" />
        {/* Belly feather marks */}
        <path d="M54 75 Q60 78 66 75" stroke="#FFA000" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M51 83 Q60 86 69 83" stroke="#FFA000" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Left Wing (Hugging body) */}
        <path
          d="M26 68 C22 76 25 89 36 88 C36 82 32 73 26 68 Z"
          fill="#FB8C00"
          stroke="#E65100"
          strokeWidth="1.5"
        />
        {/* Right Wing */}
        <path
          d="M94 68 C98 76 95 89 84 88 C84 82 88 73 94 68 Z"
          fill="#FB8C00"
          stroke="#E65100"
          strokeWidth="1.5"
        />

        {/* Feet (Orange múp míp) */}
        <ellipse cx="49" cy="100" rx="7" ry="4" fill="#E65100" />
        <ellipse cx="71" cy="100" rx="7" ry="4" fill="#E65100" />
        <ellipse cx="49" cy="99" rx="6.5" ry="3.5" fill="#FF6D00" />
        <ellipse cx="71" cy="99" rx="6.5" ry="3.5" fill="#FF6D00" />

        {/* 4. FACE & EYES (Big Chibi Expression) */}
        {/* Eye Whites */}
        <circle cx="47" cy="58" r="14" fill="#FFFFFF" stroke="#FFE082" strokeWidth="1.5" />
        <circle cx="73" cy="58" r="14" fill="#FFFFFF" stroke="#FFE082" strokeWidth="1.5" />

        {/* Eyeballs (Deep warm brown) */}
        <circle cx="48" cy="58" r="7.5" fill="#3E2723" />
        <circle cx="72" cy="58" r="7.5" fill="#3E2723" />

        {/* Eye Highlights (Super cute sparkle) */}
        <circle cx="46" cy="55.5" r="3" fill="#FFFFFF" />
        <circle cx="50" cy="61" r="1.3" fill="#FFFFFF" />
        <circle cx="70" cy="55.5" r="3" fill="#FFFFFF" />
        <circle cx="74" cy="61" r="1.3" fill="#FFFFFF" />

        {/* Rosy Cheeks */}
        <ellipse cx="35" cy="67" rx="5" ry="3" fill="#FF8A80" fillOpacity="0.85" />
        <ellipse cx="85" cy="67" rx="5" ry="3" fill="#FF8A80" fillOpacity="0.85" />

        {/* Cute Beak */}
        <polygon points="60,63 54,71 66,71" fill="#FF3D00" />
        <polygon points="60,63 56,71 64,71" fill="#FF6D00" />

        {/* 5. ITEM SLOT: GLASSES (Kính Tròn Thông Thái) */}
        {showAccessories.glasses && (
          <g id="slot-glasses">
            <circle cx="47" cy="58" r="13.5" stroke="#3E2723" strokeWidth="2.8" fill="none" />
            <circle cx="73" cy="58" r="13.5" stroke="#3E2723" strokeWidth="2.8" fill="none" />
            {/* Bridge */}
            <path d="M60.5 58 L59.5 58" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {/* 6. ITEM SLOT: GRADUATION CAP + AI STAR */}
        {showAccessories.cap && (
          <g id="slot-headwear">
            {/* Cap Base Ring */}
            <path d="M42 35 C42 41 78 41 78 35 L78 30 C78 30 60 34 42 30 Z" fill="#0284C7" />
            {/* Cap Diamond Top */}
            <polygon
              points="60,16 93,27 60,36 27,27"
              fill="url(#capGrad)"
              stroke="#0369A1"
              strokeWidth="2"
            />
            {/* Cap Button */}
            <circle cx="60" cy="26" r="3" fill="#FDE047" />
            {/* Tassel cord */}
            <path
              d="M60 26 C69 27 78 32 80 40"
              stroke="#FDE047"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            <rect x="78" y="39" width="4" height="6" rx="1.5" fill="#EAB308" />

            {/* AI Sparkle Star on Cap (Biểu tượng Công nghệ AI Dẫn lối) */}
            {showAccessories.starAi && (
              <g transform="translate(60, 16)">
                <path
                  d="M0 -7 L1.8 -2 L6.5 0 L1.8 2 L0 7 L-1.8 2 L-6.5 0 L-1.8 -2 Z"
                  fill="#FEF08A"
                  stroke="#CA8A04"
                  strokeWidth="1"
                />
                <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
              </g>
            )}
          </g>
        )}
      </g>
    </svg>
  );

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderIconMark()}
      </div>
    );
  }

  // Full combination mark (Icon + Wordmark)
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {renderIconMark()}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-tight text-slate-800 leading-none ${textStyles.title}`}
            style={{ fontFamily: 'var(--font-nunito), system-ui, sans-serif' }}
          >
            Bé Thông Thái
          </span>
          {/* AI Chip Pill */}
          <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[10px] font-black text-amber-900 leading-none">
            AI ✨
          </span>
        </div>
        {withSubtitle && (
          <span
            className={`font-extrabold text-amber-600 tracking-wider uppercase mt-1 leading-none ${textStyles.sub}`}
          >
            Toán &amp; Kỹ Năng Sống Tiểu Học
          </span>
        )}
      </div>
    </div>
  );
};
