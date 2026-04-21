'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LiveScoreWidget } from './LiveScoreWidget';

/**
 * HeroStack renders three self-animating feature cards that cycle through the
 * three positions (front / back-left / back-right) every ~6 seconds. The three
 * cards are: LiveScoreWidget (live scoreboard + rating), TakePeekCard (rotating
 * hot takes), BracketPeekCard (March Madness bracket).
 *
 * Transitions are framer-motion driven — width / position / rotation / scale
 * all animate smoothly between slots. No cursor interaction.
 */

const CYCLE_MS = 5200;

/**
 * Carousel positions, all anchored to container center. Each entry is the
 * delta from center: x offset, scale, rotation, z, opacity. All cards share
 * the same base (absolute, top 1/2, left 1/2, translate -50% -50%) so they
 * stack cleanly on top of each other when offsets are zero.
 *
 * Slot 0 = center (hero / active)
 * Slot 1 = left peek
 * Slot 2 = right peek
 */
const SLOTS = [
  { x: 0,    scale: 1.0,  rotate: 0,  z: 30, opacity: 1,    saturate: 1    },
  { x: -220, scale: 0.78, rotate: -6, z: 20, opacity: 0.55, saturate: 0.85 },
  { x: 220,  scale: 0.78, rotate: 6,  z: 10, opacity: 0.55, saturate: 0.85 }
] as const;

export function HeroStack() {
  // slots[i] = which position card i currently sits at.
  const [slots, setSlots] = useState<[number, number, number]>([0, 1, 2]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlots(([a, b, c]) => [c, a, b]); // rotate: left→center, center→right, right→left
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  const cards = [
    { key: 'live',    Component: LiveScoreWidget },
    { key: 'take',    Component: TakePeekCard    },
    { key: 'bracket', Component: BracketPeekCard }
  ] as const;

  return (
    <div className="relative mx-auto hidden h-[620px] w-full max-w-[700px] sm:block">
      {cards.map(({ key, Component }, idx) => {
        const cfg = SLOTS[slots[idx]];
        return (
          <motion.div
            key={key}
            initial={false}
            animate={{
              x: `calc(-50% + ${cfg.x}px)`,
              scale: cfg.scale,
              rotate: cfg.rotate,
              opacity: cfg.opacity
            }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              y: '-50%',
              width: 340,
              zIndex: cfg.z,
              filter: `saturate(${cfg.saturate})`,
              transformOrigin: 'center center'
            }}
            className="will-change-transform"
          >
            <Component />
          </motion.div>
        );
      })}
    </div>
  );
}

/** Mobile fallback: just render the LiveScoreWidget centered (no stack). */
export function HeroStackMobile() {
  return (
    <div className="block w-full max-w-[420px] sm:hidden">
      <LiveScoreWidget />
    </div>
  );
}

// ── Hot Take peek card ────────────────────────────────────────────────────

type Take = {
  user: string;
  body: string;
  fire: number;
  hundred: number;
  ice: number;
  replies: number;
  game: string;
  teamA: string;
  teamB: string;
  teamColorA: string;
  teamColorB: string;
};

const TAKES: Take[] = [
  {
    user: 'hoopshead',
    body: '"I stood up and my chair fell over"',
    fire: 412, hundred: 88, ice: 3, replies: 42,
    game: 'OKC @ DEN', teamA: 'OKC', teamB: 'DEN', teamColorA: '#007AC1', teamColorB: '#0E2240'
  },
  {
    user: 'tonymad',
    body: '"Super Bowl OT. Forgot to breathe."',
    fire: 318, hundred: 61, ice: 7, replies: 28,
    game: 'SB · OT',  teamA: 'KC',  teamB: 'SF',  teamColorA: '#E31837', teamColorB: '#AA0000'
  },
  {
    user: 'soccerphil',
    body: 'rated Argentina vs France a 10.0',
    fire: 207, hundred: 44, ice: 12, replies: 19,
    game: 'ARG · FRA', teamA: 'ARG', teamB: 'FRA', teamColorA: '#75AADB', teamColorB: '#002654'
  },
  {
    user: 'swingkid',
    body: '"Cleanest buzzer beater of the year"',
    fire: 541, hundred: 124, ice: 2, replies: 67,
    game: 'UNC @ DUKE', teamA: 'UNC', teamB: 'DUKE', teamColorA: '#7BAFD4', teamColorB: '#001A57'
  }
];

