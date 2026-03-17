'use client';

import { useEffect, useRef, useState } from 'react';
import { SegmentedBar } from './SegmentedBar';
import { PixelStar, PixelFire, PixelOrb } from './PixelIcons';

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

function getClassification(score: number): string {
  if (score >= 9.5) return 'AN ABSOLUTE CLASSIC';
  if (score >= 9.0) return 'ABSOLUTE BANGER';
  if (score >= 8.5) return 'MUST WATCH';
  if (score >= 7.5) return 'WORTH YOUR TIME';
  if (score >= 6.0) return 'DECENT GAME';
  return 'SKIP IT';
}

// Alternating pixel icon decorations per card index
const CORNER_ICONS = [PixelStar, PixelFire, PixelOrb];

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

  // Pick a pixel icon based on score classification
  const iconIndex = score >= 9.5 ? 0 : score >= 9.0 ? 1 : 2;
  const CornerIcon = CORNER_ICONS[iconIndex];

  // The decimal separator is a styled green dot — split number at decimal point
  const scoreStr = displayed.toFixed(1);
  const [intPart, decPart] = scoreStr.split('.');

  return (
    <div
      ref={ref}
      className="pixel-frame flex h-full flex-col bg-black p-5 transition-shadow hover:shadow-glow-emerald relative overflow-hidden"
      aria-label={`Entertainment score ${score}/10 — ${game}`}
    >
      {/* Corner pixel icon decoration */}
      <div className="absolute top-3 right-3 opacity-20 pointer-events-none" aria-hidden>
        <CornerIcon size={36} />
      </div>

      {/* Score number — massive centrepiece */}
      <div className="mb-4 flex items-start leading-none" aria-live="polite">
        <span className="score-hero-num tabular-nums text-white">
          {intPart}
        </span>
        {/* Green dot as decimal separator */}
        <span className="mt-4 mx-1 text-[2.5rem] leading-none font-heading" style={{ color: 'rgb(16,185,129)' }}>
          •
        </span>
        <span className="score-hero-num tabular-nums text-white">
          {decPart}
        </span>
      </div>

      {/* Classification label */}
      <div className="mb-5 flex items-center gap-2">
        <PixelOrb size={14} />
        <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-buzzr-accent2">
          {getClassification(score)}
        </span>
      </div>

      {/* Breakdown — segmented bars */}
      <div className="mt-auto space-y-3">
        {breakdown.map((dim) => (
          <div key={dim.label}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[10px] font-sans uppercase tracking-widest text-mutedForeground/70">
                {dim.label}
              </span>
              <span className="text-[10px] tabular-nums text-mutedForeground/50">{dim.value.toFixed(1)}</span>
            </div>
            <SegmentedBar value={dim.value} segments={10} segmentHeight={5} animate={started} />
          </div>
        ))}
      </div>

      {/* Game name + sport tag — anchored to bottom */}
      <div className="mt-5 pt-4 border-t border-border/30">
        <p className="text-[11px] font-sans font-medium leading-snug text-foreground/80 mb-1">{game}</p>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-buzzr-accent/70 border border-buzzr-accent/30 px-1.5 py-0.5">
            {sport}
          </span>
          {date && <span className="text-[9px] text-mutedForeground/40">{date}</span>}
        </div>
      </div>
    </div>
  );
}
