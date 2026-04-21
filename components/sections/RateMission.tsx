'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { readableTextColor } from '@/components/utils';

/**
 * RateMission — the positioning section. "Letterboxd, but for sports."
 *
 * A cinematic auto-playing Buzzr Score slider scrolls through 4 scripted
 * games. The left column states the mission; the right column shows the
 * mechanic in action — giant score, band color, rotating take from a real
 * user about that game. Slow, intentional, film-like motion.
 */

const BANDS = [
  { min: 9, color: '#00e676', label: 'Elite'  },
  { min: 7, color: '#22c55e', label: 'Good'   },
  { min: 5, color: '#f59e0b', label: 'Mid'    },
  { min: 3, color: '#ef4444', label: 'Meh'    },
  { min: 0, color: '#7c3aed', label: 'Bad'    }
] as const;

function bandFor(score: number) {
  return BANDS.find((b) => score >= b.min) ?? BANDS[BANDS.length - 1];
}

type Moment = {
  league: string;
  leagueColor: string;
  awayCode: string;
  awayName: string;
  homeCode: string;
  homeName: string;
  score: number;
  author: string;
  take: string;
};

const SCRIPT: Moment[] = [
  {
    league: 'NCAAM', leagueColor: '#6C5CE7',
    awayCode: 'YAL', awayName: 'Yale',
    homeCode: 'AUB', homeName: 'Auburn',
    score: 9.8,
    author: 'hoopshead',
    take: '"OT buzzer-beater, #13 takes down #4. Chills. Instant classic."'
  },
  {
    league: 'NBA', leagueColor: '#F88D24',
    awayCode: 'OKC', awayName: 'Thunder',
    homeCode: 'DEN', homeName: 'Nuggets',
    score: 7.3,
    author: 'swingkid',
    take: '"Solid night of hoops. Lead change in the 4th made it worth it."'
  },
  {
    league: 'EPL', leagueColor: '#3D195B',
    awayCode: 'ARS', awayName: 'Arsenal',
    homeCode: 'TOT', homeName: 'Spurs',
    score: 5.1,
    author: 'tonymad',
    take: '"Mid derby. One decent goal. Worth the 15-min recap, skip the rest."'
  },
  {
    league: 'NFL', leagueColor: '#754C24',
    awayCode: 'LAR', awayName: 'Rams',
    homeCode: 'ARI', homeName: 'Cardinals',
    score: 2.8,
    author: 'soccerphil',
    take: '"Blowout from the first quarter. Turned it off at halftime."'
  }
];

const STEP_MS = 4800;

export function RateMission() {
  const [idx, setIdx] = useState(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedRef.current = mq.matches;
  }, []);

  useEffect(() => {
    if (reducedRef.current) return;
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % SCRIPT.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, []);

  const moment = SCRIPT[idx];
  const band = bandFor(moment.score);
  const fillPct = ((moment.score - 1) / 9) * 100;

  return (
    <section
      id="mission"
      aria-labelledby="mission-title"
      className="relative mx-auto w-full max-w-[1400px] px-6 py-28 md:py-36 scroll-mt-24"
    >
      <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* Left: mission copy */}
        <div className="relative flex flex-col gap-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-buzzr-accent">
            The mission
          </p>

          <h2
            id="mission-title"
            className="font-display text-[clamp(40px,6vw,80px)] font-light leading-[0.96] tracking-[-0.04em] text-foreground"
          >
            <span className="font-medium">Letterboxd</span>
            <span className="text-buzzr-accent">,</span>
            <br />
            for sports.
          </h2>

          <p className="max-w-[42ch] text-lg font-light leading-relaxed text-mutedForeground md:text-xl">
            Rate every game 1 to 10. Log the ones that moved you. Argue about the ones that didn't. A diary of everything you actually watched — not the box score.
          </p>

          <ul className="mt-2 space-y-2 text-[14px] text-foreground/80">
            <li className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-buzzr-accent">01</span>
              <span>Rate by what you felt, not who won.</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-buzzr-accent">02</span>
              <span>Drop a take. Your watch, your words.</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-buzzr-accent">03</span>
              <span>Build a log of every classic you called.</span>
            </li>
          </ul>
        </div>

        {/* Right: cinematic rate player */}
        <div className="relative">
          <CinematicSlider moment={moment} band={band} fillPct={fillPct} momentKey={idx} />
        </div>
      </div>
    </section>
  );
}

