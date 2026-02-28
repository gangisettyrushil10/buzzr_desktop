export const COMPANY_NAME = 'Humyn LLC';

export const SITE_NAME = 'Buzzr';

export const SITE_TAGLINE = 'Rate sports games by entertainment.';

export const SITE_DESCRIPTION =
  'Buzzr is the Letterboxd for sports games. See which games were actually worth watching.';

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buzzr.app';

export const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL ?? 'support@humyn.studio';

export const PRIVACY_URL =
  process.env.PRIVACY_URL ?? `${BASE_URL}/privacy`;

export const TERMS_URL =
  process.env.TERMS_URL ?? `${BASE_URL}/terms`;

export const SUPPORT_URL =
  process.env.SUPPORT_URL ?? `${BASE_URL}/support`;

export const BETA_TALLY_URL =
  process.env.BETA_TALLY_URL ?? 'https://tally.so/r/aQB6Ev';

export const FEEDBACK_TALLY_URL =
  process.env.FEEDBACK_TALLY_URL ?? 'https://tally.so/r/aQB6rq';

export const BUZZR_TV_DISCLAIMER =
  'Buzzr is not affiliated with BUZZR TV (Fremantle).';

/** Hero / positioning */
export const HERO_EMOTIONAL_LINE =
  "For when the box score wasn't the best part.";

export const HERO_STAT = "We're inviting fans in waves.";

export const TRUST_STRIP =
  'For fans who watch NBA, NFL, IPL, F1, and the games that actually deliver.';

/** Social – overridable via env */
export const TWITTER_URL =
  process.env.NEXT_PUBLIC_TWITTER_URL ?? 'https://x.com/the_real_buzzr';
export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://www.instagram.com/buzzr_official/';
