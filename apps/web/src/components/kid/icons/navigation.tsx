import { IconBase, KID_ICON_GOLD, type KidIconProps } from './IconBase';

export const KidHomeIcon = (props: KidIconProps) => (
  <IconBase {...props}>
    <path d="M3.5 10.6 12 3.7l8.5 6.9v8.2a2.2 2.2 0 0 1-2.2 2.2H5.7a2.2 2.2 0 0 1-2.2-2.2v-8.2Z" fill={KID_ICON_GOLD} />
    <path d="M9.2 21v-5.1a2.8 2.8 0 0 1 5.6 0V21" />
  </IconBase>
);

export const KidSearchIcon = (props: KidIconProps) => (
  <IconBase {...props}>
    <circle cx="10.5" cy="10.5" r="6.5" fill={KID_ICON_GOLD} />
    <path d="m15.3 15.3 5.2 5.2" />
    <path d="M8.2 10.5a2.3 2.3 0 0 1 2.3-2.3" />
  </IconBase>
);

export const KidGamesIcon = (props: KidIconProps) => (
  <IconBase {...props}>
    <path d="M7.4 8.4h9.2c2.3 0 3.1 1.7 3.7 4.3l.5 2.2c.5 2.2-1.8 3.7-3.6 2.3l-2.2-1.7H9l-2.2 1.7c-1.8 1.4-4.1-.1-3.6-2.3l.5-2.2c.6-2.6 1.4-4.3 3.7-4.3Z" fill={KID_ICON_GOLD} />
    <path d="M7.2 12.2v3M5.7 13.7h3M16.3 12.8h.01M18.2 14.7h.01" />
    <path d="M12 11.8c.9 0 1.5.9 1.5 1.6 0 .9-.9 1.6-1.5 2.1-.6-.5-1.5-1.2-1.5-2.1 0-.7.6-1.6 1.5-1.6Z" fill="currentColor" />
  </IconBase>
);

export const KidChevronLeftIcon = (props: KidIconProps) => (
  <IconBase {...props}>
    <path d="m14.8 4.8-7.1 7.2 7.1 7.2" />
  </IconBase>
);

export const KidChevronRightIcon = (props: KidIconProps) => (
  <IconBase {...props}>
    <path d="m9.2 4.8 7.1 7.2-7.1 7.2" />
  </IconBase>
);
