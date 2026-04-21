'use client';

/**
 * useBuzzScene — one master clock that drives every widget in the DataBento
 * section. All cards subscribe to the same timeline so they tell *one*
 * 8-second story of a single basketball moment (OKC @ DEN, 4Q → OT → FINAL)
 * in lockstep.
 *
 * Timeline (ms):
 *   0     idle       OKC 94, DEN 82, 4Q 4:18. Buzz 7.4. WinProb 88/12.
 *   800   run1       DEN +2  (84). Event row.   WinProb → 82.
 *   1600  run2       DEN +2  (86). 10-0 run.    Chaos lights.
 *   2400  run3       DEN +2  (88). Clutch caps.
 *   3200  catchup    DEN +2  (90). Buzz 7.4 → 8.3.
 *   4000  tied       94-94. Clutch = 6/6. Buzz 8.9.
 *   5000  overtime   OT. Votes flood fire (40 → 75%). AuraRing intensifies.
 *   6000  final      DEN 115, OKC 112. Buzz 9.2. Pollen +12. Swipes +1.
 *   7000  reactions  Swarm avatars pop. "3 friends rated 10."
 *   8000  loop back.
 *
 * The loop is driven by requestAnimationFrame. It is gated by:
 *   - IntersectionObserver on the section wrapper (threshold 0.3)
 *   - document.visibilitychange (pause while the tab is hidden)
 *   - prefers-reduced-motion (snap to final state, no loop)
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from 'react';

export const LOOP_MS = 8000;
const HOLD_MS = 600; // brief hold at the end before the loop resets

export type Phase =
  | 'idle'
  | 'run1'
  | 'run2'
  | 'run3'
  | 'catchup'
  | 'tied'
  | 'overtime'
  | 'final'
  | 'reactions';

export type FeatureKey = 'chaos' | 'clutch' | 'crowd' | 'rivalry' | 'ot' | 'upset';

export type SceneEvent = {
  id: string;
  atMs: number;
  ts: string;
  provider: string;
  providerColor: string;
  body: string;
};

export type SceneReaction = {
  id: string;
  atMs: number;
  emoji: string;
  user: string;
};

type TeamInfo = {
  code: string;
  name: string;
  color: string;
  logoUrl: string;
};

type Keyframe = {
  t: number;
  phase: Phase;
  awayScore: number;
  homeScore: number;
  clock: string;
  periodLabel: string;
  winProbAway: number;
  buzz: number;
  voteFire: number;
  voteTotal: number;
  features: Record<FeatureKey, number>;
  pollenLifetime: number;
  swipeCount: number;
};

const AWAY: TeamInfo = {
  code: 'OKC',
  name: 'Thunder',
  color: '#007AC1',
  logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/okc.png'
};

const HOME: TeamInfo = {
  code: 'DEN',
  name: 'Nuggets',
  color: '#0E2240',
  logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/den.png'
};

const KEYFRAMES: Keyframe[] = [
  {
    t: 0,
    phase: 'idle',
    awayScore: 94,
    homeScore: 82,
    clock: '4:18',
    periodLabel: '4Q',
    winProbAway: 0.88,
    buzz: 7.4,
    voteFire: 0.40,
    voteTotal: 412,
    features: { chaos: 0.30, clutch: 0.25, crowd: 0.35, rivalry: 0.55, ot: 0.00, upset: 0.10 },
    pollenLifetime: 1218,
    swipeCount: 12
  },
  {
    t: 800,
    phase: 'run1',
    awayScore: 94,
    homeScore: 84,
    clock: '4:02',
    periodLabel: '4Q',
    winProbAway: 0.82,
    buzz: 7.6,
    voteFire: 0.44,
    voteTotal: 468,
    features: { chaos: 0.45, clutch: 0.35, crowd: 0.48, rivalry: 0.60, ot: 0.00, upset: 0.18 },
    pollenLifetime: 1218,
    swipeCount: 12
  },
  {
    t: 1600,
    phase: 'run2',
    awayScore: 94,
    homeScore: 86,
    clock: '3:27',
    periodLabel: '4Q',
    winProbAway: 0.74,
    buzz: 7.9,
    voteFire: 0.50,
    voteTotal: 612,
    features: { chaos: 0.65, clutch: 0.50, crowd: 0.64, rivalry: 0.64, ot: 0.00, upset: 0.34 },
    pollenLifetime: 1218,
    swipeCount: 12
  },
  {
    t: 2400,
    phase: 'run3',
    awayScore: 94,
    homeScore: 88,
    clock: '2:44',
    periodLabel: '4Q',
    winProbAway: 0.66,
    buzz: 8.2,
    voteFire: 0.56,
    voteTotal: 884,
    features: { chaos: 0.78, clutch: 0.72, crowd: 0.76, rivalry: 0.68, ot: 0.00, upset: 0.52 },
    pollenLifetime: 1218,
    swipeCount: 12
  },
  {
    t: 3200,
    phase: 'catchup',
    awayScore: 94,
    homeScore: 90,
    clock: '1:58',
    periodLabel: '4Q',
    winProbAway: 0.58,
    buzz: 8.5,
    voteFire: 0.62,
    voteTotal: 1120,
    features: { chaos: 0.86, clutch: 0.86, crowd: 0.84, rivalry: 0.72, ot: 0.00, upset: 0.64 },
    pollenLifetime: 1218,
    swipeCount: 12
  },
  {
    t: 4000,
    phase: 'tied',
    awayScore: 94,
    homeScore: 94,
    clock: '0:42',
    periodLabel: '4Q',
    winProbAway: 0.50,
    buzz: 8.8,
    voteFire: 0.68,
    voteTotal: 1438,
    features: { chaos: 0.92, clutch: 1.00, crowd: 0.92, rivalry: 0.78, ot: 0.20, upset: 0.76 },
    pollenLifetime: 1218,
    swipeCount: 12
  },
  {
    t: 5000,
    phase: 'overtime',
    awayScore: 102,
    homeScore: 102,
    clock: 'OT 4:22',
    periodLabel: 'OT',
    winProbAway: 0.46,
    buzz: 9.0,
    voteFire: 0.75,
    voteTotal: 1862,
    features: { chaos: 0.96, clutch: 1.00, crowd: 0.98, rivalry: 0.84, ot: 1.00, upset: 0.82 },
    pollenLifetime: 1218,
    swipeCount: 12
  },
  {
    t: 6000,
    phase: 'final',
    awayScore: 112,
    homeScore: 115,
    clock: 'FINAL',
    periodLabel: 'FINAL',
    winProbAway: 0.0,
    buzz: 9.2,
    voteFire: 0.87,
    voteTotal: 2417,
    features: { chaos: 1.00, clutch: 1.00, crowd: 1.00, rivalry: 0.90, ot: 1.00, upset: 0.92 },
    pollenLifetime: 1230,
    swipeCount: 13
  },
  {
    t: 7000,
    phase: 'reactions',
    awayScore: 112,
    homeScore: 115,
    clock: 'FINAL',
    periodLabel: 'FINAL',
    winProbAway: 0.0,
    buzz: 9.2,
    voteFire: 0.90,
    voteTotal: 2608,
    features: { chaos: 1.00, clutch: 1.00, crowd: 1.00, rivalry: 0.92, ot: 1.00, upset: 0.95 },
    pollenLifetime: 1230,
    swipeCount: 13
  }
];

const EVENTS: readonly SceneEvent[] = [
  { id: 'e1', atMs: 800,  ts: '4:02', provider: 'ESPN',        providerColor: '#CC0000', body: 'DEN +2 · Murray step-back' },
  { id: 'e2', atMs: 1600, ts: '3:27', provider: 'ESPN',        providerColor: '#CC0000', body: 'DEN +2 · 10-0 run' },
  { id: 'e3', atMs: 2400, ts: '2:44', provider: 'ESPN',        providerColor: '#CC0000', body: 'DEN +2 · Jokic assist' },
  { id: 'e4', atMs: 3200, ts: '1:58', provider: 'Google News', providerColor: '#4285F4', body: 'Headline · "Nuggets mount epic comeback"' },
  { id: 'e5', atMs: 4000, ts: '0:42', provider: 'ESPN',        providerColor: '#CC0000', body: 'Tied 94-94 · clutch window' },
  { id: 'e6', atMs: 5000, ts: 'OT',   provider: 'ESPN',        providerColor: '#CC0000', body: '4Q ends · overtime' },
  { id: 'e7', atMs: 5400, ts: 'OT',   provider: 'YouTube',     providerColor: '#FF0000', body: 'Highlight indexed · final 2m' },
  { id: 'e8', atMs: 6000, ts: 'FINAL',provider: 'ESPN',        providerColor: '#CC0000', body: 'Final · DEN 115, OKC 112' },
  { id: 'e9', atMs: 6600, ts: 'FINAL',provider: 'Supabase',    providerColor: '#3ECF8E', body: 'Push fanout · 2.4k users' },
  { id: 'e10',atMs: 7100, ts: 'FINAL',provider: 'Claude',      providerColor: '#D97757', body: 'Recap summary generated' }
];

const REACTIONS: readonly SceneReaction[] = [
  { id: 'r1', atMs: 7000, emoji: '🔥', user: 'tonymad' },
  { id: 'r2', atMs: 7200, emoji: '🔥', user: 'hoopshead' },
  { id: 'r3', atMs: 7500, emoji: '💯', user: 'soccerphil' },
  { id: 'r4', atMs: 7800, emoji: '🔥', user: 'mk' }
];

export type SceneValue = {
  t: number;
  phase: Phase;
  progress: number;
  away: TeamInfo & { score: number };
  home: TeamInfo & { score: number };
  clock: string;
  periodLabel: string;
  winProbAway: number;
  buzz: number;
  bandColor: string;
  bandLabel: string;
  features: Record<FeatureKey, number>;
  voteFire: number;
  voteTotal: number;
  pollenLifetime: number;
  pollenLevel: number;
  pollenLevelFloor: number;
  pollenLevelCeiling: number;
  swipeCount: number;
  events: SceneEvent[];
  reactions: SceneReaction[];
  reduceMotion: boolean;
  running: boolean;
};

const BANDS = [
  { min: 9, color: '#00e676', label: 'Elite' },
  { min: 7, color: '#22c55e', label: 'Good' },
  { min: 5, color: '#f59e0b', label: 'Mid'  },
  { min: 3, color: '#ef4444', label: 'Meh'  },
  { min: 0, color: '#7c3aed', label: 'Bad'  }
];

function ratingBand(score: number) {
  return BANDS.find((b) => score >= b.min) ?? BANDS[BANDS.length - 1];
}

/** Pollen level thresholds: simple sqrt scale — 100 XP to Lv2, then quadratic. */
function pollenLevel(total: number): { level: number; floor: number; ceiling: number } {
  // Thresholds: 0, 100, 260, 480, 760, 1100, 1500, 1960, 2480, 3060
  const thresholds = [0, 100, 260, 480, 760, 1100, 1500, 1960, 2480, 3060, 3700];
  let level = 0;
  for (let i = 0; i < thresholds.length - 1; i++) {
    if (total >= thresholds[i] && total < thresholds[i + 1]) {
      level = i + 1;
      return { level, floor: thresholds[i], ceiling: thresholds[i + 1] };
    }
  }
  level = thresholds.length;
  return { level, floor: thresholds[thresholds.length - 2], ceiling: thresholds[thresholds.length - 1] };
}

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function lerp(a: number, b: number, x: number) {
  return a + (b - a) * x;
}

