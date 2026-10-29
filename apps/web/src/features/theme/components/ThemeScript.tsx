import React from 'react';

/**
 * Inline script to prevent theme flash (FOUC) by synchronously setting
 * the class "dark" and [data-theme] on <html> before React hydration.
 */
export const ThemeScript: React.FC = () => {
  const scriptContent = `
    (function() {
      try {
        var stored = localStorage.getItem('kid_app_theme');
        var isDark = false;
        if (stored === 'dark') {
          isDark = true;
        } else if (stored === 'light') {
          isDark = false;
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          isDark = true;
        }
        if (isDark) {
          document.documentElement.classList.add('dark');
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.setAttribute('data-theme', 'light');
        }
      } catch (e) {}
    })();
  `;

  return (
    <script
      id="theme-script"
      dangerouslySetInnerHTML={{ __html: scriptContent }}
    />
  );
};
