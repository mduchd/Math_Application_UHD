import { IconBase, KID_ICON_GOLD, type KidIconProps } from './IconBase';

export const KidProfileIcon = (props: KidIconProps) => (
  <IconBase {...props}>
    <circle cx="12" cy="8" r="4.1" fill={KID_ICON_GOLD} />
    <path d="M4.1 20.1c.8-4.1 3.6-6.1 7.9-6.1s7.1 2 7.9 6.1" />
  </IconBase>
);

export const KidSettingsIcon = (props: KidIconProps) => (
  <IconBase {...props} strokeWidth="2.05">
    <path d="m12 3 1.1 2.2 2.4.5 1.7-1.6 2 2-1.6 1.7.5 2.4L21 11.3v2.8l-2.4 1.1-.5 2.4 1.6 1.7-2 2-1.7-1.6-2.4.5L12 21l-1.1-2.2-2.4-.5-1.7 1.6-2-2 1.6-1.7-.5-2.4L3 14.1v-2.8l2.4-1.1.5-2.4L4.3 6l2-2L8 5.7l2.4-.5L12 3Z" fill={KID_ICON_GOLD} />
    <circle cx="12" cy="12.7" r="3.1" strokeWidth="2.25" />
  </IconBase>
);

export const KidLoginIcon = (props: KidIconProps) => (
  <IconBase {...props}>
    <path d="M13.2 5.2h4.3a1.8 1.8 0 0 1 1.8 1.8V17a1.8 1.8 0 0 1-1.8 1.8h-4.3" />
    <path d="M11.5 8.1 15.4 12l-3.9 3.9M15.2 12H4.7" />
  </IconBase>
);

export const KidLogoutIcon = (props: KidIconProps) => (
  <IconBase {...props}>
    <path d="M10.8 5.2H6.5A1.8 1.8 0 0 0 4.7 7V17a1.8 1.8 0 0 0 1.8 1.8h4.3" />
    <path d="m12.5 8.1 3.9 3.9-3.9 3.9M4.8 12h10.5" />
  </IconBase>
);
