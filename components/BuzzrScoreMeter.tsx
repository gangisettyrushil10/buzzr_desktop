'use client';

import { useEffect, useRef, useState } from 'react';

export interface BuzzrScoreMeterProps {
  score: number;         // overall 0–10
  game: string;
  sport: string;
  date?: string;
  breakdown: { label: string; value: number }[];
}

function useCountUp(target: number, started: boolean, duration = 1400) {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(parseFloat((eased * target).toFixed(1)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);
  return displayed;
}

function AnimatedBar({ value, started, delay = 0 }: { value: number; started: boolean; delay?: number }) {
  const pct = `${(value / 10) * 100}%`;
  return (
    <div className="h-1 w-full overflow-hidden rounded-full" style={{ background: 'rgba(38,38,40,0.9)' }}>
      <div
        className={started ? 'h-full rounded-full' : 'h-full rounded-full w-0'}
        style={{
          width: started ? pct : '0%',
          background: 'linear-gradient(90deg, rgb(16,185,129), rgb(6,182,212))',
          transition: started ? `width 1.2s cubic-bezier(0.22,1,0.36,1) ${delay}ms` : 'none',
        }}
      />
    </div>
  );
}

export function BuzzrScoreMeter({ score, game, sport, date, breakdown }: BuzzrScoreMeterProps) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const displayed = useCountUp(score, started);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const fillPct = `${(score / 10) * 100}%`;

  return (
    <div
      ref={ref}
      className="flex h-full flex-col rounded-2xl border border-border/60 bg-buzzr-surface/60 p-5 backdrop-blur-sm"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
      aria-label={`Entertainment score ${score}/10 — ${game}`}
    >
      {/* Sport + date */}
      <div className="mb-4 flex items-center justify-between">
        <span
          className="rounded-full border border-buzzr-accent3/35 bg-buzzr-accent3/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-buzzr-accent4"
        >
          {sport}
        </span>
        {date && <span className="text-[10px] text-mutedForeground/50">{date}</span>}
      </div>

      {/* Game name */}
      <p className="mb-5 text-sm font-medium leading-snug text-foreground">{game}</p>

      {/* Overall score */}
      <div className="mb-1.5 flex items-end justify-between">
        <span className="text-[10px] uppercase tracking-[0.2em] text-mutedForeground/60">Overall</span>
        <span className="text-[11px] text-mutedForeground/50" aria-hidden>{displayed.toFixed(1)}/10</span>
      </div>
      {/* Main bar */}
      <div className="mb-5 h-2 w-full overflow-hidden rounded-full" style={{ background: 'rgba(38,38,40,0.9)' }}>
        <div
          className="h-full rounded-full"
          style={{
            width: started ? fillPct : '0%',
            background: 'linear-gradient(90deg, rgb(16,185,129), rgb(6,182,212), rgb(103,232,249))',
            transition: started ? 'width 1.4s cubic-bezier(0.22,1,0.36,1) 0ms' : 'none',
            boxShadow: started ? '0 0 10px rgba(16,185,129,0.5)' : 'none',
          }}
        />
      </div>

      {/* Score number — big centrepiece */}
      <div className="mb-5 flex items-baseline gap-1.5">
        <span className="font-heading text-[3.25rem] leading-none text-gradient tabular-nums" aria-live="polite">
          {displayed.toFixed(1)}
        </span>
        <span className="text-base text-mutedForeground/40">/10</span>
      </div>

      {/* Breakdown dimensions */}
      <div className="mt-auto space-y-3">
        {breakdown.map((dim, i) => (
          <div key={dim.label}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[10px] text-mutedForeground/70">{dim.label}</span>
              <span className="text-[10px] tabular-nums text-mutedForeground/50">{dim.value.toFixed(1)}</span>
            </div>
            <AnimatedBar value={dim.value} started={started} delay={200 + i * 80} />
          </div>
        ))}
      </div>
    </div>
  );
}
