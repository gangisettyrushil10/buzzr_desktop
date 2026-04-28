export const COMPANY_NAME = 'Humyn LLC';

export const SITE_NAME = 'Buzzr';

/** Used in schema `alternateName` + brand copy to disambiguate from
 *  BUZZR TV (Fremantle) and cement the "sports rating app" identity. */
export const ALTERNATE_NAME = 'Buzzr Sports';

export const SITE_TAGLINE = 'Rate sports games by entertainment.';

export const SITE_DESCRIPTION =
  'Buzzr is the Letterboxd for sports games. Track upcoming events, rate games by chaos, energy, and drama, not the final score. March Madness, FIFA World Cup 2026, NBA Playoffs.';

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.getbuzzr.online';

export const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL ?? 'support@humyn.studio';

export const PRIVACY_URL =
  process.env.PRIVACY_URL ?? `${BASE_URL}/privacy`;

export const TERMS_URL =
  process.env.TERMS_URL ?? `${BASE_URL}/terms`;

export const SUPPORT_URL =
  process.env.SUPPORT_URL ?? `${BASE_URL}/support`;

export const DELETE_ACCOUNT_URL =
  process.env.DELETE_ACCOUNT_URL ?? `${BASE_URL}/delete-account`;

export const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ??
  'https://apps.apple.com/us/app/buzzr-sports/id6760628256';

export const BRANCH_LINK_BASE =
  process.env.NEXT_PUBLIC_BRANCH_LINK_BASE ?? '';

export const APPLE_APP_ID =
  process.env.APPLE_APP_ID ?? 'Z4ZUZ884U3.com.buzzr.app';

export const ANDROID_PACKAGE_NAME =
  process.env.ANDROID_PACKAGE_NAME ?? 'com.buzzr.app';

export const ANDROID_SHA256_CERT_FINGERPRINTS = (
  process.env.ANDROID_SHA256_CERT_FINGERPRINTS ??
  process.env.GOOGLE_PLAY_SHA256_CERT_FINGERPRINTS ??
  'A2:18:92:57:95:12:D4:F9:8D:53:ED:3B:99:FB:76:DF:ED:29:76:C2:86:57:23:57:21:55:7C:27:83:CA:11:23'
)
  .split(',')
  .map((fingerprint) => fingerprint.trim())
  .filter(Boolean);

export const DISCORD_URL =
  process.env.NEXT_PUBLIC_DISCORD_URL ?? 'https://discord.gg/NbgfYpQPRv';

export const DOCS_URL =
  process.env.NEXT_PUBLIC_DOCS_URL ?? 'https://docs.getbuzzr.online';

export const FEEDBACK_TALLY_URL =
  process.env.FEEDBACK_TALLY_URL ?? 'https://tally.so/r/aQB6rq';

export const BUZZR_TV_DISCLAIMER =
  'Buzzr is not affiliated with BUZZR TV (Fremantle).';

/** Hero headline: split into segments for mixed-color rendering */
export const HERO_LINE1 = 'THIS IS WHY';
export const HERO_LINE2_PLAIN = 'WE';
export const HERO_LINE2_ACCENT = 'WATCH.';

export const HERO_SUBHEAD =
  'Rate live games, drop hot takes, and watch with friends. Every game gets a Buzzr Score.';

/** Legacy/compat */
export const HERO_EMOTIONAL_LINE =
  "For when the box score wasn't the best part.";

export const HERO_STAT = "Live on the App Store.";

export const TRUST_STRIP =
  'NBA Playoffs · NFL · FIFA World Cup 2026 · March Madness · F1 · UCL · and every game that actually delivers.';

/** Leagues & competitions Buzzr covers with live scores + schedules.
 *  Grouped into sports for the landing page Leagues Wall; flat list drives
 *  the Marquee. Keep single source of truth , update here, not in components. */
export type LeagueSport =
  | 'basketball'
  | 'football'
  | 'baseball'
  | 'hockey'
  | 'soccer'
  | 'motor'
  | 'combat'
  | 'tennis'
  | 'esports';

export interface League {
  label: string;
  long: string;
  sport: LeagueSport;
}

export const LEAGUES: ReadonlyArray<League> = [
  // Basketball
  { label: 'NBA',        long: 'National Basketball Association', sport: 'basketball' },
  { label: 'WNBA',       long: 'Women’s National Basketball Association', sport: 'basketball' },
  { label: 'NCAAM',      long: 'NCAA Men’s Basketball', sport: 'basketball' },
  // Football
  { label: 'NFL',        long: 'National Football League', sport: 'football' },
  // Baseball
  { label: 'MLB',        long: 'Major League Baseball', sport: 'baseball' },
  // Hockey
  { label: 'NHL',        long: 'National Hockey League', sport: 'hockey' },
  // Soccer
  { label: 'EPL',        long: 'English Premier League', sport: 'soccer' },
  { label: 'LA LIGA',    long: 'La Liga', sport: 'soccer' },
  { label: 'BUNDESLIGA', long: 'Bundesliga', sport: 'soccer' },
  { label: 'SERIE A',    long: 'Serie A', sport: 'soccer' },
  { label: 'LIGUE 1',    long: 'Ligue 1', sport: 'soccer' },
  { label: 'MLS',        long: 'Major League Soccer', sport: 'soccer' },
  { label: 'LIGA MX',    long: 'Liga MX', sport: 'soccer' },
  { label: 'NWSL',       long: 'National Women’s Soccer League', sport: 'soccer' },
  { label: 'UCL',        long: 'UEFA Champions League', sport: 'soccer' },
  { label: 'WORLD CUP',  long: 'FIFA World Cup', sport: 'soccer' },
  // Motor
  { label: 'F1',         long: 'Formula 1', sport: 'motor' },
  { label: 'NASCAR',     long: 'NASCAR Cup Series', sport: 'motor' },
  // Combat
  { label: 'UFC',        long: 'Ultimate Fighting Championship', sport: 'combat' },
  // Tennis
  { label: 'ATP',        long: 'ATP Tour', sport: 'tennis' },
  { label: 'WTA',        long: 'WTA Tour', sport: 'tennis' },
  // Esports
  { label: 'LoL',        long: 'League of Legends', sport: 'esports' },
  { label: 'VALORANT',   long: 'Valorant', sport: 'esports' },
  { label: 'CS2',        long: 'Counter-Strike 2', sport: 'esports' },
  { label: 'DOTA 2',     long: 'Dota 2', sport: 'esports' }
];

export const SPORT_LABELS: Record<LeagueSport, string> = {
  basketball: 'Basketball',
  football:   'Football',
  baseball:   'Baseball',
  hockey:     'Hockey',
  soccer:     'Soccer',
  motor:      'Motor',
  combat:     'Combat',
  tennis:     'Tennis',
  esports:    'Esports'
};

export const SPORT_ORDER: readonly LeagueSport[] = [
  'basketball',
  'football',
  'baseball',
  'hockey',
  'soccer',
  'motor',
  'combat',
  'tennis',
  'esports'
];

/** Social – overridable via env */
export const TWITTER_URL =
  process.env.NEXT_PUBLIC_TWITTER_URL ?? 'https://x.com/the_real_buzzr';
export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://www.instagram.com/buzzr_official/';
