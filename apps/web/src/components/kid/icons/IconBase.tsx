import type { PropsWithChildren, SVGProps } from 'react';

export type KidIconProps = SVGProps<SVGSVGElement>;

export const KID_ICON_GOLD = 'var(--kid-icon-gold, #FFCA28)';

export const IconBase = ({ children, ...props }: PropsWithChildren<KidIconProps>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    {children}
  </svg>
);
