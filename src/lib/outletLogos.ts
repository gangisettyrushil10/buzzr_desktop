/** News outlet logo URLs. Keyed by outlet slug we use in news-card copy.
 *  Clearbit's logo.clearbit.com endpoint is fast, has a predictable URL
 *  schema, and returns transparent PNGs , perfect for small round chips. */
export const OUTLET_LOGOS: Record<string, string> = {
  ESPN:             'https://logo.clearbit.com/espn.com',
  'The Athletic':   'https://logo.clearbit.com/theathletic.com',
  'Bleacher Report':'https://logo.clearbit.com/bleacherreport.com',
  'CBS Sports':     'https://logo.clearbit.com/cbssports.com',
  'Fox Sports':     'https://logo.clearbit.com/foxsports.com',
  'Yahoo Sports':   'https://logo.clearbit.com/yahoo.com',
  'NBC Sports':     'https://logo.clearbit.com/nbcsports.com',
  'Sky Sports':     'https://logo.clearbit.com/skysports.com',
  'BBC Sport':      'https://logo.clearbit.com/bbc.com',
  NYT:              'https://logo.clearbit.com/nytimes.com',
  Reuters:          'https://logo.clearbit.com/reuters.com',
  AP:               'https://logo.clearbit.com/ap.org'
};

export function getOutletLogo(name: string): string | undefined {
  return OUTLET_LOGOS[name];
}
