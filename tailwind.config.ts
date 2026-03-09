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
        buzzr: {
          background:      'rgb(var(--background) / <alpha-value>)',
          surface:         'rgb(var(--surface) / <alpha-value>)',
          surfaceElevated: 'rgb(var(--surface-elevated) / <alpha-value>)',
          text:            'rgb(var(--foreground) / <alpha-value>)',
          textMuted:       'rgb(var(--muted-foreground) / <alpha-value>)',
          border:          'rgb(var(--border) / <alpha-value>)',
          accent:          'rgb(var(--accent) / <alpha-value>)',
          accent2:         'rgb(var(--accent-2) / <alpha-value>)',
          accent3:         'rgb(var(--accent-3) / <alpha-value>)',
          accent4:         'rgb(var(--accent-4) / <alpha-value>)',
          accent5:         'rgb(var(--accent-5) / <alpha-value>)'
        },
        background:     'rgb(var(--background) / <alpha-value>)',
        foreground:     'rgb(var(--foreground) / <alpha-value>)',
        muted:          'rgb(var(--muted) / <alpha-value>)',
        mutedForeground:'rgb(var(--muted-foreground) / <alpha-value>)',
        border:         'rgb(var(--border) / <alpha-value>)',
        accent:         'rgb(var(--accent) / <alpha-value>)',
        input:          'rgb(var(--input) / <alpha-value>)',
        ring:           'rgb(var(--ring) / <alpha-value>)'
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.35rem'
      },
      fontFamily: {
        heading: ['var(--font-acworth)', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-acworth)', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft:         '0 18px 40px rgba(0,0,0,0.65)',
        glow:         '0 0 40px rgba(16,185,129,0.18)',
        'glow-emerald':'0 0 30px rgba(16,185,129,0.35), 0 0 60px rgba(16,185,129,0.15)',
        'glow-cyan':   '0 0 30px rgba(6,182,212,0.35),  0 0 60px rgba(6,182,212,0.15)',
        'glow-sm':     '0 0 14px rgba(16,185,129,0.55)',
        'card':        '0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.25)'
      },
      animation: {
        'marquee':    'marquee 25s linear infinite',
        'fade-in-up': 'fade-in-up 0.65s ease-out forwards',
        'float':      'float 3.2s ease-in-out infinite'
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-6px)' }
        }
      }
    }
  },
  plugins: []
};

export default config;
