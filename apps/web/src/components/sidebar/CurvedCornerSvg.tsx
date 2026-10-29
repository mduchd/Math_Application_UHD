'use client';

import React from 'react';

interface CurvedCornerSvgProps {
  position: 'top' | 'bottom';
  className?: string;
}

/**
 * Renders the signature concave fillet (reverse rounded corner)
 * that seamlessly merges the active sidebar tab into the canvas background.
 */
export const CurvedCornerSvg: React.FC<CurvedCornerSvgProps> = ({
  position,
  className = '',
}) => {
  if (position === 'top') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`w-6 h-6 absolute right-0 -top-6 pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        {/* Top concave fillet: fills bottom-right, smooth tangential arc from (0,24) to (24,0) */}
        <path d="M24 0 V24 H0 C13.255 24 24 13.255 24 0 Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-6 h-6 absolute right-0 -bottom-6 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Bottom concave fillet: fills top-right, smooth tangential arc from (24,24) to (0,0) */}
      <path d="M0 0 H24 V24 C24 10.745 13.255 0 0 0 Z" />
    </svg>
  );
};
