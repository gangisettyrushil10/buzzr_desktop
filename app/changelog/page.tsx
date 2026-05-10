import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, BASE_URL } from '@/src/lib/constants';

const PAGE_TITLE = `Changelog · ${SITE_NAME}`;
const PAGE_DESCRIPTION =
  'What shipped on Buzzr, every release from the TestFlight launch through today, with the features added, the pivots made, and the things we removed. Tier 1: thematic notes. Tier 2: raw git log per release.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: '/changelog',
    languages: {
      'en-US': `${BASE_URL}/changelog`,
      'x-default': `${BASE_URL}/changelog`
    }
  },
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

type Group = { heading: string; items: string[] };
type Commit = { sha: string; date: string; subject: string };

type Release = {
  version: string;
  date: string;
  tag?: 'current' | 'major' | 'patch';
  headline: string;
  groups: Group[];
  removed?: string[];
  /** Raw git-log entries for this version. Renders inside a collapsible <details>. */
  commits?: Commit[];
};

const RELEASES: ReadonlyArray<Release> = [
  // ─── v1.5.0, current, May 8, 2026 ───────────────────────────────────────
  {
    version: '1.5.0',
    date: 'May 2026',
    tag: 'current',
    headline:
      'League-safe detail tables, deeper game pages, and DFS that grades itself on the fly.',
    groups: [
      {
        heading: 'Game Detail',
        items: [
          'League-safe detail tables, every league gets the right shape (no more null gymnastics on F1 or tennis)',
          'Period / clock + airing network on the game card; line score on detail',
          'Polish pass on league landing previews'
        ]
      },
      {
        heading: 'DFS',
        items: [
          'On-demand player + game pickers',
          'Scoreboard-direct watcher with auto-recheck on bet open',
          'Drop Unknown leagues from DFS insights with a fallback chain',
          'Constrain book classification strictly to PrizePicks or Underdog'
        ]
      },
      {
        heading: 'Ratings',
        items: [
          'Sport-aware tag catalog with inline hashtags',
          'Orbiting tag chips on the rate sheet',
          'Dismiss keyboard on tap-outside'
        ]
      },
      {
        heading: 'Notifications',
        items: [
          'Tap-to-source deep linking for both pushes and inbox rows'
        ]
      },
      {
        heading: 'Branding',
        items: [
          'New logo across icon, splash, push notification, and the iPhone widget'
        ]
      },
      {
        heading: 'Hardening',
        items: [
          'ET game-date dedup across DST, locale lock, leg-remove a11y',
          'Math.random replaced in security-sensitive paths',
          'Notifications-settings hardening',
          'Squads invite-token cleanup, Supabase error handling, realtime types',
          'Game-card league-support hardening + bet-sheet polish'
        ]
      }
    ],
    commits: [
      { sha: 'f7fa020c', date: '2026-05-09', subject: 'align use-games-data with ALL-mode preview-games fetch' },
      { sha: '364ddf1b', date: '2026-05-09', subject: 'ET game-date dedup across DST, lock locale, leg-remove a11y' },
      { sha: '16060949', date: '2026-05-09', subject: 'replace Math.random in security paths, harden notifications-settings' },
      { sha: '2ad98522', date: '2026-05-08', subject: 'drop unused squads.invite_token_hash column' },
      { sha: 'fd8665e6', date: '2026-05-08', subject: 'harden invite tokens, supabase error handling, realtime types' },
      { sha: '94ea2c20', date: '2026-05-08', subject: 'add league-safe detail tables' },
      { sha: 'a98632c1', date: '2026-05-08', subject: 'polish league landing previews' },
      { sha: '0beb249d', date: '2026-05-08', subject: 'prepare Buzzr 1.5.0' },
      { sha: 'c07db2e8', date: '2026-05-08', subject: '1.4.1 RC cleanup' },
      { sha: '51bc84c0', date: '2026-05-08', subject: 'harden game card league support' },
      { sha: '13e8793a', date: '2026-05-08', subject: 'polish bets sheets and game context' },
      { sha: '81bd5342', date: '2026-05-07', subject: 'on-demand player + game pickers, scoreboard-direct watcher, auto-recheck on bet open' },
      { sha: 'c03b74b8', date: '2026-05-07', subject: 'show period/clock + airing network on cards, line score on detail' },
      { sha: '52b42552', date: '2026-05-07', subject: 'tap-to-source deep linking for pushes + inbox rows' },
      { sha: '4f39826c', date: '2026-05-07', subject: 'sport-aware tag catalog + inline hashtags + orbiting tag chips' },
      { sha: '34d45523', date: '2026-05-07', subject: 'replace logo across icon, splash, push notif, widget' },
      { sha: '5029e70a', date: '2026-05-07', subject: 'drop Unknown leagues from DFS insights with fallback chain' },
      { sha: '3323c1c9', date: '2026-05-06', subject: 'align insights fixture with game context metadata' },
      { sha: '6d38c58e', date: '2026-05-06', subject: 'remove gif surfaces from messaging' },
      { sha: 'cf8a88e4', date: '2026-05-06', subject: 'constrain book classification to Underdog or PrizePicks' },
      { sha: 'bc5b3241', date: '2026-05-06', subject: 'UI simplification + server-side game header extraction' },
      { sha: '93c16d8a', date: '2026-05-06', subject: 'cross-phase integration tests for the auto-grading pipeline' },
      { sha: 'aa967076', date: '2026-05-06', subject: 'manual entry game inputs + verify-card missing-game-time row' },
      { sha: '4b6d1c57', date: '2026-05-06', subject: 'watcher anchors grading window on linkage.gameStartsAt' },
      { sha: 'd27e868c', date: '2026-05-06', subject: 'linkage v2 with same-teams + same-date + closest-time match' },
      { sha: '46769f74', date: '2026-05-06', subject: 'extract gameDate, gameStartTime, dayOfWeek, stateCode from slip' },
      { sha: '64260d74', date: '2026-05-06', subject: 'state-code and league IANA timezone map' },
      { sha: 'eb67e91c', date: '2026-05-06', subject: 'remove "Re-check settlement" button from bet detail screen' },
      { sha: '7a81e342', date: '2026-05-06', subject: 'auto-grade pending bets without requiring linkage.gameId' },
      { sha: 'f9cd436f', date: '2026-05-06', subject: 'harden scan fallback for TestFlight' },
      { sha: '2ecb7060', date: '2026-05-06', subject: 'web fallback for Bets add routes' },
      { sha: '008d567a', date: '2026-05-06', subject: 'restore Bets web empty-state entrypoint' },
      { sha: '592ac6ff', date: '2026-05-06', subject: 'fix QA integration regressions' },
      { sha: 'd3988faa', date: '2026-05-05', subject: 'auto-grading system across NBA/NFL/MLB/NHL (Waves 1–5)' },
      { sha: '22447851', date: '2026-05-05', subject: 'clean up bottom tab icons' },
      { sha: 'd71a1c38', date: '2026-05-05', subject: 'fix profile routing and rating saves' },
      { sha: 'f647d1e5', date: '2026-05-05', subject: 'dismiss keyboard on tap outside review input' }
    ]
  },

  // ─── v1.4.1 RC, major, May 6, 2026 ──────────────────────────────────────
  {
    version: '1.4.1 RC',
    date: 'May 2026',
    tag: 'major',
    headline:
      'Swarm performance, school pride v2, and the backend hardening pass behind every chat.',
    groups: [
      {
        heading: 'Swarm',
        items: [
          'Chat streaks and stacked message timestamps',
          'Comment threads shared with Explore',
          'Active explore comment shelf rendered inline',
          'Explore + Swarm thread service unified',
          'Realtime Swarm post signals enabled',
          'Swarm cache boundaries hardened; first-page reads persisted',
          'Eager comment warmups removed; render state narrowed',
          'Streak moment merge deferred; dedupe order preserved'
        ]
      },
      {
        heading: 'School Pride',
        items: [
          'School pride university chats',
          'Penn editing unblocked',
          'Team logos used for school pride avatars',
          'School pride re-renders from a fresh profile payload'
        ]
      },
      {
        heading: 'Backend & Performance',
        items: [
          'Server-side Supabase sync expansion + MMKV cold-start optimization',
          'Esports live-game reconciliation',
          'League freshness sync coverage hardening',
          'Sports sprite avatar polish',
          'Local Buzzr updates consolidated for ship',
          'Backend hardening design spec landed'
        ]
      }
    ],
    commits: [
      { sha: '9a1c89a8', date: '2026-05-06', subject: 'prepare Buzzr 1.4.1 RC' },
      { sha: 'f5f8a1b6', date: '2026-05-06', subject: 'snapshot backend strengthening local work' },
      { sha: '62645d36', date: '2026-05-05', subject: 'fix profile routing and rating saves' },
      { sha: 'e0bfb0e3', date: '2026-05-05', subject: 'trim core social copy' },
      { sha: 'c265d82c', date: '2026-05-05', subject: 'reconcile stale esports live games' },
      { sha: 'c8dc66f6', date: '2026-05-05', subject: 'harden league freshness sync coverage' },
      { sha: '1ac88d48', date: '2026-05-05', subject: 'resolve main integration checks' },
      { sha: '1d0320ba', date: '2026-05-05', subject: 'include sports sprite avatar polish' },
      { sha: 'c8d125d0', date: '2026-05-05', subject: 'consolidate local Buzzr updates' },
      { sha: 'fcdaa328', date: '2026-05-05', subject: 'plan bets settlement intelligence' },
      { sha: '20ea7d7e', date: '2026-05-05', subject: 'allow editing Penn school pride' },
      { sha: 'a3e9321e', date: '2026-05-05', subject: 'design bets settlement intelligence' },
      { sha: '498d49ba', date: '2026-05-05', subject: 'use team logos for school pride' },
      { sha: '7e228043', date: '2026-05-05', subject: 'show school pride from fresh profile payload' },
      { sha: 'ea8d5a42', date: '2026-05-05', subject: 'add school pride university chats' },
      { sha: '248ab598', date: '2026-05-05', subject: 'complete swarm gif thread typing' },
      { sha: 'd89b8eb4', date: '2026-05-05', subject: 'harden swarm cache boundaries' },
      { sha: 'd6002c65', date: '2026-05-05', subject: 'surface chat streaks and stack message times' },
      { sha: '3265c1e9', date: '2026-05-05', subject: 'stabilize empty pulse item comments' },
      { sha: '9753879b', date: '2026-05-05', subject: 'restore community feed item visuals' },
      { sha: 'b074610b', date: '2026-05-05', subject: 'narrow swarm feed item render state' },
      { sha: '9624725e', date: '2026-05-05', subject: 'harden bet screenshot fallback and manual entry' },
      { sha: 'f82615ce', date: '2026-05-05', subject: 'hydrate swarm views from visible cards' },
      { sha: '47c58c7f', date: '2026-05-05', subject: 'cover pulse thread feed change fanout' },
      { sha: '065391a1', date: '2026-05-05', subject: 'remove eager swarm comment warmups' },
      { sha: '35acde5a', date: '2026-05-05', subject: 'preserve streak moment dedupe order' },
      { sha: 'c65034f3', date: '2026-05-05', subject: 'wire explore comments into scroll' },
      { sha: 'f7716b26', date: '2026-05-05', subject: 'share thread comments panel with explore' },
      { sha: 'fa1283bb', date: '2026-05-05', subject: 'defer swarm streak moment merge' },
      { sha: '2dadfbe8', date: '2026-05-05', subject: 'render active explore comment shelf' },
      { sha: 'afc419bb', date: '2026-05-05', subject: 'persist swarm first page reads' },
      { sha: '4c42b80f', date: '2026-05-05', subject: 'load active explore comment shelf' },
      { sha: 'a99a1b7f', date: '2026-05-05', subject: 'add explore swarm thread service' },
      { sha: '50e1d08b', date: '2026-05-05', subject: 'attach swarm thread refs to explore cards' },
      { sha: '27899616', date: '2026-05-05', subject: 'enable realtime swarm post signals' },
      { sha: 'dca5b099', date: '2026-05-05', subject: 'allow explore swarm thread sources' },
      { sha: 'e2072ce9', date: '2026-05-05', subject: 'server-side sync expansion + MMKV cold-start (#65)' },
      { sha: 'fc2d4ce2', date: '2026-05-05', subject: 'wire DFS server fallback into Expo Go path' },
      { sha: '309a6dce', date: '2026-05-05', subject: 'graceful Apple Vision fallback in Expo Go' },
      { sha: '7db8e22a', date: '2026-05-05', subject: 'route Claude vision via OpenRouter' }
    ]
  },

  // ─── v1.4.0, major, May 4, 2026 ─────────────────────────────────────────
  {
    version: '1.4.0',
    date: 'May 2026',
    tag: 'major',
    headline:
      'Sportsbook OCR, the deepest game pages we have ever built, and the first iPhone widget.',
    groups: [
      {
        heading: 'DFS Betting',
        items: [
          'Snap a PrizePicks or Underdog slip, Claude Vision OCRs every leg',
          'OpenRouter routing for the vision pipeline',
          'Bets table foundation + sportsbooks reference',
          'Manual entry sheet + bet-service data layer',
          'Bet list with filters + summary header',
          'Bet detail screen at /bet/[id] with share card + deep link',
          'Settlement watcher + betting_alerts notif category',
          'No-vig fair-line calculator + EdgeBadge',
          'Standalone edge calculator + insights tools entry',
          'ROI insights at /bets/insights',
          'Crew bet pool dashboard',
          'Public leaderboards + tail/fade',
          'Line-shop end-to-end',
          'Kalshi auto-sync end-to-end',
          'Hide sportsbook UI behind feature flag'
        ]
      },
      {
        heading: 'Game Detail Enrichment',
        items: [
          'Win-probability line chart on ball-sport game detail',
          'Per-team leaders, MLB probable starters, soccer XI',
          'NFL + NHL drive list + scoring-summary cards via ESPN',
          'Soccer goal + card timeline; possession + shots + cards',
          'F1 lap-by-lap chart, qualifying grid, pit stops, driver detail screen',
          'Tennis tournament-today matches widget on ATP / WTA dashboards',
          'UFC full fight-card list and divisional rankings card (P4P + 9 men + 3 women)',
          'AP Top 25 poll widget on NCAAM / NCAAW / NCAAF dashboards',
          'Form-and-series context card on ball-sport game detail'
        ]
      },
      {
        heading: 'Dashboard',
        items: [
          'F1, MotoGP, NASCAR, IndyCar, plus UFC and Boxing now selectable',
          'Motorsport NBA-parity, driver + constructor standings, NextRaceCard hero',
          'Tennis + combat-sport hero card; ATP / WTA addable',
          'Tappable PlayerProfileSheet across player widgets',
          'Pin drivers + auto-mount champion form on race pages'
        ]
      },
      {
        heading: 'Widgets',
        items: [
          'Phase 1, iPhone NextGame widget scaffold + server pipeline'
        ]
      },
      {
        heading: 'Notifications',
        items: [
          'Diagnostic card + self-test push',
          'DM category + bets-alerts toggle'
        ]
      },
      {
        heading: 'Players',
        items: [
          'PlayerProfileSheet, tappable deep-stat drill-in',
          'Splits tab on PlayerProfileSheet',
          'Prop research v1 on PlayerProfileSheet Bets tab'
        ]
      },
      {
        heading: 'Standings & Coverage',
        items: [
          'ESPN team-standings backfill for non-DB leagues',
          'Rugby + cricket coverage on the team-standings feed',
          'UFC P4P + ATP / WTA singles rankings on individual-athlete pages'
        ]
      },
      {
        heading: 'Settings & Misc',
        items: [
          'Linked Accounts section in Settings',
          'Drivers in universal search + DNF accounting'
        ]
      }
    ],
    commits: [
      { sha: '6df98a1e', date: '2026-05-04', subject: 'Phase 1, iPhone NextGame widget scaffold + server pipeline' },
      { sha: '2911f59a', date: '2026-05-04', subject: 'diagnostic card + self-test push' },
      { sha: '2669274a', date: '2026-05-04', subject: 'DM category + bets-alerts toggle' },
      { sha: 'acd6a389', date: '2026-05-04', subject: 'consolidate header + Card + Badge across the bets feature' },
      { sha: 'bfea5abe', date: '2026-05-04', subject: 'unit tests for DFS insights computation (17 tests)' },
      { sha: 'caf470e5', date: '2026-05-04', subject: 'unit tests for DFS payouts/parsers/settlement (52 tests)' },
      { sha: '2587d0f8', date: '2026-05-04', subject: 'page-based add-bet flow + DFS bet detail rendering' },
      { sha: '486bcdb0', date: '2026-05-04', subject: 'DFS settlement grading service' },
      { sha: '96992c67', date: '2026-05-04', subject: 'DFS vision pipeline parsers (PrizePicks + Underdog)' },
      { sha: '4991a596', date: '2026-05-04', subject: 'hide sportsbook UI behind feature flag' },
      { sha: '8b1536d9', date: '2026-05-04', subject: 'DFS-only insights dashboard' },
      { sha: 'c4a49789', date: '2026-05-04', subject: 'DFS schema + service layer for PrizePicks/Underdog' },
      { sha: 'e406d676', date: '2026-05-04', subject: 'per-team leaders, MLB probable starters, soccer XI on game detail' },
      { sha: '502b6530', date: '2026-05-04', subject: 'win-probability line chart on ball-sport game detail' },
      { sha: 'e4a72f6e', date: '2026-05-04', subject: 'NFL/NHL drive list + scoring-summary cards via ESPN summary' },
      { sha: '13820abe', date: '2026-05-04', subject: 'settlement watcher, parlay grading + fuzzy team match' },
      { sha: 'fdb1572f', date: '2026-05-04', subject: 'cleanup-betslips cron + sportsbooks pre-warm' },
      { sha: '11105b7b', date: '2026-05-04', subject: 'per-user rollup materialized view backs the leaderboard' },
      { sha: '58ea8411', date: '2026-05-04', subject: 'vision pipeline polish, tighter parses + zod validation' },
      { sha: 'dfe09aff', date: '2026-05-04', subject: 'goal + card timeline on the soccer match detail screen' },
      { sha: '5491f99e', date: '2026-05-04', subject: 'realtime list + cache layer + index sweep' },
      { sha: '57001f7a', date: '2026-05-04', subject: 'AP Top 25 poll widget on NCAAM/NCAAW/NCAAF dashboards' },
      { sha: '819ae9de', date: '2026-05-04', subject: 'DFS auto-sync scaffolds + SharpSports stub (BUZ-438/439/440)' },
      { sha: '5007578c', date: '2026-05-04', subject: 'possession + shots + cards on the soccer match detail screen' },
      { sha: 'fa11abe0', date: '2026-05-04', subject: 'prop research v1 on PlayerProfileSheet Bets tab (BUZ-427/428)' },
      { sha: '3135a1f4', date: '2026-05-04', subject: 'F1 driver detail screen, season qualifying record' },
      { sha: 'f34fcf1d', date: '2026-05-04', subject: 'tennis tournament-today matches widget on ATP/WTA dashboards' },
      { sha: '5616710a', date: '2026-05-04', subject: 'crew bet pool dashboard (BUZ-441)' },
      { sha: 'd5a83305', date: '2026-05-04', subject: 'public leaderboards + tail/fade (BUZ-442/443)' },
      { sha: '6e4a6d97', date: '2026-05-04', subject: 'UFC full fight-card list for the next event' },
      { sha: 'd674e19a', date: '2026-05-04', subject: 'form-and-series context card on ball-sport game detail' },
      { sha: '0e378b12', date: '2026-05-04', subject: 'F1 lap-by-lap chart on the race detail screen' },
      { sha: '043afbf1', date: '2026-05-04', subject: 'UFC divisional rankings card with pill switcher' },
      { sha: '4380d7ff', date: '2026-05-04', subject: 'standalone edge calculator + insights tools entry (BUZ-429)' },
      { sha: 'd8314457', date: '2026-05-04', subject: 'line-shop end-to-end (BUZ-424/425/426)' },
      { sha: 'afed96b8', date: '2026-05-04', subject: 'F1 qualifying grid + pit stops on the race detail screen' },
      { sha: '0ccfe01c', date: '2026-05-04', subject: 'bet share card + /bet/[id] deep link (BUZ-430/437)' },
      { sha: '88e6921a', date: '2026-05-04', subject: 'settlement watcher + betting_alerts notif category (BUZ-433/431)' },
      { sha: '033e1ffe', date: '2026-05-04', subject: 'ROI insights at /bets/insights (BUZ-432)' },
      { sha: '39b3c63c', date: '2026-05-04', subject: 'rugby + cricket coverage on the team-standings feed' },
      { sha: '93a14ef2', date: '2026-05-04', subject: 'Linked Accounts section in Settings (BUZ-436)' },
      { sha: '51e51c8a', date: '2026-05-04', subject: 'ESPN team-standings backfill for non-DB leagues' },
      { sha: '406f182f', date: '2026-05-04', subject: 'UFC P4P + ATP/WTA singles rankings on athlete pages' },
      { sha: '125d4181', date: '2026-05-04', subject: 'Kalshi auto-sync end-to-end (BUZ-421/422/435)' },
      { sha: 'bdb96488', date: '2026-05-04', subject: 'Splits tab on PlayerProfileSheet (BUZ-406)' },
      { sha: '5eb9b7c2', date: '2026-05-04', subject: 'vision pipeline end-to-end + fix add-bet button (BUZ-412–415)' },
      { sha: 'a7c03760', date: '2026-05-04', subject: 'bet detail screen at /bet/[id] (BUZ-417)' },
      { sha: '7de9342f', date: '2026-05-04', subject: 'bet list with filters + summary header (BUZ-416)' },
      { sha: 'ddbaacfe', date: '2026-05-04', subject: 'manual entry sheet + bet-service data layer (BUZ-415)' },
      { sha: 'e96a0f18', date: '2026-05-04', subject: 'no-vig fair-line calc + EdgeBadge (BUZ-419, BUZ-420)' },
      { sha: '233133d4', date: '2026-05-04', subject: 'tap player widgets to open profile sheet (BUZ-405)' },
      { sha: 'b2aaed3d', date: '2026-05-04', subject: 'PlayerProfileSheet (BUZ-404), tappable deep-stat drill-in' },
      { sha: 'a1c328d0', date: '2026-05-04', subject: 'tennis + combat-sport hero card; ATP/WTA addable' },
      { sha: '4c460cc7', date: '2026-05-04', subject: 'Bets tab + iOS empty state + Android placeholder + feature flag' },
      { sha: '9abb1559', date: '2026-05-04', subject: 'betslip_parse_cache + betslips bucket + linked_accounts migrations' },
      { sha: '45b4de1b', date: '2026-05-04', subject: 'scaffold expo-text-recognition iOS-only Expo native module' },
      { sha: '085b86db', date: '2026-05-04', subject: 'sportsbooks reference + bets table foundation' },
      { sha: '1dc9c981', date: '2026-05-04', subject: 'drivers in universal search + DNF accounting + driver-detail offseason fallback' },
      { sha: '46b6f6b4', date: '2026-05-04', subject: 'live position-over-time chart for F1 race weekends' },
      { sha: '252b5165', date: '2026-05-04', subject: 'per-league points tables for driver standings' },
      { sha: '4185708b', date: '2026-05-04', subject: 'constructor detail page' },
      { sha: 'a938a88b', date: '2026-05-04', subject: 'driver detail screen + dual-action standings rows' },
      { sha: '58242920', date: '2026-05-04', subject: 'season race calendar widget on race-league pages' },
      { sha: 'b70c9485', date: '2026-05-04', subject: 'race weekend grouping in NextRaceCard + race detail' },
      { sha: 'b6a09972', date: '2026-05-04', subject: 'pin drivers + auto-mount champion form on race pages' },
      { sha: 'fcef3820', date: '2026-05-04', subject: 'motorsport NBA-parity, driver + constructor standings, NextRaceCard hero' },
      { sha: 'a66197b7', date: '2026-05-04', subject: 'F1, MotoGP, NASCAR, IndyCar + UFC/Boxing now selectable' }
    ]
  },

  // ─── v1.3.2, patch, May 3, 2026 ─────────────────────────────────────────
  {
    version: '1.3.2',
    date: 'May 2026',
    tag: 'patch',
    headline:
      'Dashboard re-arch v3, universal search, and a TestFlight hardening pass.',
    groups: [
      {
        heading: 'Dashboard',
        items: [
          'Custom page names, pages aren\'t locked to leagues',
          'Live layout preview in EditPageSheet exposes positional rules',
          'Visible save signal + undo for destructive entity edits',
          'Heterogeneous entity pages + multi-team support',
          'Long-press chip → contextual rename / duplicate / delete',
          'Workspace switch + set-default persist immediately',
          'Tap-through on player + standings widgets',
          'Hot-card visual hierarchy on the cockpit',
          'Smart empty state with one-tap "Track <favoriteTeam>"',
          'Visible freshness + tap-to-refresh on cockpit',
          'Inline + Add player on cockpit Players header',
          'Workspace chip rail collapsed into a header dropdown',
          'Stat line cards inside cockpit + UX polish',
          'Block last-page delete that orphans the workspace',
          'Pre-deploy hardening, config + auto-save + cleanup'
        ]
      },
      {
        heading: 'Universal Search',
        items: [
          'Players + news articles + squads in universal search',
          'Team + position metadata on player rows',
          'pg_trgm GIN indexes on profiles.username + user_tag for sub-100ms lookups',
          'Visible header search pill replaces the old tap-target icon',
          'Faster + denser + show-more rendering'
        ]
      },
      {
        heading: 'Scroll & TestFlight Hardening',
        items: [
          'Migrate remaining "swipe" user-facing copy to "scroll"',
          'Persistent action rail with entrance pulse',
          'Persistent undo affordance on the scroll deck',
          'Five blocker bugs from TestFlight onboarding review',
          'Five quick wins from TestFlight feedback batch',
          'Notifications mark-all-read keeps inbox + clears bell dot',
          'Wire haptics + high-contrast toggles end-to-end',
          'Safe-area + touch-target pass'
        ]
      },
      {
        heading: 'Coverage',
        items: [
          'Boxing, IndyCar, MotoGP go live',
          'NWSL + Liga MX news',
          'NCAAF + NCAAW rosters',
          'Cricket news, tennis schedule, expanded odds',
          'Cron new leagues, demo banner, more bots'
        ]
      },
      {
        heading: 'Crash Hardening',
        items: [
          'NaN-guard pan listeners in LivingArenaBackground',
          'safeImageUri helper + SwipeStatsBar NaN guard',
          'Dashboard + chat + onboarding crash + leak hardening',
          'Caught errors routed through Sentry telemetry',
          'NaN-safe score path so the LED bar can\'t crash native bridge'
        ]
      }
    ],
    commits: [
      { sha: 'eed6320f', date: '2026-05-03', subject: 'bump to 1.3.2' },
      { sha: '928f0e6c', date: '2026-05-03', subject: 'NaN-guard pan listeners in LivingArenaBackground' },
      { sha: 'd48ee395', date: '2026-05-03', subject: 'safeImageUri helper + SwipeStatsBar NaN guard' },
      { sha: '6b39fe35', date: '2026-05-02', subject: 'crash + leak hardening across dashboard screen, editor, cockpit' },
      { sha: '3ad78e64', date: '2026-05-02', subject: 'route caught errors through Sentry telemetry' },
      { sha: 'ffd53104', date: '2026-05-02', subject: 'rebuild create_or_get_dm without dropped is_open column' },
      { sha: 'a8c788d2', date: '2026-05-02', subject: 'extract numeric-guards utility for bridge-safety' },
      { sha: '563b1f07', date: '2026-05-02', subject: 'unblock skip-teams + dashboard hook violation' },
      { sha: '2b9f4533', date: '2026-05-02', subject: 'drop rateability check from RPC so referral hook fires' },
      { sha: 'ead3b673', date: '2026-05-02', subject: 'ship-eve perf + share UX hardening pass' },
      { sha: '5f3c9401', date: '2026-05-02', subject: 'cockpit subtext moves into tap-to-open info drawers' },
      { sha: 'd87a00fc', date: '2026-05-02', subject: 'stat line cards inside cockpit + UX polish' },
      { sha: '92875f03', date: '2026-05-02', subject: 'cron new leagues, Boxing/IndyCar/MotoGP live, NWSL/LIGAMX news, NCAAF/NCAAW rosters' },
      { sha: '81c0aeb8', date: '2026-05-02', subject: 'subtle brand-color tint at top of team pages' },
      { sha: 'a31d2856', date: '2026-05-02', subject: 'NCAAF/NCAAW, cricket news, tennis schedule, demo banner, more bots, expanded odds' },
      { sha: '5ebc8dba', date: '2026-05-02', subject: 'visible freshness + tap-to-refresh on cockpit' },
      { sha: '83bd4fcc', date: '2026-05-02', subject: 'smart empty state with one-tap "Track <favoriteTeam>"' },
      { sha: 'be4e4d67', date: '2026-05-02', subject: 'hot-card visual hierarchy on the cockpit' },
      { sha: 'b1f21bb2', date: '2026-05-02', subject: 'tap-through on player + standings widgets' },
      { sha: 'bef30708', date: '2026-05-02', subject: 'Tonight before News in default page order' },
      { sha: '32f39fd2', date: '2026-05-02', subject: 'inline + Add player on cockpit Players header' },
      { sha: '8bde8339', date: '2026-05-02', subject: 'demote Cards from primary controls into the editor' },
      { sha: 'a55f5407', date: '2026-05-02', subject: 'inline news-mode toggle on the news widget itself' },
      { sha: '38aeb9f6', date: '2026-05-02', subject: 'collapse workspace chip rail into a header dropdown' },
      { sha: 'a84eba59', date: '2026-05-02', subject: 'instant local typeahead in EditPageSheet player picker' },
      { sha: '994e405d', date: '2026-05-02', subject: 'team identity in cockpit header (logo + brand color)' },
      { sha: 'b9e1227a', date: '2026-05-02', subject: 'visible save signal + undo for destructive entity edits' },
      { sha: '80547bdd', date: '2026-05-02', subject: 'live layout preview in EditPageSheet exposes positional rules' },
      { sha: '32a57f45', date: '2026-05-02', subject: 'custom page names so pages aren\'t locked to leagues' },
      { sha: '5944ccea', date: '2026-05-02', subject: 'team + position metadata on player rows' },
      { sha: '314fb08b', date: '2026-05-02', subject: 'squads in universal search (my-stuff coverage)' },
      { sha: 'd8cc189c', date: '2026-05-02', subject: 'news articles in universal search' },
      { sha: 'b3b5393e', date: '2026-05-02', subject: 'faster + denser + show-more in universal search' },
      { sha: 'a08db48f', date: '2026-05-02', subject: 'pg_trgm GIN indexes on profiles.username + user_tag' },
      { sha: 'e5300987', date: '2026-05-02', subject: 'players in universal search + ESPN-resolved tap target' },
      { sha: '49f0126e', date: '2026-05-02', subject: 'visible header search pill replaces tap-target icon' },
      { sha: '336a8e48', date: '2026-05-02', subject: 'block last-page delete that orphans the workspace' },
      { sha: 'd2fd18df', date: '2026-05-02', subject: 'pre-deploy hardening, config + auto-save + cleanup' },
      { sha: 'f8cb9316', date: '2026-05-01', subject: 'long-press chip → contextual rename/duplicate/delete' },
      { sha: '38d4d9e3', date: '2026-05-01', subject: 'workspace switch + set-default persist immediately' },
      { sha: '0c0ce1da', date: '2026-05-01', subject: 'add additional-leagues per page (Standings widgets)' },
      { sha: 'ff22f204', date: '2026-05-01', subject: 'heterogeneous entity pages + multi-team support' },
      { sha: '72f0c1af', date: '2026-05-01', subject: 'strip drag, resize, bento packing' },
      { sha: 'e5b136ac', date: '2026-05-01', subject: 'friendly preview for entity_share rooms' },
      { sha: '624edbf3', date: '2026-05-01', subject: 'migrate remaining "swipe" user-facing copy to "scroll"' },
      { sha: '817e1e04', date: '2026-05-01', subject: 'persistent action rail with entrance pulse' },
      { sha: 'd74cf9a4', date: '2026-05-01', subject: 'persistent undo affordance on the scroll deck' },
      { sha: 'cc6689bd', date: '2026-05-01', subject: 'handle-step Next no longer greys out silently' },
      { sha: 'e98cff33', date: '2026-05-01', subject: 'mark-all-read keeps inbox + clears bell dot' },
      { sha: 'b1bf542d', date: '2026-05-01', subject: 'wire haptics + high-contrast toggles end-to-end' },
      { sha: '46f458a2', date: '2026-05-01', subject: 'broken back / drag-handle / dismiss / discuss across surfaces' },
      { sha: '2c3e5121', date: '2026-05-01', subject: 'five quick wins from TestFlight feedback batch' },
      { sha: '9f1a9d5d', date: '2026-05-01', subject: 'five blocker bugs from TestFlight onboarding review' }
    ]
  },

  // ─── v1.3.1, May 2026 ────────────────────────────────────────────────────
  {
    version: '1.3.1',
    date: 'May 2026',
    headline: 'Custom dashboards, sharper search, faster cold starts.',
    groups: [
      {
        heading: 'Dashboard',
        items: [
          'Custom page names, pages aren\'t locked to leagues',
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
          'Pause LivingArenaBackground while the scroll screen is off-screen',
          'Cache scroll preferences and memoize the game-card gradient',
          'Cut card re-renders, shrink off-screen window, recycle images',
          'Unblock first paint from auth retry backoff',
          'Card-shaped skeleton on cold-start instead of a centered spinner'
        ]
      },
      {
        heading: 'Hardening',
        items: [
          'Route-level ErrorBoundary on dashboard + scroll tabs',
          'Five blocker bugs from TestFlight review (onboarding, drag-handle, dismiss flows)',
          'Five quick wins from TestFlight feedback batch',
          'Notifications mark-all-read keeps inbox + clears bell dot',
          'Wire haptics + high-contrast toggles end-to-end'
        ]
      }
    ]
  },

  // ─── v1.3.0, major ───────────────────────────────────────────────────────
  {
    version: '1.3.0',
    date: 'May 2026',
    tag: 'major',
    headline: 'Dashboard re-architecture, group chat v2, and a universal share registry.',
    groups: [
      {
        heading: 'Dashboard re-architecture',
        items: [
          'Heterogeneous entity pages, mix teams, players, leagues, games on a single page',
          'Multi-team support, up to 8 players + 2 additional teams per page',
          'New EntityRef discriminated union replaces the rigid primary/secondary team model',
          'Backward-compatible, existing configs continue to work via fallback derivation',
          'Slot composition for data-dense widgets'
        ]
      },
      {
        heading: 'Chat',
        items: [
          'Group chat v2, full rebuild',
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
          'Profile re-arch, bento centerpiece, branded share, suggestions resurfacing',
          'Tabs reuse + pull-to-refresh',
          'Delete-own-post on Swarm three-dots menu'
        ]
      },
      {
        heading: 'Discord / Buzz Club',
        items: [
          'Discord integration, RSS mirror + live tipoff posts + top-takes mirror',
          'Role grants and account linking'
        ]
      },
      {
        heading: 'iOS / Android / Web',
        items: [
          'iOS 18+ themed app icons (light / dark / tinted)',
          'AppDelegate cleanup, stripped deprecated `sourceURLForBridge` override',
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

  // ─── v1.2.x, major ───────────────────────────────────────────────────────
  {
    version: '1.2.x',
    date: 'April 2026',
    tag: 'major',
    headline: 'Multi-sport unlock, 28 leagues live across all the sports you watch.',
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
          'Fan-bias-aware Fan Rating, debiased headline + breakdown',
          'Rating share card, save to photos',
          '5 dashboard rating widgets: rotator, heatmap, leaderboard, streak, vs-crowd',
          'Pollen Wallet screen, balance + full transaction history',
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

  // ─── v1.1.x, major ───────────────────────────────────────────────────────
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
          'NBA Play-In Tournament, bracket, picks, Pollen rewards',
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
          'Richer card backs, meaningful data, not decoration'
        ]
      },
      {
        heading: 'Polish',
        items: [
          '~40-item polish sweep across games / playoffs / social / a11y / loading / errors',
          'Final spacing sweep',
          'Legacy March Madness deprecation begins'
        ]
      }
    ]
  },

  // ─── v1.0.x, major ───────────────────────────────────────────────────────
  {
    version: '1.0.x',
    date: 'March 2026',
    tag: 'major',
    headline: 'TestFlight launch, ratings, predictions, brackets, March Madness.',
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
          'Cinematic launch screen, tectonic honeycomb, saturated bees, smooth cubic animations'
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
        className="mx-auto w-full max-w-[960px] px-6 pt-24 pb-[48px] md:pt-32"
      >
        <header className="mb-12 max-w-[60ch]">
          <span className="font-mono text-[12px] uppercase tracking-[0.1em] leading-[2] text-muted">
            Changelog
          </span>
          <h1
            id="changelog-title"
            className="mt-3 text-[clamp(36px,5vw,48px)] font-normal leading-[1.11] tracking-[-0.025em] text-foreground"
          >
            What&rsquo;s new in Buzzr.
          </h1>
          <p className="mt-5 text-[16px] leading-[1.5] tracking-[-0.025em] text-muted">
            Every release from the TestFlight launch through today. Newest first. Each version shows the thematic story up top, open <span className="font-mono text-foreground">All commits</span> at the bottom of any release for the raw git log. For deeper docs on individual features, see{' '}
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

        <nav aria-label="Versions" className="mb-12 flex flex-wrap gap-2 border-y border-surface py-4">
          {RELEASES.map((r) => (
            <a
              key={r.version}
              href={`#v${r.version.replace(/[\s.]/g, '-')}`}
              className="border border-surface px-3 py-1.5 font-mono text-[12px] tracking-[0.1em] uppercase text-muted transition-colors hover:border-white/25 hover:text-foreground"
            >
              v{r.version}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-20">
          {RELEASES.map((release) => (
            <article
              key={release.version}
              id={`v${release.version.replace(/[\s.]/g, '-')}`}
              className="scroll-mt-28"
            >
              <header className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <h2 className="text-[clamp(28px,3.5vw,36px)] font-normal leading-[1.2] tracking-[-0.025em] text-foreground">
                  v{release.version}
                </h2>
                <span className="font-mono text-[12px] tracking-[0.1em] uppercase text-muted">
                  {release.date}
                </span>
                {release.tag === 'current' && (
                  <span className="font-mono text-[12px] tracking-[0.1em] uppercase text-foreground border border-foreground px-2 py-0.5">
                    Current
                  </span>
                )}
                {release.tag === 'major' && (
                  <span className="font-mono text-[12px] tracking-[0.1em] uppercase text-muted border border-surface px-2 py-0.5">
                    Major
                  </span>
                )}
                {release.tag === 'patch' && (
                  <span className="font-mono text-[12px] tracking-[0.1em] uppercase text-muted border border-surface px-2 py-0.5">
                    Patch
                  </span>
                )}
              </header>

              <p className="mb-10 max-w-[58ch] text-[20px] leading-[1.4] tracking-[-0.025em] text-muted">
                {release.headline}
              </p>

              <div className="grid gap-10 md:grid-cols-2">
                {release.groups.map((group) => (
                  <section key={group.heading}>
                    <h3 className="mb-3 font-mono text-[12px] tracking-[0.1em] uppercase text-foreground">
                      {group.heading}
                    </h3>
                    <ul className="flex flex-col gap-2 text-[14px] leading-[1.43] tracking-[0.1px] text-muted">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span aria-hidden className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-foreground/60" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              {release.removed && release.removed.length > 0 && (
                <section className="mt-10 border border-surface px-6 py-5">
                  <h3 className="mb-3 font-mono text-[12px] tracking-[0.1em] uppercase text-muted">
                    Removed in {release.version}
                  </h3>
                  <ul className="flex flex-col gap-1.5 text-[14px] leading-[1.43] tracking-[0.1px] text-muted">
                    {release.removed.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-muted/40" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {release.commits && release.commits.length > 0 && (
                <details className="mt-10 border-t border-surface pt-6 group">
                  <summary className="cursor-pointer list-none rounded-sm px-1 py-1 -mx-1 font-mono text-[12px] uppercase tracking-[0.1em] text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(0,230,118,0.55)]">
                    <span aria-hidden className="inline-block w-3 group-open:rotate-90 transition-transform">›</span>
                    {' '}
                    All commits ({release.commits.length})
                  </summary>
                  <ul className="mt-5 flex flex-col gap-1.5 font-mono text-[12px] tracking-[0.05em] leading-[1.6] text-muted">
                    {release.commits.map((c) => (
                      <li key={c.sha} className="flex gap-3">
                        <span className="shrink-0 text-muted">{c.sha.slice(0, 7)}</span>
                        <span className="shrink-0 text-muted">{c.date}</span>
                        <span className="text-muted">{c.subject}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </article>
          ))}
        </div>

        <footer className="mt-24 border-t border-surface pt-10 text-center">
          <p className="text-[14px] leading-[1.43] tracking-[0.1px] text-muted">
            Want to know what&rsquo;s next?{' '}
            <Link href="/blog" className="text-foreground underline-offset-4 hover:underline">
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
