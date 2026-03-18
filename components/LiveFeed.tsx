'use client';

type FeedItem =
  | { kind: 'score';    league: string; home: string; away: string; homeScore: number; awayScore: number; clock: string; live: true; homeSeed?: number; awaySeed?: number }
  | { kind: 'news';     league: string; headline: string; time: string }
  | { kind: 'rating';   user: string; game: string; score: number; dimension: string }
  | { kind: 'reaction'; user: string; game: string; quote: string };

const FEED_ITEMS: FeedItem[] = [
  { kind: 'score',    league: 'NCAAB', home: 'Duke',     away: 'UNC',      homeScore: 67, awayScore: 71, clock: '2nd · 8:42', live: true, homeSeed: 4, awaySeed: 13 },
  { kind: 'news',     league: 'NCAAB', headline: '#13 seed stuns #4 seed in OT — Buzzr score: 9.8', time: '2m ago' },
  { kind: 'rating',   user: 'jalen_w', game: 'Duke vs UNC · R64', score: 9.4, dimension: 'Drama' },
  { kind: 'score',    league: 'NBA',   home: 'OKC',      away: 'DEN',      homeScore: 104, awayScore: 98, clock: '4Q · 3:11', live: true },
  { kind: 'reaction', user: 'hoopshead', game: 'Duke vs UNC', quote: 'I stood up and my chair fell over. Still shaking.' },
  { kind: 'news',     league: 'NBA',   headline: 'OKC clinches playoff spot with late-game run', time: '11m ago' },
  { kind: 'rating',   user: 'soccerphil', game: 'Argentina vs France · WC Final', score: 10, dimension: 'Chaos' },
  { kind: 'score',    league: 'NHL',   home: 'FLA',      away: 'TOR',      homeScore: 3,  awayScore: 2,  clock: '3rd · 1:58 OT', live: true },
  { kind: 'reaction', user: 'madness26', game: 'March Madness R64', quote: 'That buzzer beater is going in the hall of fame. Chaos 10.' },
  { kind: 'news',     league: 'NHL',   headline: 'Florida and Toronto heading to OT — third straight game', time: '4m ago' },
  { kind: 'rating',   user: 'clutch_k', game: 'Chiefs vs Eagles · SB LX', score: 9.9, dimension: 'Drama' },
  { kind: 'reaction', user: 'nhlnerd', game: 'FLA vs TOR · Game 4', quote: 'Every single game goes to overtime. My heart cannot do this.' },
  { kind: 'news',     league: 'NCAAB', headline: 'Sweet 16 bracket taking shape — three #1 seeds survive weekend', time: '18m ago' },
  { kind: 'score',    league: 'NCAAB', home: 'Gonzaga',  away: 'Illinois', homeScore: 55, awayScore: 58, clock: '2nd · 4:20', live: true, homeSeed: 2, awaySeed: 10 },
  { kind: 'rating',   user: 'brianf',  game: 'OKC vs DEN · Feb 22', score: 9.7, dimension: 'Energy' },
  { kind: 'reaction', user: 'bballer_',  game: 'Gonzaga vs Illinois', quote: 'Illinois is cooking right now. Feed is going insane.' },
  { kind: 'news',     league: 'FIFA',  headline: 'World Cup 2026 venues confirmed — 16 cities across US, Canada, Mexico', time: '1h ago' },
  { kind: 'rating',   user: 'dramaqueen', game: 'SD State vs FAU · Final Four 2023', score: 9.8, dimension: 'Clutch' },
  { kind: 'reaction', user: 'tonymad', game: 'Chiefs vs Eagles · SB LX', quote: 'Overtime at the Super Bowl. I genuinely forgot to breathe.' },
  { kind: 'news',     league: 'NBA',   headline: 'Playoff seeding picture: 7 teams within 2 games of each other in the West', time: '34m ago' },
];

function ScoreBar({ value }: { value: number }) {
  const pct = Math.min(100, (value / 10) * 100);
  return (
    <div className="h-0.5 w-full bg-white/10 mt-1">
      <div className="h-full bg-buzzr-accent/70" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function LiveFeed() {
  const items = [...FEED_ITEMS, ...FEED_ITEMS];

  return (
    <div className="fixed left-4 top-20 bottom-6 z-40 hidden xl:flex flex-col w-52 rounded-2xl border border-white/[0.10] bg-black/70 backdrop-blur-md overflow-hidden">

      {/* Header — pinned */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.07] shrink-0">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse shrink-0" aria-hidden />
        <span className="text-[9px] font-sans uppercase tracking-[0.4em] text-white/40">
          Buzzr Feed
        </span>
      </div>

      {/* Scrolling area */}
      <div className="flex-1 overflow-hidden relative" aria-label="Live Buzzr feed" aria-live="off">

        {/* Top fade */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-6 z-10"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)' }}
          aria-hidden
        />

        {/* Animated list */}
        <div className="animate-feed-scroll">
          {items.map((item, i) => (
            <div key={i} className="px-4 py-3 border-b border-white/[0.05]">

              {item.kind === 'score' && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-sans uppercase tracking-[0.25em] text-buzzr-accent/60">
                      {item.league}
                    </span>
                    <span className="text-[7px] font-sans uppercase tracking-wider text-red-400 bg-red-500/15 px-1.5 py-px">
                      live
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {item.homeSeed && (
                        <span className="text-[8px] font-sans text-white/30 tabular-nums w-4 shrink-0">{item.homeSeed}</span>
                      )}
                      <span className="text-[11px] font-sans font-semibold uppercase text-white/80 truncate">{item.home}</span>
                    </div>
                    <span className="text-sm font-sans font-bold tabular-nums text-white shrink-0">{item.homeScore}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {item.awaySeed && (
                        <span className="text-[8px] font-sans text-white/30 tabular-nums w-4 shrink-0">{item.awaySeed}</span>
                      )}
                      <span className="text-[11px] font-sans font-semibold uppercase text-white/80 truncate">{item.away}</span>
                    </div>
                    <span className="text-sm font-sans font-bold tabular-nums text-white shrink-0">{item.awayScore}</span>
                  </div>
                  <p className="text-[8px] font-sans text-white/30 tracking-wide">{item.clock}</p>
                </div>
              )}

              {item.kind === 'news' && (
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-sans uppercase tracking-[0.2em] text-white/30">
                    {item.league} · {item.time}
                  </span>
                  <p className="text-[10px] font-sans leading-snug text-white/60">
                    {item.headline}
                  </p>
                </div>
              )}

              {item.kind === 'rating' && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-sans text-white/30">@{item.user}</span>
                    <span className="text-[8px] font-sans uppercase tracking-[0.2em] text-buzzr-accent/60">
                      {item.dimension}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-sans font-bold text-lg leading-none text-white tabular-nums">{item.score}</span>
                    <span className="text-[8px] font-sans text-white/25">/10</span>
                  </div>
                  <ScoreBar value={item.score} />
                  <p className="text-[8px] font-sans text-white/25 mt-0.5 leading-snug">{item.game}</p>
                </div>
              )}

              {item.kind === 'reaction' && (
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-sans text-white/28">@{item.user}</span>
                  <p className="text-[10px] font-sans leading-snug text-white/55 italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <p className="text-[8px] font-sans text-white/20 leading-snug">{item.game}</p>
                </div>
              )}

            </div>
          ))}
        </div>

        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 z-10"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)' }}
          aria-hidden
        />
      </div>
    </div>
  );
}
