export type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter';
export type SeasonMode = 'auto' | 'manual';

export interface SeasonInfo {
  id: SeasonId;
  name: string;
  englishName: string;
  emoji: string;
  secondaryEmoji: string;
  tagline: string;
  description: string;
  monthsText: string;
  months: number[];
  colors: {
    primary: string;
    primaryDeep: string;
    accent: string;
    accentDeep: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    bg: string;
    surface: string;
    border: string;
    glow: string;
  };
  mascotAccessory: {
    name: string;
    icon: string;
    description: string;
  };
  greeting: string;
}
