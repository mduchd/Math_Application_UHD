/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './apps/web/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
      },
      fontFamily: {
        // The same complete Vietnamese family is used for text and headings,
        // so accented letters never fall back to a mismatched typeface.
        display: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
        body: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },
      colors: {
        kid: {
          cream: '#FDFBF7',
          card: '#FFFFFF',
          border: '#EFE7DA',
          surface: '#F8F4EC',
          // Vibrant playful tones with matching 3D shadow depths
          yellow: '#FFCA28',
          'yellow-deep': '#D99B00',
          green: '#22C55E',
          'green-deep': '#15803D',
          orange: '#FF7043',
          'orange-deep': '#D84315',
          blue: '#38BDF8',
          'blue-deep': '#0284C7',
          purple: '#AB47BC',
          'purple-deep': '#7B1FA2',
          coral: '#FF5252',
          'coral-deep': '#D32F2F',
          dark: '#2D3748',
          muted: '#718096',
        },
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'tactile-yellow': '0 4px 0 0 #D99B00',
        'tactile-green': '0 4px 0 0 #15803D',
        'tactile-orange': '0 4px 0 0 #D84315',
        'tactile-blue': '0 4px 0 0 #0284C7',
        'tactile-purple': '0 4px 0 0 #7B1FA2',
        'tactile-coral': '0 4px 0 0 #D32F2F',
        'tactile-white': '0 4px 0 0 #E2D9CC',
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
