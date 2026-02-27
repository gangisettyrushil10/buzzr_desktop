import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './__tests__/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Buzzr main palette (dark mode by default)
        buzzr: {
          background: '#253237',
          surface: '#5c6b73',
          surfaceElevated: 'rgba(157, 180, 192, 0.32)',
          text: '#e0fbfc',
          textMuted: '#c2dfe3',
          border: 'rgba(157, 180, 192, 0.9)',
          accent: '#c2dfe3'
        },
        background: '#253237',
        foreground: '#e0fbfc',
        muted: '#5c6b73',
        mutedForeground: '#c2dfe3',
        border: 'rgba(157, 180, 192, 0.9)',
        accent: '#c2dfe3',
        input: 'rgba(92, 107, 115, 0.94)',
        ring: '#c2dfe3'
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.35rem'
      },
      fontFamily: {
        heading: ['var(--font-acworth)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 40px rgba(0,0,0,0.56)'
      }
    }
  },
  plugins: []
};

export default config;

