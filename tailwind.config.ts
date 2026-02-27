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
        // Use Acworth everywhere for this site
        sans: ['var(--font-acworth)', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 40px rgba(0,0,0,0.56)',
        glow: '0 0 40px rgba(148, 210, 225, 0.15)'
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      }
    }
  },
  plugins: []
};

export default config;