function lerpFeatures(
  a: Record<FeatureKey, number>,
  b: Record<FeatureKey, number>,
  x: number
): Record<FeatureKey, number> {
  return {
    chaos:   lerp(a.chaos,   b.chaos,   x),
    clutch:  lerp(a.clutch,  b.clutch,  x),
    crowd:   lerp(a.crowd,   b.crowd,   x),
    rivalry: lerp(a.rivalry, b.rivalry, x),
    ot:      lerp(a.ot,      b.ot,      x),
    upset:   lerp(a.upset,   b.upset,   x)
  };
}

function computeScene(tMs: number, reduceMotion: boolean, running: boolean): SceneValue {
  const t = reduceMotion ? LOOP_MS - 1 : Math.min(tMs, LOOP_MS - 1);

  // Find bracketing keyframes.
  let i = 0;
  for (let j = 0; j < KEYFRAMES.length - 1; j++) {
    if (t >= KEYFRAMES[j].t && t < KEYFRAMES[j + 1].t) {
      i = j;
      break;
    }
    if (t >= KEYFRAMES[KEYFRAMES.length - 1].t) {
      i = KEYFRAMES.length - 1;
    }
  }

  const a = KEYFRAMES[i];
  const b = KEYFRAMES[Math.min(i + 1, KEYFRAMES.length - 1)];
  const span = Math.max(1, b.t - a.t);
  const x = clamp01((t - a.t) / span);

  // Scores step at keyframe boundaries — no mid-play counts.
  const awayScore = a.awayScore;
  const homeScore = a.homeScore;

  const buzz        = lerp(a.buzz,        b.buzz,        x);
  const winProbAway = lerp(a.winProbAway, b.winProbAway, x);
  const voteFire    = lerp(a.voteFire,    b.voteFire,    x);
  const voteTotal   = Math.round(lerp(a.voteTotal, b.voteTotal, x));
  const features    = lerpFeatures(a.features, b.features, x);

  const pollenLifetime = Math.round(lerp(a.pollenLifetime, b.pollenLifetime, x));
  const swipeCount     = a.swipeCount; // stepwise

  const band = ratingBand(buzz);
  const plvl = pollenLevel(pollenLifetime);

  const events = EVENTS.filter((e) => e.atMs <= tMs);
  const reactions = REACTIONS.filter((r) => r.atMs <= tMs);

  return {
    t,
    phase: a.phase,
    progress: t / LOOP_MS,
    away: { ...AWAY, score: awayScore },
    home: { ...HOME, score: homeScore },
    clock: a.clock,
    periodLabel: a.periodLabel,
    winProbAway,
    buzz,
    bandColor: band.color,
    bandLabel: band.label,
    features,
    voteFire,
    voteTotal,
    pollenLifetime,
    pollenLevel: plvl.level,
    pollenLevelFloor: plvl.floor,
    pollenLevelCeiling: plvl.ceiling,
    swipeCount,
    events,
    reactions,
    reduceMotion,
    running
  };
}

