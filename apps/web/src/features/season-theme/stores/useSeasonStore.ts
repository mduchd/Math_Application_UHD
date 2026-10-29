import { create } from 'zustand';
import { SeasonId, SeasonMode } from '../types';
import { getSeasonByMonth, SEASONS } from '../constants/seasons';
import { sound } from '@/lib/sound';

interface SeasonState {
  season: SeasonId;
  mode: SeasonMode;
  effectsEnabled: boolean;
  isHydrated: boolean;
  setSeason: (season: SeasonId, playSound?: boolean) => void;
  setMode: (mode: SeasonMode) => void;
  setEffectsEnabled: (enabled: boolean) => void;
  hydrate: () => void;
}

const STORAGE_KEY_SEASON = 'kid_season_theme';
const STORAGE_KEY_MODE = 'kid_season_mode';
const STORAGE_KEY_EFFECTS = 'kid_season_effects';

const applySeasonToDOM = (season: SeasonId) => {
  // Scoped inside app containers; clean up documentElement to keep landing page pristine
  if (typeof document !== 'undefined') {
    document.documentElement.removeAttribute('data-season');
  }
};

export const useSeasonStore = create<SeasonState>((set, get) => ({
  season: 'spring',
  mode: 'auto',
  effectsEnabled: true,
  isHydrated: false,

  hydrate: () => {
    if (typeof window === 'undefined') return;

    try {
      const storedMode = (localStorage.getItem(STORAGE_KEY_MODE) as SeasonMode) || 'auto';
      const storedSeason = localStorage.getItem(STORAGE_KEY_SEASON) as SeasonId | null;
      const storedEffects = localStorage.getItem(STORAGE_KEY_EFFECTS);

      // Auto season based on actual month
      const currentMonth = new Date().getMonth() + 1;
      const autoSeason = getSeasonByMonth(currentMonth);

      let effectiveSeason: SeasonId = autoSeason;

      if (storedMode === 'manual' && storedSeason && SEASONS[storedSeason]) {
        effectiveSeason = storedSeason;
      } else {
        effectiveSeason = autoSeason;
      }

      // Check prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const effectsEnabled = storedEffects !== null ? storedEffects === 'true' : !prefersReducedMotion;

      applySeasonToDOM(effectiveSeason);

      set({
        season: effectiveSeason,
        mode: storedMode,
        effectsEnabled,
        isHydrated: true,
      });
    } catch {
      set({ isHydrated: true });
    }
  },

  setSeason: (season: SeasonId, playSound = true) => {
    if (!SEASONS[season]) return;

    set({ season, mode: 'manual' });
    applySeasonToDOM(season);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_SEASON, season);
        localStorage.setItem(STORAGE_KEY_MODE, 'manual');
      } catch {}
    }

    if (playSound) {
      sound.playSeasonSwitch(season);
    }
  },

  setMode: (mode: SeasonMode) => {
    let newSeason = get().season;

    if (mode === 'auto') {
      const currentMonth = new Date().getMonth() + 1;
      newSeason = getSeasonByMonth(currentMonth);
      applySeasonToDOM(newSeason);
    }

    set({ mode, season: newSeason });

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_MODE, mode);
        if (mode === 'auto') {
          localStorage.removeItem(STORAGE_KEY_SEASON);
        }
      } catch {}
    }

    sound.playPop();
  },

  setEffectsEnabled: (enabled: boolean) => {
    set({ effectsEnabled: enabled });

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_EFFECTS, String(enabled));
      } catch {}
    }

    sound.playPop();
  },
}));
