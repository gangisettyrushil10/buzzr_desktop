import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, BASE_URL } from '@/src/lib/constants';

const PAGE_TITLE = `Changelog · ${SITE_NAME}`;
const PAGE_DESCRIPTION =
  'What shipped on Buzzr — every release from the TestFlight launch through today, with the features added, the pivots made, and the things we removed.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/changelog' },
  openGraph: {
    type: 'article',
    url: `${BASE_URL}/changelog`,
    siteName: SITE_NAME,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    site: '@the_real_buzzr',
    creator: '@the_real_buzzr'
  }
};

type Group = {
  heading: string;
  items: string[];
};

type Release = {
  version: string;
  date: string;
  tag?: 'current' | 'major' | 'patch';
  headline: string;
  groups: Group[];
  removed?: string[];
};

const RELEASES: ReadonlyArray<Release> = [
  {
    version: '1.3.1',
    date: 'May 2026',
    tag: 'current',
    headline: 'Custom dashboards, sharper search, faster cold starts.',
    groups: [
      {
        heading: 'Dashboard',
        items: [
          'Custom page names — pages aren\'t locked to leagues',
          'Live layout preview in the Edit Page sheet',
          'Visible save signal + undo for destructive entity edits',
          'Pre-deploy hardening of auto-save + race-condition fixes',
          'Block last-page delete that would orphan a workspace',
          'Long-press chip → contextual rename / duplicate / delete',
          'Workspace switch + set-default persist immediately'
        ]
      },
      {
        heading: 'Universal Search',
        items: [
          'Players, news articles, and squads all searchable in one bar',
          'Team + position metadata on player rows',
          'pg_trgm GIN indexes for sub-100ms username lookups',
          'Visible header search pill replaces the old tap-target icon'
        ]
      },
      {
        heading: 'Performance',
        items: [
          'Pause LivingArenaBackground while the swipe screen is off-screen',
          'Cache swipe preferences and memoize the game-card gradient',
          'Cut card re-renders, shrink off-screen window, recycle images',
          'Unblock first paint from auth retry backoff',
          'Card-shaped skeleton on cold-start instead of a centered spinner'
        ]
      },
      {
        heading: 'Hardening',
        items: [
          'Route-level ErrorBoundary on dashboard + swipe tabs',
          'Five blocker bugs from TestFlight review (onboarding, drag-handle, dismiss flows)',
          'Five quick wins from TestFlight feedback batch',
          'Notifications mark-all-read keeps inbox + clears bell dot',
          'Wire haptics + high-contrast toggles end-to-end'
        ]
      }
    ]
  },
  {
    version: '1.3.0',
    date: 'May 2026',
    tag: 'major',
    headline: 'Dashboard re-architecture, group chat v2, and a universal share registry.',
    groups: [
      {
        heading: 'Dashboard re-architecture',
        items: [
          'Heterogeneous entity pages — mix teams, players, leagues, games on a single page',
          'Multi-team support — up to 8 players + 2 additional teams per page',
          'New EntityRef discriminated union replaces the rigid primary/secondary team model',
          'Backward-compatible — existing configs continue to work via fallback derivation',
          'Slot composition for data-dense widgets'
        ]
      },
      {
        heading: 'Chat',
        items: [
          'Group chat v2 — full rebuild',
          'Message reactions with iMessage-style popup and chips',
          'Full-text message search + jump-to-message in the chat list',
          'Swipe-to-clear with iMessage-style hide/reappear',
          'Friendly preview for entity-share rooms'
        ]
      },
      {
        heading: 'Auth',
        items: [
          'Sign in with Google + Apple via Supabase + universal links',
          'Web-first Google identity flow'
        ]
      },
      {
        heading: 'Push Notifications',
        items: [
          'End-to-end push notifications with per-category controls',
          'Server is the single source of truth for wishlist push',
          'Quiet hours support'
        ]
      },
      {
        heading: 'Sharing',
        items: [
          'Universal share registry rolled out across phases 1–6',
          'Canonical share landing routes: /g/[gameId], /u/[tag], /p/[threadId], /r/[code], /player/[league]/[athleteId]',
          'Off-screen image render harness + 5 image-only entities',
          'DM share for game / news / player cards',
          'Universal-link claim flow for referrals',
          'Three pill buttons replace the old Story / Save share UI'
        ]
      },
      {
        heading: 'Profile',
        items: [
          'Profile re-arch — bento centerpiece, branded share, suggestions resurfacing',
          'Tabs reuse + pull-to-refresh',
          'Delete-own-post on Swarm three-dots menu'
        ]
      },
      {
        heading: 'Discord / Buzz Club',
        items: [
          'Discord integration — RSS mirror + live tipoff posts + top-takes mirror',
          'Role grants and account linking'
        ]
      },
      {
        heading: 'iOS / Android / Web',
        items: [
          'iOS 18+ themed app icons (light / dark / tinted)',
          'AppDelegate cleanup — stripped deprecated `sourceURLForBridge` override',
          'Web platform-extension shims for native-only auth + Branch modules',
          'PWA manifest fields on Expo web config (foundation; no public web launch yet)'
        ]
      }
    ],
    removed: [
      'Takes (the standalone "drop a hot take" surface)',
      'Badges / achievements',
      'Buzz Cards packs',
      'Community-rating / trending / insight-strip widgets',
      'March Madness post-event notification surface'
    ]
  },
  {
    version: '1.2.x',
    date: 'April 2026',
    tag: 'major',
    headline: 'Multi-sport unlock — 28 leagues live across all the sports you watch.',
    groups: [
      {
        heading: 'Multi-sport unlock',
        items: [
          'Polymorphic games schema with BallSportLeague narrowing',
          'Per-league sync crons (ESPN free-tier + GitHub Actions)',
          '28 leagues live: NBA, WNBA, NCAAM, NFL, MLB, NHL, MLS, NWSL, EPL, La Liga, Bundesliga, Serie A, Ligue 1, Liga MX, UCL, FIFA World Cup, F1, NASCAR, IndyCar, MotoGP, UFC, Boxing, ATP, WTA, LoL, Valorant, CS2, Dota 2',
          'Cricket sync moved to GitHub Actions (CricAPI blocks Supabase Edge Function IPs)'
        ]
      },
      {
        heading: 'Dashboard v2',
        items: [
          'League-page dashboard with player picker',
          'ESPN-sourced team record + roster for accurate current-season data',
          'Soccer player averages computed from gamelog when ESPN totals are absent',
          'Dynamic team power + ML entertainment predictor',
          'Live odds polling + game-card cleanup'
        ]
      },
      {
        heading: 'Engagement features',
        items: [
          'Fan-bias-aware Fan Rating — debiased headline + breakdown',
          'Rating share card — save to photos',
          '5 dashboard rating widgets: rotator, heatmap, leaderboard, streak, vs-crowd',
          'Pollen Wallet screen — balance + full transaction history',
          'Personalized Pulse rerank → renamed to Swarm',
          '"My Posts" filter on Swarm'
        ]
      },
      {
        heading: 'Race + Esports detail',
        items: [
          'Race session detail screen with kind-aware routing',
          'Rating + thread on race / esports detail',
          'Per-league buzz calculator for esports',
          'Race card team colors + country flags'
        ]
      },
      {
        heading: 'NBA Playoffs (continues from 1.1)',
        items: [
          'Live odds polling, win-prob, clutch notifs, power rankings',
          'Daily quest, series script, confetti, heat-map',
          'Game 7 Frenzy badge, MVP Oracle picks, momentum pill'
        ]
      }
    ]
  },
  {
    version: '1.1.x',
    date: 'April 2026',
    tag: 'major',
    headline: 'NBA Playoffs 2026 launch with series brackets, MVP Oracle, and Game 7 Frenzy.',
    groups: [
      {
        heading: 'NBA Playoffs 2026',
        items: [
          'Foundation tables, RPCs, sync edge function, types, picks service',
          'NBA Play-In Tournament — bracket, picks, Pollen rewards',
          'Series bracket pick\'em with confidence weighting',
          'Series-script predictions',
          'MVP Oracle, Series Momentum, Game 7 Frenzy, Daily Quest'
        ]
      },
      {
        heading: 'Buzz Score',
        items: [
          'Per-league Buzz Score calculators with in-app explainer sheet',
          'Brand-tinted dashboard widgets + hero number atom',
          'HotTakes + HeadToHead widgets refresh with viz atoms',
          'Richer card backs — meaningful data, not decoration'
        ]
      },
      {
        heading: 'Polish',
        items: [
          '~40-item polish sweep across games / playoffs / social / a11y / loading / errors',
          'Final spacing sweep — kill all SPACING.*+N',
          'Legacy March Madness deprecation begins'
        ]
      }
    ]
  },
  {
    version: '1.0.x',
    date: 'March 2026',
    tag: 'major',
    headline: 'TestFlight launch — ratings, predictions, brackets, March Madness.',
    groups: [
      {
        heading: 'Foundation features',
        items: [
          'Email / password authentication (Google / Apple OAuth removed during compliance hardening, re-added properly in 1.3)',
          'Onboarding (later simplified to four steps)',
          'Games feed with calendar-first filtering, team filters, and search',
          'Game detail with rating (1–10), rooting pick (home/away), going / wishlist intent',
          'Squad system foundation with #TAG identifiers',
          'Social graph (followers / following) and feed tab',
          'Onboarding entertainment-score predictor'
        ]
      },
      {
        heading: 'March Madness 2026',
        items: [
          'Engine, analytics, UI components, QA hardening',
          'Bracket lock guards, stress-test fixes',
          'Pulse tab and personalization scoring (later renamed Swarm)'
        ]
      },
      {
        heading: 'UX foundations',
        items: [
          'Branded loading state (BouncingBasketball + LoadingShimmer)',
          'Empty / loading / error / offline states across the app',
          'Guest mode + GuestUpsellSheet',
          'Haptic feedback for key interactions',
          'Cinematic launch screen — tectonic honeycomb, saturated bees, smooth cubic animations'
        ]
      },
      {
        heading: 'Pollen + XP',
        items: [
          'Pollen virtual currency launched with daily check-in (100 Pollen)',
          'Streak bonuses at 3, 7, 14, 30 days',
          'Bankruptcy protection (250 Pollen refill below 50)',
          'XP leveling to 100 with logarithmic curve'
        ]
      },
      {
        heading: 'Hardening',
        items: [
          '100+ tests across services',
          'Service interface refactors (auth, XP, notifications, reactions)',
          'Race-condition + animation fixes in guest gate and offline banner',
          'Mutation guards, rate limiting, query bounds, RLS indexes',
          'App Store compliance + privacy manifest'
        ]
      }
    ]
  }
];

