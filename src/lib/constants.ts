export const COMPANY_NAME = 'Humyn LLC';

export const SITE_NAME = 'Buzzr';

export const SITE_TAGLINE = 'Rate sports games by entertainment.';

export const SITE_DESCRIPTION =
  'Buzzr is the Letterboxd for sports games. Track upcoming events, rate games by chaos, energy, and drama — not the final score. March Madness, FIFA World Cup 2026, NBA Playoffs.';

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buzzr.app';

export const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL ?? 'support@humyn.studio';

export const PRIVACY_URL =
  process.env.PRIVACY_URL ?? `${BASE_URL}/privacy`;

export const TERMS_URL =
  process.env.TERMS_URL ?? `${BASE_URL}/terms`;

export const SUPPORT_URL =
  process.env.SUPPORT_URL ?? `${BASE_URL}/support`;

export const DELETE_ACCOUNT_URL =
  process.env.DELETE_ACCOUNT_URL ?? `${BASE_URL}/delete-account`;

export const BETA_TALLY_URL =
  process.env.BETA_TALLY_URL ?? 'https://tally.so/r/aQB6Ev';

export const FEEDBACK_TALLY_URL =
  process.env.FEEDBACK_TALLY_URL ?? 'https://tally.so/r/aQB6rq';

export const BUZZR_TV_DISCLAIMER =
  'Buzzr is not affiliated with BUZZR TV (Fremantle).';

/** Hero headline — split into segments for mixed-color rendering */
export const HERO_LINE1 = 'THIS IS WHY';
export const HERO_LINE2_PLAIN = 'WE';
export const HERO_LINE2_ACCENT = 'WATCH.';

export const HERO_SUBHEAD =
  'Track upcoming events. Rate by entertainment. Discover classics. Every game gets a Buzzr score.';

/** Legacy/compat */
export const HERO_EMOTIONAL_LINE =
  "For when the box score wasn't the best part.";

export const HERO_STAT = "Join 500+ fans already in beta.";

export const TRUST_STRIP =
  'NBA Playoffs · NFL · FIFA World Cup 2026 · March Madness · F1 · UCL · and every game that actually delivers.';

/** Tawk.to live chat */
export const TAWK_PROPERTY_ID =
  process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID ?? '69ba0992c4b5991c3637fba6';
export const TAWK_WIDGET_ID =
  process.env.NEXT_PUBLIC_TAWK_WIDGET_ID ?? '1jjvbap7b';

/** Social – overridable via env */
export const TWITTER_URL =
  process.env.NEXT_PUBLIC_TWITTER_URL ?? 'https://x.com/the_real_buzzr';
export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://www.instagram.com/buzzr_official/';
