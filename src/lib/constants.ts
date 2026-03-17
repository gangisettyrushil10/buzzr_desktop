export const COMPANY_NAME = 'Humyn LLC';

export const SITE_NAME = 'Buzzr';

export const SITE_TAGLINE = 'Rate sports games by entertainment.';

export const SITE_DESCRIPTION =
  'Buzzr is the Letterboxd for sports games. Rate games by chaos, energy, and drama — not the final score. Track everything you watch.';

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
  'Rate the chaos. Track the drama. Every game gets a score.';

/** Legacy/compat */
export const HERO_EMOTIONAL_LINE =
  "For when the box score wasn't the best part.";

export const HERO_STAT = "We're inviting fans in waves.";

export const TRUST_STRIP =
  'NBA · NFL · IPL · F1 · FIFA · March Madness · and every game that actually delivers.';

/** Social – overridable via env */
export const TWITTER_URL =
  process.env.NEXT_PUBLIC_TWITTER_URL ?? 'https://x.com/the_real_buzzr';
export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://www.instagram.com/buzzr_official/';
