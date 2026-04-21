'use client';

import { motion } from 'framer-motion';

type TakeKind = 'take' | 'score' | 'meta' | 'live';
type Take = {
  id: number;
  kind: TakeKind;
  content: string;
  sub?: string;
  x: string;
  y: string;
  delay: number;
  duration: number;
  drift: number;    // vertical travel, px
  driftX?: number;  // horizontal travel, px
  rotate?: number;  // resting rotation, deg
  mobile?: boolean; // show on small screens (default: desktop only)
};

const TAKES: Take[] = [
  { id: 1, kind: 'take',  content: 'chaos 9.8',      sub: '@hoopshead',   x: '70%',  y: '8%',   delay: 0.9, duration: 7,  drift: 18, driftX: 8,  rotate: -3 },
  { id: 2, kind: 'score', content: 'DUKE 84',        sub: 'UNC 82 · 2Q',  x: '4%',   y: '58%',  delay: 1.1, duration: 8,  drift: 22, driftX: -6, rotate: 2,  mobile: true },
  { id: 3, kind: 'take',  content: '"clutch 10"',    sub: '@tonymad',     x: '80%',  y: '72%',  delay: 1.3, duration: 9,  drift: 16, driftX: 10, rotate: 3 },
  { id: 4, kind: 'meta',  content: '12.6k rating',                         x: '2%',   y: '18%',  delay: 1.5, duration: 10, drift: 12, driftX: 6,  mobile: true },
  { id: 5, kind: 'score', content: 'OKC 104',        sub: 'DEN 98 · 4Q',  x: '56%',  y: '86%',  delay: 1.7, duration: 8,  drift: 20, driftX: -8, rotate: -2 },
  { id: 6, kind: 'live',  content: 'LIVE · NBA',                            x: '48%',  y: '4%',   delay: 0.7, duration: 6,  drift: 10, driftX: 4 },
  { id: 7, kind: 'take',  content: '"overtime chaos"', sub: '@soccerphil', x: '14%',  y: '80%',  delay: 2.1, duration: 11, drift: 24, driftX: 10, rotate: -2 },
  { id: 8, kind: 'meta',  content: '+128 fire',                             x: '90%',  y: '40%',  delay: 2.4, duration: 9,  drift: 14, driftX: -8, mobile: true },
  { id: 9, kind: 'score', content: 'FLA 3 · TOR 2',  sub: 'OT · live',     x: '10%',  y: '36%',  delay: 1.9, duration: 10, drift: 18, driftX: 8,  rotate: 2 }
];

/**
 * Ambient floating chips that drift around the hero. Each has its own
 * entry delay, duration, rotation and drift path so the cloud never syncs up.
 * A few chips are marked mobile-visible; the rest show lg-and-up only.
 */
export function FloatingTakes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {TAKES.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 18, scale: 0.9, rotate: (t.rotate ?? 0) + 4 }}
          animate={{
            opacity: [0, 0.95, 0.95, 0.8, 0.95],
            y: [0, -t.drift, 0, (t.drift / 2), 0],
            x: [0, (t.driftX ?? 0), 0, -(t.driftX ?? 0) / 2, 0],
            scale: [0.9, 1, 1, 0.98, 1],
            rotate: [(t.rotate ?? 0) + 4, (t.rotate ?? 0), (t.rotate ?? 0) - 1, (t.rotate ?? 0) + 0.5, (t.rotate ?? 0)]
          }}
          transition={{
            opacity: { delay: t.delay, duration: t.duration, repeat: Infinity, ease: 'easeInOut' },
            y:       { delay: t.delay, duration: t.duration, repeat: Infinity, ease: 'easeInOut' },
            x:       { delay: t.delay, duration: t.duration, repeat: Infinity, ease: 'easeInOut' },
            scale:   { delay: t.delay, duration: t.duration, repeat: Infinity, ease: 'easeInOut' },
            rotate:  { delay: t.delay, duration: t.duration, repeat: Infinity, ease: 'easeInOut' }
          }}
          style={{ left: t.x, top: t.y }}
          className={`absolute ${t.mobile ? '' : 'hidden lg:block'}`}
        >
          <TakeChip kind={t.kind} content={t.content} sub={t.sub} />
        </motion.div>
      ))}
    </div>
  );
}

function TakeChip({ kind, content, sub }: { kind: TakeKind; content: string; sub?: string }) {
  if (kind === 'score') {
    return (
      <div className="flex flex-col items-start gap-0.5 rounded-xl border border-white/[0.08] bg-white/[0.05] px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <span className="font-mono text-[11px] leading-none text-foreground tabular-nums">{content}</span>
        {sub && <span className="font-mono text-[10px] text-mutedForeground tabular-nums">{sub}</span>}
      </div>
    );
  }
  if (kind === 'meta') {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 shadow-[0_6px_18px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <span className="h-1 w-1 rounded-full bg-buzzr-accent" />
        <span className="text-[10px] font-light tracking-wide text-mutedForeground">{content}</span>
      </div>
    );
  }
  if (kind === 'live') {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/[0.12] px-2.5 py-1 shadow-[0_6px_18px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500/70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-400">{content}</span>
      </div>
    );
  }
  return (
    <div className="flex max-w-[180px] flex-col gap-0.5 rounded-xl border border-white/[0.08] bg-white/[0.05] px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <span className="text-[12px] font-light leading-tight text-foreground">{content}</span>
      {sub && <span className="text-[10px] font-light tracking-wide text-mutedForeground">{sub}</span>}
    </div>
  );
}