function TakePeekCard() {
  const [idx, setIdx] = useState(0);
  const [fire, setFire] = useState(TAKES[0].fire);
  const [hundred, setHundred] = useState(TAKES[0].hundred);

  useEffect(() => {
    const rot = window.setInterval(() => setIdx((i) => (i + 1) % TAKES.length), 3500);
    return () => window.clearInterval(rot);
  }, []);

  useEffect(() => {
    setFire(TAKES[idx].fire);
    setHundred(TAKES[idx].hundred);
    const tick = window.setInterval(() => {
      setFire((n) => n + Math.ceil(Math.random() * 3));
      if (Math.random() > 0.6) setHundred((n) => n + 1);
    }, 850);
    return () => window.clearInterval(tick);
  }, [idx]);

  const take = TAKES[idx];
  const popping = fire > 450;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/60 p-4 shadow-cool-lg backdrop-blur-xl">
      {popping && (
        <div className="mb-2 inline-flex items-center gap-1 rounded-pill bg-[#fbbf24]/14 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#fbbf24]">
          🔥 Popping off
        </div>
      )}
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f97316]/20 text-[10px] font-black text-[#f97316]">
          {take.user.slice(0, 2).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[11px] font-semibold text-foreground">@{take.user}</div>
          <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-mutedForeground">Hot Take</div>
        </div>
      </div>
      <motion.p
        key={idx}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-3 line-clamp-3 text-[12px] leading-snug text-foreground/90"
      >
        {take.body}
      </motion.p>

      {/* Game tag */}
      <div className="mb-3 inline-flex items-center gap-1.5 rounded-pill border border-white/10 bg-white/[0.03] px-2 py-0.5">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: take.teamColorA }} />
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-foreground">{take.game}</span>
        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: take.teamColorB }} />
      </div>

      {/* Reactions row */}
      <div className="flex items-center justify-between gap-2 border-t border-white/[0.05] pt-2 text-[10px]">
        <div className="flex items-center gap-2 font-mono tabular-nums">
          <span className="inline-flex items-center gap-0.5 text-[#f97316]">🔥 {fire}</span>
          <span className="inline-flex items-center gap-0.5 text-foreground/70">💯 {hundred}</span>
          <span className="inline-flex items-center gap-0.5 text-foreground/70">❄️ {take.ice}</span>
        </div>
        <span className="font-mono text-mutedForeground">▲ {take.replies}</span>
      </div>
    </div>
  );
}

// ── Bracket peek card ─────────────────────────────────────────────────────

type Matchup = {
  a: string; b: string;
  aColor: string; bColor: string;
  aSeed: number; bSeed: number;
  winner: 'a' | 'b';
};

type BracketRound = { name: string; wager: number; correct: number; total: number; matchups: Matchup[] };

