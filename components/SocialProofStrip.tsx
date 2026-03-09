'use client';

import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, started: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);
  return value;
}

type Stat = { label: string; value: number; suffix?: string };

const STATS: Stat[] = [
  { label: 'Beta testers', value: 500, suffix: '+' },
  { label: 'Games rated', value: 2400, suffix: '+' },
  { label: 'Leagues supported', value: 12 },
];

export function SocialProofStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-3 gap-4 rounded-2xl border border-border/40 bg-buzzr-surface/30 px-4 py-6 backdrop-blur-sm sm:gap-8 sm:px-8 sm:py-8"
    >
      {STATS.map((stat) => (
        <StatCell key={stat.label} stat={stat} started={started} />
      ))}
    </div>
  );
}

function StatCell({ stat, started }: { stat: Stat; started: boolean }) {
  const count = useCountUp(stat.value, started);
  return (
    <div className="text-center">
      <p className="font-heading text-2xl tabular-nums text-foreground sm:text-3xl">
        <span className="text-gradient">{count.toLocaleString()}</span>
        {stat.suffix && <span className="text-gradient">{stat.suffix}</span>}
      </p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-mutedForeground/60 sm:text-[11px]">
        {stat.label}
      </p>
    </div>
  );
}