export default function ChangelogPage() {
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/changelog`,
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <section
        aria-labelledby="changelog-title"
        className="mx-auto w-full max-w-[960px] px-6 pt-24 pb-28 md:pt-32 md:pb-32"
      >
        <header className="mb-14 max-w-[60ch]">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-buzzr-accent">
            Changelog
          </p>
          <h1
            id="changelog-title"
            className="font-display text-[clamp(40px,6vw,72px)] font-light leading-[0.95] tracking-[-0.035em] text-foreground"
          >
            What&rsquo;s new in Buzzr.
          </h1>
          <p className="mt-5 text-base font-light leading-relaxed text-mutedForeground md:text-lg">
            Every release from the TestFlight launch through today. Newest first. For deeper docs on
            individual features, see{' '}
            <a
              href="https://docs.getbuzzr.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              docs.getbuzzr.online
            </a>
            .
          </p>
        </header>

        {/* Version anchor strip */}
        <nav
          aria-label="Versions"
          className="mb-14 flex flex-wrap gap-2 border-y border-white/[0.06] py-4"
        >
          {RELEASES.map((r) => (
            <a
              key={r.version}
              href={`#v${r.version.replace(/\./g, '-')}`}
              className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-xs text-mutedForeground transition-colors hover:border-white/[0.18] hover:text-foreground"
            >
              v{r.version}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-20">
          {RELEASES.map((release) => (
            <article
              key={release.version}
              id={`v${release.version.replace(/\./g, '-')}`}
              className="scroll-mt-28"
            >
              <header className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-light leading-tight tracking-[-0.025em] text-foreground">
                  v{release.version}
                </h2>
                <span className="text-sm text-mutedForeground">{release.date}</span>
                {release.tag === 'current' && (
                  <span className="rounded-full bg-buzzr-accent/15 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-buzzr-accent">
                    Current
                  </span>
                )}
                {release.tag === 'major' && (
                  <span className="rounded-full border border-white/[0.10] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-mutedForeground">
                    Major
                  </span>
                )}
              </header>

              <p className="mb-10 max-w-[58ch] text-base font-light leading-relaxed text-mutedForeground md:text-lg">
                {release.headline}
              </p>

              <div className="grid gap-10 md:grid-cols-2">
                {release.groups.map((group) => (
                  <section key={group.heading}>
                    <h3 className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-buzzr-accent">
                      {group.heading}
                    </h3>
                    <ul className="flex flex-col gap-2 text-sm font-light leading-relaxed text-foreground/85">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <span aria-hidden className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-buzzr-accent/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              {release.removed && release.removed.length > 0 && (
                <section className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.015] px-6 py-5">
                  <h3 className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-mutedForeground">
                    Removed in {release.version}
                  </h3>
                  <ul className="flex flex-col gap-1.5 text-sm font-light leading-relaxed text-mutedForeground">
                    {release.removed.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span aria-hidden className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-mutedForeground/40" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </article>
          ))}
        </div>

        <footer className="mt-24 border-t border-white/[0.06] pt-10 text-center">
          <p className="text-sm text-mutedForeground">
            Want to know what&rsquo;s next?{' '}
            <Link
              href="/blog"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Read the blog
            </Link>
            {' '}or{' '}
            <a
              href="https://docs.getbuzzr.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              browse the docs
            </a>
            .
          </p>
        </footer>
      </section>
    </>
  );
}
