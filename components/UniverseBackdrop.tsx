/**
 * UniverseBackdrop — a proper cosmos.
 *
 * Back → front layers:
 *  1. Deep-space gradient — black with a subtle violet / teal vertical mix.
 *  2. Chromatic nebulae — THREE blended radial washes (emerald / violet / cyan)
 *     positioned at different depths. Overlapping colors fight each other a
 *     little, which is exactly what real nebula imagery looks like.
 *  3. Dust lane — one wide horizontal blurred streak across the midline,
 *     simulating a galactic dust band.
 *  4. Galactic spiral arms — two curved SVG paths with gradient strokes +
 *     a blur filter, suggesting a galaxy rotating off to one side.
 *  5. Bokeh stars — 30 pinpricks, ~half with radial-blur for depth of field.
 *     Colors vary (white / pale cyan / pale emerald / warm).
 *  6. Bright anchor stars — 4 big crisp stars with cross-glint glow.
 *  7. Slow comet — single long-cycle shooting star.
 *  8. Top + bottom linear fade mask to blend into the CourtCanvas page.
 *
 * All pure CSS/SVG so the component stays a server component.
 */

type Star = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  dur: number;
  delay: number;
  blur?: number;
};

// Distant bokeh stars — spread across the full section, half out of focus for depth.
const BOKEH: Star[] = [
  { x:  4, y: 14, size: 1,   opacity: 0.55, color: 'rgba(255,255,255,0.9)', dur: 3.8, delay: 0.2, blur: 1.2 },
  { x:  8, y: 42, size: 1.5, opacity: 0.8,  color: 'rgba(255,255,255,0.95)', dur: 4.6, delay: 1.1 },
  { x: 12, y: 78, size: 1,   opacity: 0.5,  color: 'rgba(180,220,255,0.9)', dur: 3.4, delay: 0.8, blur: 1.4 },
  { x: 16, y: 22, size: 1,   opacity: 0.65, color: 'rgba(200,255,220,0.9)', dur: 4.1, delay: 2.0 },
  { x: 21, y: 58, size: 2,   opacity: 0.95, color: 'rgba(255,255,255,1)',   dur: 5.4, delay: 0.5 },
  { x: 25, y: 8,  size: 1,   opacity: 0.6,  color: 'rgba(255,255,255,0.85)', dur: 3.6, delay: 1.7, blur: 1.0 },
  { x: 29, y: 34, size: 1.5, opacity: 0.75, color: 'rgba(180,160,255,0.85)', dur: 4.8, delay: 0.9 },
  { x: 33, y: 88, size: 1,   opacity: 0.5,  color: 'rgba(255,255,255,0.85)', dur: 3.2, delay: 2.4, blur: 1.3 },
  { x: 37, y: 48, size: 2,   opacity: 0.9,  color: 'rgba(200,255,220,0.95)', dur: 5.9, delay: 1.4 },
  { x: 41, y: 18, size: 1,   opacity: 0.6,  color: 'rgba(255,255,255,0.9)',  dur: 3.7, delay: 0.6, blur: 1.1 },
  { x: 44, y: 72, size: 1.5, opacity: 0.8,  color: 'rgba(255,255,255,0.95)', dur: 4.5, delay: 2.1 },
  { x: 48, y: 28, size: 1,   opacity: 0.55, color: 'rgba(180,220,255,0.8)',  dur: 3.5, delay: 1.8, blur: 1.2 },
  { x: 52, y: 62, size: 2,   opacity: 0.95, color: 'rgba(255,255,255,1)',    dur: 5.1, delay: 0.3 },
  { x: 56, y: 4,  size: 1,   opacity: 0.7,  color: 'rgba(200,255,220,0.9)',  dur: 4.0, delay: 2.6 },
  { x: 60, y: 38, size: 1,   opacity: 0.5,  color: 'rgba(255,255,255,0.8)',  dur: 3.4, delay: 1.0, blur: 1.4 },
  { x: 64, y: 82, size: 1.5, opacity: 0.8,  color: 'rgba(255,200,220,0.9)',  dur: 4.9, delay: 0.7 },
  { x: 68, y: 52, size: 1,   opacity: 0.6,  color: 'rgba(255,255,255,0.85)', dur: 3.9, delay: 2.3, blur: 1.1 },
  { x: 72, y: 12, size: 2,   opacity: 0.95, color: 'rgba(255,255,255,1)',    dur: 5.6, delay: 1.5 },
  { x: 75, y: 44, size: 1,   opacity: 0.55, color: 'rgba(180,220,255,0.85)', dur: 3.6, delay: 0.4, blur: 1.3 },
  { x: 78, y: 74, size: 1.5, opacity: 0.75, color: 'rgba(200,255,220,0.9)',  dur: 4.4, delay: 2.2 },
  { x: 81, y: 24, size: 1,   opacity: 0.6,  color: 'rgba(255,255,255,0.85)', dur: 3.3, delay: 1.3, blur: 1.2 },
  { x: 84, y: 58, size: 2.5, opacity: 1,    color: 'rgba(255,255,255,1)',    dur: 6.2, delay: 0.2 },
  { x: 87, y: 8,  size: 1,   opacity: 0.65, color: 'rgba(180,160,255,0.9)',  dur: 4.0, delay: 2.8 },
  { x: 90, y: 38, size: 1,   opacity: 0.55, color: 'rgba(255,255,255,0.85)', dur: 3.5, delay: 0.8, blur: 1.1 },
  { x: 92, y: 86, size: 1.5, opacity: 0.8,  color: 'rgba(255,255,255,0.95)', dur: 4.7, delay: 1.9 },
  { x: 94, y: 18, size: 2,   opacity: 0.9,  color: 'rgba(200,255,220,0.95)', dur: 5.3, delay: 0.6 },
  { x: 96, y: 64, size: 1,   opacity: 0.55, color: 'rgba(255,255,255,0.85)', dur: 3.4, delay: 2.5, blur: 1.2 },
  { x: 97, y: 30, size: 1,   opacity: 0.6,  color: 'rgba(180,220,255,0.85)', dur: 3.8, delay: 1.2, blur: 1.0 },
  { x: 98, y: 50, size: 1.5, opacity: 0.75, color: 'rgba(255,255,255,0.9)',  dur: 4.2, delay: 0.9 },
  { x: 99, y: 78, size: 1,   opacity: 0.55, color: 'rgba(200,255,220,0.85)', dur: 3.7, delay: 2.7, blur: 1.3 }
];