function CinematicSlider({
  moment,
  band,
  fillPct,
  momentKey
}: {
  moment: Moment;
  band: (typeof BANDS)[number];
  fillPct: number;
  momentKey: number;
}) {
  const leagueBadgeText = readableTextColor(moment.leagueColor);

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0a0c]/70 p-8 shadow-cool-lg backdrop-blur-xl md:p-10"
      style={{ minHeight: 560 }}
    >
      {/* League-tinted bloom in corner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`glow-${momentKey}`}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 85% 15%, ${moment.leagueColor}26 0%, transparent 60%)`
          }}
        />
      </AnimatePresence>

      {/* Band color aura bottom */}
      <motion.div
        aria-hidden
        animate={{ background: `radial-gradient(ellipse 70% 40% at 50% 100%, ${band.color}22 0%, transparent 60%)` }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-0"
      />

      <div className="relative z-10 flex h-full flex-col">
        {/* Header: league + game title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`header-${momentKey}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <div className="mb-4 flex items-center gap-2">
              <span
                className="rounded-md px-2 py-1 font-mono text-[10px] font-black uppercase tracking-[0.12em]"
                style={{ background: moment.leagueColor, color: leagueBadgeText }}
              >
                {moment.league}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mutedForeground">
                Final
              </span>
            </div>
            <h3 className="font-display text-[28px] font-light leading-tight tracking-[-0.02em] text-foreground md:text-[34px]">
              {moment.awayName}{' '}
              <span className="text-mutedForeground">vs</span>{' '}
              {moment.homeName}
            </h3>
          </motion.div>
        </AnimatePresence>

        {/* Giant score + band pill */}
        <div className="mb-10 flex-1">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-mutedForeground">
              Buzzr Score
            </span>
            <motion.span
              key={band.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-pill px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ background: `${band.color}22`, color: band.color }}
            >
              {band.label}
            </motion.span>
          </div>

          <div className="flex items-baseline gap-2">
            <AnimatedScore value={moment.score} color={band.color} />
            <span className="font-mono text-[14px] tabular-nums text-mutedForeground">/ 10</span>
          </div>

          {/* Slider track */}
          <div className="mt-6">
            <div className="relative h-2 overflow-hidden rounded-pill bg-white/[0.05]">
              <motion.div
                animate={{ width: `${fillPct}%`, background: band.color }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-y-0 left-0 rounded-pill"
                style={{ boxShadow: `0 0 16px ${band.color}aa` }}
              />
              <motion.div
                animate={{ left: `${fillPct}%`, background: band.color }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-cool-md"
              />
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-mutedForeground">
              <span>1 · Skip it</span>
              <span>10 · Instant classic</span>
            </div>
          </div>
        </div>

        {/* Author take bubble */}
        <div className="relative min-h-[112px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={`take-${momentKey}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <p className="mb-2 text-[15px] font-light italic leading-relaxed text-foreground/90 md:text-[16px]">
                {moment.take}
              </p>
              <footer className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-mutedForeground">
                <span
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-black text-buzzr-onAccent"
                  style={{ background: band.color }}
                >
                  {moment.author.slice(0, 1).toUpperCase()}
                </span>
                @{moment.author}
                <span aria-hidden>·</span>
                <span>{band.label.toUpperCase()}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Step dots */}
        <div className="mt-8 flex items-center justify-center gap-1.5">
          {SCRIPT.map((_, i) => (
            <span
              key={i}
              className="h-1 rounded-pill transition-all"
              style={{
                width: i === momentKey ? 24 : 6,
                background:
                  i === momentKey ? band.color : 'rgba(255,255,255,0.18)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * AnimatedScore — smoothly tweens the score number between two values.
 * Uses requestAnimationFrame for frame-accurate text updates.
 */
function AnimatedScore({ value, color }: { value: number; color: string }) {
  const [display, setDisplay] = useState(value);
  const from = useRef(value);
  const to = useRef(value);
  const start = useRef(performance.now());
  const duration = 1100;

  useEffect(() => {
    from.current = display;
    to.current = value;
    start.current = performance.now();

    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start.current) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = from.current + (to.current - from.current) * eased;
      setDisplay(parseFloat(v.toFixed(1)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const [intPart, decPart] = display.toFixed(1).split('.');
  return (
    <div className="flex items-baseline leading-none tabular-nums">
      <span
        className="font-display text-[104px] font-light leading-none tracking-[-0.05em] transition-colors md:text-[128px]"
        style={{ color, textShadow: `0 0 32px ${color}55` }}
      >
        {intPart}
      </span>
      <span className="text-[56px] font-light leading-none md:text-[68px]" style={{ color }}>.</span>
      <span
        className="font-display text-[104px] font-light leading-none tracking-[-0.05em] transition-colors md:text-[128px]"
        style={{ color, textShadow: `0 0 32px ${color}55` }}
      >
        {decPart}
      </span>
    </div>
  );
}