const SceneContext = createContext<SceneValue | null>(null);

export function BuzzSceneProvider({ children }: { children: ReactNode }) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [tMs, setTMs] = useState(0);

  // Reduced-motion detection
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Tab visibility
  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    onVis();
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // IntersectionObserver on the sentinel
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Master rAF loop
  const running = inView && visible && !reduceMotion;
  useEffect(() => {
    if (!running) return;

    let raf = 0;
    let start: number | null = null;
    const loop = (now: number) => {
      if (start == null) start = now - tMs; // resume from current t
      const elapsed = now - start;
      const next = elapsed % (LOOP_MS + HOLD_MS);
      setTMs(Math.min(next, LOOP_MS - 1));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  // When user prefers reduced motion, snap to final state and hold.
  useEffect(() => {
    if (reduceMotion) setTMs(LOOP_MS - 1);
  }, [reduceMotion]);

  const scene = useMemo(
    () => computeScene(tMs, reduceMotion, running),
    [tMs, reduceMotion, running]
  );

  return (
    <SceneContext.Provider value={scene}>
      <div ref={sentinelRef}>{children}</div>
    </SceneContext.Provider>
  );
}

export function useBuzzScene(): SceneValue {
  const ctx = useContext(SceneContext);
  if (!ctx) {
    throw new Error('useBuzzScene must be used inside <BuzzSceneProvider>.');
  }
  return ctx;
}
