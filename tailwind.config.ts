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
          accent5:         'rgb(var(--accent-5) / <alpha-value>)',
          onAccent:        'rgb(var(--on-accent) / <alpha-value>)',
          success:         'rgb(var(--success) / <alpha-value>)',
          warning:         'rgb(var(--warning) / <alpha-value>)',
          danger:          'rgb(var(--danger) / <alpha-value>)',
          live:            'rgb(var(--live) / <alpha-value>)',
          ink: {
            '0':   '#000000',
            '5':   '#0a0a0c',
            '10':  '#111114',
            '20':  '#1a1a1d',
            '40':  '#3a4048',
            '60':  '#5f6770',
            '80':  '#b8c6d0',
            '95':  '#f5fbff',
            '100': '#ffffff'
          }
        },
        background:     'rgb(var(--background) / <alpha-value>)',
        foreground:     'rgb(var(--foreground) / <alpha-value>)',
        muted:          'rgb(var(--muted) / <alpha-value>)',
        mutedForeground:'rgb(var(--muted-foreground) / <alpha-value>)',
        border:         'rgb(var(--border) / <alpha-value>)',
        accent:         'rgb(var(--accent) / <alpha-value>)',
        input:          'rgb(var(--input) / <alpha-value>)',
        ring:           'rgb(var(--ring) / <alpha-value>)',
        success:        'rgb(var(--success) / <alpha-value>)',
        warning:        'rgb(var(--warning) / <alpha-value>)',
        danger:         'rgb(var(--danger) / <alpha-value>)',
        live:           'rgb(var(--live) / <alpha-value>)',
        onAccent:       'rgb(var(--on-accent) / <alpha-value>)'
      },
      borderRadius: {
        xs:    '3px',
        sm:    '4px',
        md:    '6px',
        lg:    '8px',
        xl:    '10px',
        '2xl': '12px',
        '3xl': '16px',
        card:  '8px',
        sheet: '12px',
        pill:  '999px'
      },
      fontFamily: {
        heading: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      fontSize: {
        // App-scale compact aliases (10–36 px) : see src/theme/layout.ts.
        // Use these explicitly on badges, chips, and meta rows to match the mobile app.
        'app-xs':   ['10px', { lineHeight: '1.3' }],
        'app-sm':   ['11px', { lineHeight: '1.3' }],
        'app-md':   ['12px', { lineHeight: '1.5' }],
        'app-base': ['13px', { lineHeight: '1.5' }],
        'app-lg':   ['14px', { lineHeight: '1.5' }],
        'app-xl':   ['16px', { lineHeight: '1.5' }],
        'app-2xl':  ['18px', { lineHeight: '1.3' }],
        'app-3xl':  ['20px', { lineHeight: '1.3' }],
        'app-4xl':  ['22px', { lineHeight: '1.2' }],
        'app-hero': ['36px', { lineHeight: '1.0' }]
      },
      letterSpacing: {
        // App-scale px letter-spacing (preserves default Tailwind em scale alongside)
        'app-tight':  '-0.5px',
        'app-normal': '0px',
        'app-wide':   '0.3px',
        'app-wider':  '0.5px',
        'app-caps':   '2px'
      },
      boxShadow: {
        // Cool-tinted shadows using #020812 (app's canonical shadow color)
        'cool-sm': '0 1px 3px  rgba(2,8,18,0.16)',
        'cool-md': '0 3px 8px  rgba(2,8,18,0.22)',
        'cool-lg': '0 6px 16px rgba(2,8,18,0.28)',
        soft:         '0 18px 40px rgba(2,8,18,0.65)',
        glow:         '0 0 40px rgba(0,230,118,0.18)',
        'glow-emerald':'0 0 30px rgba(0,230,118,0.35),  0 0 60px rgba(0,230,118,0.15)',
        'glow-lime':   '0 0 30px rgba(57,255,142,0.35), 0 0 60px rgba(57,255,142,0.15)',
        'glow-sm':     '0 0 14px rgba(0,230,118,0.55)',
        'card':        '0 1px 3px rgba(2,8,18,0.4), 0 8px 24px rgba(2,8,18,0.25)',
        'lift':        '0 12px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,230,118,0.12)'
      },
      animation: {
        'marquee':     'marquee 30s linear infinite',
        'fade-in-up':  'fade-in-up 0.22s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'score-fill':  'score-fill 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pixel-blink': 'pixel-blink 1.6s ease-in-out infinite',
        'count-up':    'count-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards'
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'score-fill': {
          '0%':   { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' }
        },
        'pixel-blink': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' }
        },
        'count-up': {
          '0%':   { opacity: '0.3', transform: 'translateY(4px)' },
          '100%': { opacity: '1',   transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
};

export default config;
