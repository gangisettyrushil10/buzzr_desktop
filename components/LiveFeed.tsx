'use client';

type FeedItem =
  | { kind: 'event'; league: string; name: string; dateShort: string; live?: boolean }
  | { kind: 'review'; game: string; quote: string; rating: string };

const FEED_ITEMS: FeedItem[] = [
  { kind: 'event',  league: 'NCAAB', name: 'March Madness 2026',       dateShort: 'LIVE NOW', live: true },
  { kind: 'review', game: 'March Madness 2026 · R64', quote: 'That last-second heave. The whole building froze. Chaos 10, no debate.', rating: 'Chaos 10/10' },
  { kind: 'event',  league: 'NBA',   name: 'Playoff Race Heating Up',  dateShort: 'Apr 2026' },
  { kind: 'review', game: 'Super Bowl LX · Feb 2026', quote: 'Super Bowl overtime and somehow I was more nervous than the players.', rating: 'Drama 9.9/10' },
  { kind: 'event',  league: 'NHL',   name: 'NHL Playoffs 2026',        dateShort: 'Apr 2026' },
  { kind: 'review', game: 'NBA · Thunder vs Nuggets, Feb 22', quote: 'Three overtimes. Lost my voice before halftime — watching alone.', rating: 'Energy 9.7/10' },
  { kind: 'event',  league: 'FIFA',  name: 'FIFA World Cup 2026',      dateShort: 'Jun 2026' },
  { kind: 'review', game: 'FIFA World Cup 2022 · Argentina vs France', quote: 'Cried. Actually cried. That game took years off my life.', rating: 'Entertainment 10/10' },
  { kind: 'event',  league: 'NCAAB', name: 'Sweet 16 — On Deck',       dateShort: 'Mar 27' },
  { kind: 'review', game: 'NCAAB · Florida vs Houston, 2025', quote: 'My whole group chat was rating in real time. Never watched the same way since.', rating: 'Clutch 9.5/10' },
  { kind: 'event',  league: 'NBA',   name: 'Regular Season Stretch Run', dateShort: 'Mar 2026' },
  { kind: 'review', game: 'NFL · Chiefs vs Bills, 2022 Divisional', quote: 'Could not breathe the last five minutes. We were all just screaming.', rating: 'Chaos 10/10' },
];

export function LiveFeed() {
  // Duplicate for seamless loop
  const items = [...FEED_ITEMS, ...FEED_ITEMS];

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden min-[1800px]:flex flex-col w-44">
      {/* Header */}
      <div className="flex items-center gap-2 px-2 pb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse shrink-0" aria-hidden />
        <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-white/35">
          Buzzr Feed
        </span>
      </div>

      {/* Feed window */}
      <div
        className="overflow-hidden border border-white/[0.07] bg-black/55 backdrop-blur-md"
        style={{ height: '62vh' }}
        aria-label="Live Buzzr feed"
        aria-live="off"
      >
        {/* Top fade */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 z-10"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)' }}
          aria-hidden
        />

        {/* Scrolling content */}
        <div className="animate-feed-scroll">
          {items.map((item, i) => (
            <div
              key={i}
              className="px-3 py-2.5 border-b border-white/[0.06] last:border-0"
            >
              {item.kind === 'event' ? (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-sans uppercase tracking-[0.2em] text-buzzr-accent/65 shrink-0">
                      {item.league}
                    </span>
                    {item.live && (
                      <span className="text-[7px] font-sans uppercase tracking-wider text-red-400 bg-red-500/15 px-1 py-px">
                        live
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] font-sans leading-snug text-white/65">
                    {item.name}
                  </p>
                  <p className="text-[9px] font-sans text-white/28 tracking-wide">
                    {item.dateShort}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <p className="text-[8px] font-sans uppercase tracking-[0.2em] text-buzzr-accent/55">
                    {item.rating}
                  </p>
                  <p className="text-[10px] font-sans leading-snug text-white/55 italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <p className="text-[8px] font-sans text-white/22 leading-snug">
                    {item.game}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 z-10"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)' }}
          aria-hidden
        />
      </div>
    </div>
  );
}
