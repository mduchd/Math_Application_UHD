import { IconBase, KID_ICON_GOLD, type KidIconProps } from './IconBase';

export const KidClassroomIcon = (props: KidIconProps) => (
  <IconBase {...props}>
    <path d="m3.6 10.1 8.4-6 8.4 6v8.1c0 1.2-1 2.2-2.2 2.2H5.8c-1.2 0-2.2-1-2.2-2.2v-8.1Z" fill={KID_ICON_GOLD} />
    <path d="M8.4 20.4v-5.2h7.2v5.2M8 10.9h.01M16 10.9h.01" />
  </IconBase>
);

export const KidStudentsIcon = (props: KidIconProps) => (
  <IconBase {...props}>
    <circle cx="9" cy="8" r="3.1" fill={KID_ICON_GOLD} />
    <path d="M3.7 20c.7-3.9 2.5-5.9 5.3-5.9s4.6 2 5.3 5.9M16.8 7.4a2.7 2.7 0 0 1 0 5.2M16.2 14.2c2.1.8 3.4 2.7 3.8 5.8" />
  </IconBase>
);

export const KidAssessmentIcon = (props: KidIconProps) => (
  <IconBase {...props}>
    <rect x="5.2" y="4.1" width="13.6" height="16.6" rx="2.6" fill={KID_ICON_GOLD} />
    <path d="M9 4.1h6v2.2H9z" fill="currentColor" />
    <path d="m8.7 13.2 1.8 1.8 4.8-4.8M8.7 17.3h6.6" />
  </IconBase>
);

export const KidPlanIcon = (props: KidIconProps) => (
  <IconBase {...props}>
    <rect x="4" y="5.5" width="16" height="14.5" rx="2.8" fill={KID_ICON_GOLD} />
    <path d="M8 3.8v3.4M16 3.8v3.4M4 10h16" />
    <path d="m8.5 15.2 2.1 2.1 4.9-4.9" />
  </IconBase>
);

export const KidLearnIcon = (props: KidIconProps) => (
  <IconBase {...props}>
    <path d="M12 6.4C9.8 4.7 6.4 4.5 3.8 5.9v12.3c2.7-1.3 6.1-1.1 8.2.6 2.1-1.7 5.5-1.9 8.2-.6V5.9c-2.6-1.4-6-1.2-8.2.5Z" fill={KID_ICON_GOLD} />
    <path d="M12 6.4v12.4M7 9.4h1.7M15.3 9.4H17" />
  </IconBase>
);

export const KidLessonIcon = (props: KidIconProps) => (
  <IconBase {...props}>
    <path d="m3.8 9.2 8.2-4.3 8.2 4.3-8.2 4.3-8.2-4.3Z" fill={KID_ICON_GOLD} />
    <path d="M7.2 11v4.4c2.8 2.2 6.8 2.2 9.6 0V11M20.2 9.2v5" />
  </IconBase>
);

export const KidLifeSkillsIcon = (props: KidIconProps) => (
  <IconBase {...props}>
    <path d="M12 20.2S5 16.4 5 10.7c0-2.4 1.7-4.1 4-4.1 1.3 0 2.4.6 3 1.7.6-1.1 1.7-1.7 3-1.7 2.3 0 4 1.7 4 4.1 0 5.7-7 9.5-7 9.5Z" fill={KID_ICON_GOLD} />
    <path d="M8.4 12.6 10.5 14l4.8-4.8" />
  </IconBase>
);

export const KidAnalyticsIcon = (props: KidIconProps) => (
  <IconBase {...props}>
    <path d="M4.3 20V10.8h3V20M10.3 20V4.5h3V20M16.3 20v-7.1h3V20" fill={KID_ICON_GOLD} />
    <path d="m4.3 8.4 5.9-4 6.1 6.1 3.4-3.1" />
    <path d="M17.4 7.4h2.3v2.3" />
  </IconBase>
);
