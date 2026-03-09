'use client';

import { useEffect, useRef, useState } from 'react';

interface BuzzrScoreMeterProps {
  score?: number;           // 0–10
  game?: string;
  sport?: string;
  label?: string;
}

export function BuzzrScoreMeter({
  score = 9.4,
  game = "Chiefs vs Bills · Divisional '22",
  sport = 'NFL',
  label = 'Entertainment Score'
}: BuzzrScoreMeterProps) {
  const [started, setStarted] = useState(false);
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Trigger animation when the component enters the viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Animate the displayed number from 0 → score
  useEffect(() => {
    if (!started) return;
    const duration = 1600; // ms
    const startTime = performance.now();

    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(parseFloat((eased * score).toFixed(1)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, score]);

  const fillPct = `${(score / 10) * 100}%`;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-border/60 bg-buzzr-surface/60 p-5 backdrop-blur-sm"
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(26,38,52,0.8)' }}
      aria-label={`${label}: ${score} out of 10 for ${game}`}
    >
      {/* Subtle gradient glow top-left */}
      <div
        className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full bg-buzzr-accent/20 blur-3xl"
        aria-hidden
      />

      {/* Header row */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-mutedForeground/70">{label}</p>
          <p className="mt-0.5 text-sm font-medium text-foreground">{game}</p>
        </div>
        <span className="shrink-0 rounded-full border border-buzzr-accent3/40 bg-buzzr-accent3/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-buzzr-accent4">
          {sport}
        </span>
      </div>

      {/* Score number */}
      <div className="mb-3 flex items-baseline gap-1">
        <span
          className="font-heading text-5xl leading-none text-gradient tabular-nums"
          aria-live="polite"
        >
          {displayed.toFixed(1)}
        </span>
        <span className="text-sm text-mutedForeground/60">/ 10</span>
      </div>

      {/* Bar track */}
      <div
        className="relative h-2.5 w-full overflow-hidden rounded-full"
        style={{ background: 'rgba(26,38,52,0.8)' }}
      >
        {/* Fill */}
        <div
          className={`absolute inset-y-0 left-0 rounded-full ${started ? 'animate-score-fill animate-meter-glow' : ''}`}
          style={{
            width: fillPct,
            background: 'linear-gradient(90deg, rgb(16,185,129), rgb(6,182,212), rgb(103,232,249))',
            animationDelay: started ? '0.15s' : '0s',
            animationFillMode: 'both'
          }}
        />
        {/* Shine sweep */}
        {started && (
          <div
            className="pointer-events-none absolute inset-y-0 left-0 rounded-full opacity-40"
            style={{
              width: fillPct,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s ease-out 0.6s forwards'
            }}
            aria-hidden
          />
        )}
      </div>

      {/* Sub-labels */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-mutedForeground/50">
        <span>Chaos</span>
        <span>Energy</span>
        <span>Drama</span>
        <span>Rewatchable</span>
      </div>
    </div>
  );
}
