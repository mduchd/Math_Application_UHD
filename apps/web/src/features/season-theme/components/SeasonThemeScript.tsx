import React from 'react';

/**
 * Inline script to prevent theme flash (FOUC) by synchronously setting
 * the [data-season] attribute before React hydrations.
 */
export const SeasonThemeScript: React.FC = () => {
  const scriptContent = `
    (function() {
      try {
        var mode = localStorage.getItem('kid_season_mode') || 'auto';
        var storedSeason = localStorage.getItem('kid_season_theme');
        var season = 'spring';

        if (mode === 'manual' && storedSeason && ['spring', 'summer', 'autumn', 'winter'].indexOf(storedSeason) !== -1) {
          season = storedSeason;
        } else {
          var month = new Date().getMonth() + 1;
          if (month >= 2 && month <= 4) season = 'spring';
          else if (month >= 5 && month <= 7) season = 'summer';
          else if (month >= 8 && month <= 10) season = 'autumn';
          else season = 'winter';
        }

        document.documentElement.setAttribute('data-season', season);
      } catch (e) {
        document.documentElement.setAttribute('data-season', 'spring');
      }
    })();
  `;

  return (
    <script
      id="season-theme-script"
      dangerouslySetInnerHTML={{ __html: scriptContent }}
    />
  );
};
