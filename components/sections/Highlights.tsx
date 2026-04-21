import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { GlassCard } from '@/components/ui/GlassCard';
import { getLeagueLogo } from '@/src/lib/leagueLogos';

type Clip = {
  league: string;
  leagueName: string;       // key for logo lookup
  tint: string;             // league brand color for the poster
  matchup: string;
  subtitle: string;         // stadium / final score
  duration: string;         // 9:42
  buzz: number;
  views: string;            // 1.2M
  teams: [string, string];  // 2-letter abbreviations to composite on poster
};

const CLIPS: Clip[] = [
  {
    league: 'NBA',
    leagueName: 'NBA',
    tint: '#F88D24',
    matchup: 'Thunder @ Nuggets',
    subtitle: 'Ball Arena · OKC 112, DEN 109',
    duration: '9:42',
    buzz: 9.2,
    views: '1.4M',
    teams: ['OKC', 'DEN']
  },
  {
    league: 'NHL',
    leagueName: 'NHL',
    tint: '#014EAA',
    matchup: 'Panthers @ Maple Leafs',
    subtitle: 'Scotiabank · OT · FLA 4, TOR 3',
    duration: '6:18',
    buzz: 9.6,
    views: '820k',
    teams: ['FLA', 'TOR']
  },
  {
    league: 'EPL',
    leagueName: 'EPL',
    tint: '#3D195B',
    matchup: 'Arsenal v Spurs',
    subtitle: 'Emirates · ARS 2, TOT 1',
    duration: '5:27',
    buzz: 8.6,
    views: '3.1M',
    teams: ['ARS', 'TOT']
  },
  {
    league: 'NCAAM',
    leagueName: 'NCAAM',
    tint: '#6C5CE7',
    matchup: 'Yale v Auburn',
    subtitle: 'OT thriller · #13 over #4',
    duration: '8:04',
    buzz: 9.8,
    views: '612k',
    teams: ['YAL', 'AUB']
  }
];

export function Highlights() {
  return (
    <section
      id="highlights"
      aria-labelledby="highlights-title"
      className="relative mx-auto w-full max-w-[1200px] px-6 py-28 md:py-36 scroll-mt-24"
    >
      <div
        aria-hidden
        className="accent-glow-soft pointer-events-none absolute -top-16 left-0 h-[320px] w-[440px] rounded-full opacity-70"
      />
      <header className="relative mb-12 grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-12">
        <h2
          id="highlights-title"
          className="max-w-[18ch] font-display text-[clamp(32px,5vw,56px)] font-light leading-[0.98] tracking-[-0.035em] text-foreground"
        >
          Wake up. Watch last night.
        </h2>
        <p className="max-w-[34ch] text-sm font-light leading-relaxed text-mutedForeground lg:text-right">
          Official
          {' '}<FontAwesomeIcon icon={faYoutube} className="mx-1 h-3.5 w-3.5 text-red-500" aria-hidden />{' '}
          reels. Ranked. Ready at 7 AM.
        </p>
      </header>

      {/* Stats strip */}
      <dl className="glass-1 mb-8 grid grid-cols-2 gap-4 rounded-md px-5 py-4 md:grid-cols-4">
        <Fact value="7 AM" label="local delivery" />
        <Fact value="9" label="sports covered" />
        <Fact value="25" label="leagues" />
        <Fact value="≤ 10 min" label="per reel" />
      </dl>

      {/* Clip grid */}
      <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CLIPS.map((c) => (
          <li key={c.matchup}>
            <ClipCard clip={c} />
          </li>
        ))}
      </ul>

      <p className="mt-8 text-xs font-light text-mutedForeground">
        Official channels. We link out, never rehost.
      </p>
    </section>
  );
}

function ClipCard({ clip }: { clip: Clip }) {
  const logo = getLeagueLogo(clip.leagueName);
  return (
    <GlassCard
      level={1}
      hoverLift
      className="group flex flex-col overflow-hidden p-0"
    >
      {/* Poster , gradient + league watermark + team abbreviations composited */}
      <div
        className="relative aspect-video w-full overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 0% 0%, ${clip.tint}66 0%, transparent 60%),
            radial-gradient(ellipse 80% 60% at 100% 100%, ${clip.tint}33 0%, transparent 55%),
            linear-gradient(145deg, #0d0d10 0%, #161619 50%, #0d0d10 100%)
          `
        }}
      >
        {/* Faint league watermark */}
        {logo && (
          <Image
            src={logo}
            alt=""
            aria-hidden
            width={140}
            height={140}
            sizes="140px"
            className="pointer-events-none absolute -right-6 -bottom-6 h-[140px] w-[140px] object-contain opacity-[0.08]"
          />
        )}

        {/* Team abbreviation composition */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-[52px] font-light tracking-[-0.04em] text-white/85">
            {clip.teams[0]}
          </span>
          <span className="mx-3 font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
            vs
          </span>
          <span className="font-display text-[52px] font-light tracking-[-0.04em] text-white/85">
            {clip.teams[1]}
          </span>
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/55 ring-1 ring-white/20 backdrop-blur-sm transition-all group-hover:scale-[1.08] group-hover:bg-red-600/90">
            <FontAwesomeIcon icon={faYoutube} className="h-6 w-6 text-white" aria-hidden />
          </span>
        </div>

        {/* Top-left badge: league chip */}
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-pill bg-black/55 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.22em] text-foreground backdrop-blur-sm">
          {logo && (
            <span className="inline-flex h-3.5 w-3.5 items-center justify-center overflow-hidden rounded-full bg-white">
              <Image src={logo} alt="" width={11} height={11} sizes="11px" className="h-[11px] w-[11px] object-contain" />
            </span>
          )}
          {clip.league}
        </div>

        {/* Top-right: buzz pill */}
        <div className="absolute right-3 top-3 rounded-pill bg-buzzr-accent/95 px-2 py-1 font-mono text-[10px] font-bold text-buzzr-onAccent">
          {clip.buzz.toFixed(1)}
        </div>

        {/* Bottom-right: duration */}
        <div className="absolute bottom-3 right-3 rounded-sm bg-black/75 px-1.5 py-0.5 font-mono text-[10px] font-medium tabular-nums text-white">
          {clip.duration}
        </div>
      </div>

      {/* Meta row */}
      <div className="flex flex-col gap-1 p-4">
        <h3 className="truncate font-display text-[15px] font-light leading-snug text-foreground">
          {clip.matchup}
        </h3>
        <p className="truncate text-[11px] font-light text-mutedForeground">
          {clip.subtitle}
        </p>
        <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-buzzr-ink-60">
          <span>{clip.views} views</span>
          <span className="inline-flex items-center gap-1">
            <FontAwesomeIcon icon={faYoutube} className="h-3 w-3 text-red-500" aria-hidden />
            official
          </span>
        </div>
      </div>
    </GlassCard>
  );
}

function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="order-2 font-light text-[10px] uppercase tracking-[0.18em] text-mutedForeground">
        {label}
      </dt>
      <dd className="order-1 font-mono text-[18px] font-medium tabular-nums text-foreground md:text-[20px]">
        {value}
      </dd>
    </div>
  );
}
