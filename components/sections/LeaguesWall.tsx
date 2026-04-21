import { Marquee } from '@/components/Marquee';
import { LEAGUES, SPORT_LABELS, SPORT_ORDER, type League, type LeagueSport } from '@/src/lib/constants';
import { LeagueChip } from '@/components/sections/LeagueChip';

const GROUPED: Record<LeagueSport, League[]> = SPORT_ORDER.reduce(
  (acc, sport) => {
    acc[sport] = LEAGUES.filter((l) => l.sport === sport);
    return acc;
  },
  {} as Record<LeagueSport, League[]>
);

export function LeaguesWall() {
  return (
    <section
      id="leagues"
      aria-labelledby="leagues-title"
      className="relative scroll-mt-24"
    >
      {/* Full-bleed divider marquee above the wall */}
      <div aria-hidden className="mx-auto w-full max-w-[1400px] px-6 pt-28 md:pt-36">
        <Marquee speed={45} />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-28 pt-16 md:pb-36 md:pt-20">
        <div
          aria-hidden
          className="accent-glow-soft pointer-events-none absolute left-0 top-4 h-[320px] w-[440px] rounded-full opacity-70"
        />
        <header className="relative mb-12 max-w-[52ch]">
          <h2
            id="leagues-title"
            className="font-display text-[clamp(32px,5vw,56px)] font-light leading-[0.98] tracking-[-0.035em] text-foreground"
          >
            Every league you actually watch.
          </h2>
          <p className="mt-5 text-sm font-light leading-relaxed text-mutedForeground/80">
            From NBA Playoffs to the FIFA World Cup 2026 to March Madness first-round upsets,
            Buzzr rates every game that actually matters. Track upcoming events, rate live games
            as they finish, log historical classics to your profile, and host Watch Parties with
            friends to rate in real time. No spreads. No lines. No gambling. Just entertainment
            scoring for fans who care what was worth watching.
          </p>
        </header>

        <div className="flex flex-col divide-y divide-white/[0.06]">
          {SPORT_ORDER.map((sport) => {
            const leagues = GROUPED[sport];
            if (leagues.length === 0) return null;
            return (
              <div
                key={sport}
                className="grid grid-cols-1 gap-3 py-5 md:grid-cols-[160px_1fr] md:gap-6"
              >
                <div className="font-medium text-[10px] uppercase tracking-[0.24em] text-mutedForeground md:pt-1.5">
                  {SPORT_LABELS[sport]}
                </div>
                <ul className="flex flex-wrap gap-2">
                  {leagues.map((l) => (
                    <li key={l.label}>
                      <LeagueChip league={l} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-xs font-light text-mutedForeground">
          Live scores. More on the way.
        </p>
      </div>
    </section>
  );
}
