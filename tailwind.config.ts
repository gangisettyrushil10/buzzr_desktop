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
        // Palette is driven by CSS variables to support system light/dark mode.
        buzzr: {
          background: 'rgb(var(--background) / <alpha-value>)',
          surface: 'rgb(var(--surface) / <alpha-value>)',
          surfaceElevated: 'rgb(var(--surface-elevated) / <alpha-value>)',
          text: 'rgb(var(--foreground) / <alpha-value>)',
          textMuted: 'rgb(var(--muted-foreground) / <alpha-value>)',
          border: 'rgb(var(--border) / <alpha-value>)',
          accent: 'rgb(var(--accent) / <alpha-value>)',
          accent2: 'rgb(var(--accent-2) / <alpha-value>)',
          accent3: 'rgb(var(--accent-3) / <alpha-value>)',
          accent4: 'rgb(var(--accent-4) / <alpha-value>)',
          accent5: 'rgb(var(--accent-5) / <alpha-value>)'
        },
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        mutedForeground: 'rgb(var(--muted-foreground) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        input: 'rgb(var(--input) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)'
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