// Hand-placed bright anchors with cross-glint
const ANCHORS: Star[] = [
  { x: 20, y: 52, size: 2.5, opacity: 1, color: 'rgba(255,255,255,1)',    dur: 6.0, delay: 0.2 },
  { x: 50, y: 18, size: 2.5, opacity: 1, color: 'rgba(0,230,118,0.95)',   dur: 5.2, delay: 1.8 },
  { x: 78, y: 72, size: 3,   opacity: 1, color: 'rgba(255,255,255,1)',    dur: 6.8, delay: 0.6 },
  { x: 88, y: 28, size: 2.5, opacity: 1, color: 'rgba(168,140,255,0.95)', dur: 5.8, delay: 2.4 }
];

export function UniverseBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        WebkitMaskImage:
          'linear-gradient(180deg, transparent 0%, black 10%, black 90%, transparent 100%)',
        maskImage:
          'linear-gradient(180deg, transparent 0%, black 10%, black 90%, transparent 100%)'
      }}
    >
      {/* 1. Deep-space base: violet→black vertical */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(30,10,60,0.25) 0%, rgba(6,6,10,0.9) 50%, rgba(6,6,10,1) 100%)'
        }}
      />

      {/* 2a. Emerald nebula — bottom-right galactic core */}
      <div
        className="absolute -bottom-[20%] -right-[10%] h-[90%] w-[75%] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0,230,118,0.18) 0%, rgba(0,230,118,0.06) 35%, transparent 65%)',
          filter: 'blur(70px)'
        }}
      />

      {/* 2b. Violet nebula — upper-left, cooler */}
      <div
        className="absolute -top-[15%] -left-[15%] h-[75%] w-[70%] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, rgba(124,58,237,0.04) 40%, transparent 65%)',
          filter: 'blur(80px)'
        }}
      />

      {/* 2c. Cyan ember — mid-distance */}
      <div
        className="absolute left-[38%] top-[45%] h-[50%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(52,211,153,0.08) 0%, rgba(80,180,255,0.06) 40%, transparent 65%)',
          filter: 'blur(90px)'
        }}
      />

      {/* 2d. Magenta glint (chromatic punch) */}
      <div
        className="absolute right-[15%] top-[22%] h-[35%] w-[35%] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(236,72,153,0.09) 0%, transparent 65%)',
          filter: 'blur(70px)'
        }}
      />

      {/* 3. Galactic dust lane */}
      <div
        className="absolute inset-x-0 top-[58%] h-[22%]"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(120,80,180,0.12) 40%, rgba(0,230,118,0.08) 55%, transparent 100%)',
          filter: 'blur(40px)',
          transform: 'rotate(-4deg)'
        }}
      />

      {/* 4. Galactic spiral arms — two curved paths blurred for depth */}
      <svg
        viewBox="0 0 1600 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="arm-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="rgba(0,230,118,0)" />
            <stop offset="40%"  stopColor="rgba(0,230,118,0.20)" />
            <stop offset="60%"  stopColor="rgba(200,255,220,0.30)" />
            <stop offset="100%" stopColor="rgba(0,230,118,0)" />
          </linearGradient>
          <linearGradient id="arm-b" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(124,58,237,0)" />
            <stop offset="50%"  stopColor="rgba(168,140,255,0.22)" />
            <stop offset="100%" stopColor="rgba(124,58,237,0)" />
          </linearGradient>
          <linearGradient id="arm-c" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
            <stop offset="50%"  stopColor="rgba(236,72,153,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <filter id="arm-blur">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
          <filter id="arm-blur-soft">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Outer spiral arm — wraps around the core in the bottom-right */}
        <path
          d="M -80 380 Q 400 60 950 260 Q 1450 420 1700 240"
          fill="none"
          stroke="url(#arm-a)"
          strokeWidth="1.4"
          filter="url(#arm-blur)"
        />

        {/* Inner companion arm — tighter curve, violet */}
        <path
          d="M -60 520 Q 500 240 1050 420 Q 1400 520 1700 420"
          fill="none"
          stroke="url(#arm-b)"
          strokeWidth="1"
          filter="url(#arm-blur)"
        />

        {/* Far dust trail — magenta, blurred heavily, sits behind */}
        <path
          d="M 0 220 Q 500 540 1200 300 Q 1500 200 1700 300"
          fill="none"
          stroke="url(#arm-c)"
          strokeWidth="3"
          filter="url(#arm-blur-soft)"
        />

        {/* Anchor stars with cross-glint */}
        {ANCHORS.map((s, i) => (
          <g key={`anchor-${i}`}>
            <circle
              cx={`${s.x * 16}`}
              cy={`${s.y * 8}`}
              r={s.size}
              fill={s.color}
              opacity={s.opacity}
            />
            <line
              x1={`${s.x * 16 - 10}`}
              y1={`${s.y * 8}`}
              x2={`${s.x * 16 + 10}`}
              y2={`${s.y * 8}`}
              stroke={s.color}
              strokeWidth="0.4"
              opacity={0.5}
            />
            <line
              x1={`${s.x * 16}`}
              y1={`${s.y * 8 - 10}`}
              x2={`${s.x * 16}`}
              y2={`${s.y * 8 + 10}`}
              stroke={s.color}
              strokeWidth="0.4"
              opacity={0.5}
            />
          </g>
        ))}
      </svg>

      {/* 5. Bokeh star field */}
      {BOKEH.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full"
          style={
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: s.color,
              boxShadow: `0 0 ${Math.round(s.size * 3)}px ${s.color}`,
              opacity: s.opacity,
              filter: s.blur ? `blur(${s.blur}px)` : 'none',
              ['--twk-min' as string]: s.opacity * 0.4,
              ['--twk-max' as string]: s.opacity,
              ['--twk-dur' as string]: `${s.dur}s`,
              animationDelay: `${s.delay}s`
            } as React.CSSProperties
          }
        />
      ))}

      {/* 7. Slow comet on a 22s cycle */}
      <span
        className="animate-shooting-star absolute"
        style={
          {
            left: '14%',
            top: '18%',
            width: '2px',
            height: '2px',
            borderRadius: '999px',
            background: 'white',
            boxShadow:
              '0 0 12px rgba(255,255,255,0.9), 0 0 26px rgba(0,230,118,0.5), -40px -22px 30px -10px rgba(255,255,255,0.35)',
            ['--sx' as string]: '560px',
            ['--sy' as string]: '300px',
            ['--shoot-dur' as string]: '3.4s',
            ['--shoot-delay' as string]: '5s',
            animationIterationCount: 'infinite',
            animationDuration: '22s'
          } as React.CSSProperties
        }
      />
    </div>
  );
}