const BRACKETS: BracketRound[] = [
  {
    name: 'Sweet 16', wager: 240, correct: 11, total: 16,
    matchups: [
      { a: 'DUKE', b: 'UNC',  aColor: '#001A57', bColor: '#7BAFD4', aSeed: 1,  bSeed: 9,  winner: 'a' },
      { a: 'GONZ', b: 'UCLA', aColor: '#041E42', bColor: '#2D68C4', aSeed: 2,  bSeed: 6,  winner: 'b' },
      { a: 'BAMA', b: 'AUB',  aColor: '#9E1B32', bColor: '#0C2340', aSeed: 4,  bSeed: 5,  winner: 'b' },
      { a: 'KAN',  b: 'MSU',  aColor: '#0051BA', bColor: '#18453B', aSeed: 3,  bSeed: 11, winner: 'a' }
    ]
  },
  {
    name: 'Elite 8', wager: 420, correct: 6, total: 8,
    matchups: [
      { a: 'HOU',  b: 'KY',    aColor: '#C8102E', bColor: '#0033A0', aSeed: 1, bSeed: 4,  winner: 'a' },
      { a: 'ARZ',  b: 'IOWA',  aColor: '#CC0033', bColor: '#FFCD00', aSeed: 2, bSeed: 7,  winner: 'b' },
      { a: 'TENN', b: 'MARQ',  aColor: '#FF8200', bColor: '#003DA5', aSeed: 1, bSeed: 5,  winner: 'a' },
      { a: 'BAY',  b: 'UCONN', aColor: '#003015', bColor: '#000E2F', aSeed: 3, bSeed: 1,  winner: 'b' }
    ]
  }
];

function BracketPeekCard() {
  const [round, setRound] = useState(0);
  const data = BRACKETS[round];

  useEffect(() => {
    const id = window.setInterval(() => setRound((r) => (r + 1) % BRACKETS.length), 4200);
    return () => window.clearInterval(id);
  }, []);

  const accuracy = Math.round((data.correct / data.total) * 100);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/60 p-4 shadow-cool-lg backdrop-blur-xl">
      <div className="mb-2 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-[#a855f7]/14 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#a855f7]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a855f7]/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          </span>
          Bracket
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-mutedForeground">
          {data.name}
        </span>
      </div>

      <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/80">
        March Madness 2026
      </div>

      <motion.ul
        key={round}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="mb-3 space-y-1"
      >
        {data.matchups.map((m, i) => (
          <MatchupRow key={`${round}-${i}`} matchup={m} />
        ))}
      </motion.ul>

      {/* Stats strip */}
      <div className="flex items-center justify-between border-t border-white/[0.05] pt-2 font-mono text-[9px] uppercase tracking-wider">
        <span className="inline-flex items-center gap-1 text-[#00e676]">
          <span aria-hidden>🌸</span>
          <span className="tabular-nums">{data.wager}</span>
          <span className="text-mutedForeground">pollen</span>
        </span>
        <span className="tabular-nums text-mutedForeground">
          <span className="text-foreground">{data.correct}</span>/{data.total} · {accuracy}%
        </span>
      </div>
    </div>
  );
}

function MatchupRow({ matchup }: { matchup: Matchup }) {
  const aWin = matchup.winner === 'a';
  return (
    <li className="flex items-center gap-1 rounded-sm bg-white/[0.03] px-2 py-1">
      <TeamPill team={matchup.a} color={matchup.aColor} seed={matchup.aSeed} winner={aWin} />
      <span className="text-[8px] font-bold text-mutedForeground">vs</span>
      <TeamPill team={matchup.b} color={matchup.bColor} seed={matchup.bSeed} winner={!aWin} align="right" />
    </li>
  );
}

function TeamPill({
  team,
  color,
  seed,
  winner,
  align = 'left'
}: {
  team: string;
  color: string;
  seed: number;
  winner: boolean;
  align?: 'left' | 'right';
}) {
  return (
    <div className={`flex min-w-0 flex-1 items-center gap-1 ${winner ? '' : 'opacity-55'} ${align === 'right' ? 'flex-row-reverse' : ''}`}>
      <span className="font-mono text-[8px] font-bold text-mutedForeground tabular-nums">#{seed}</span>
      <span
        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[7px] font-black text-white"
        style={{ background: color }}
      >
        {team.slice(0, 1)}
      </span>
      <span className={`truncate text-[10px] font-bold ${winner ? 'text-foreground' : 'text-mutedForeground'}`}>
        {team}
      </span>
      {winner && align === 'left' && <span className="text-[9px] font-bold text-[#a855f7]">▸</span>}
      {winner && align === 'right' && <span className="text-[9px] font-bold text-[#a855f7]">◂</span>}
    </div>
  );
}
