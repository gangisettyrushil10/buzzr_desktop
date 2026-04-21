/** Logo paths for the leagues Buzzr covers. Bundled locally to avoid
 *  CDN hotlink protection and 404s. Keyed by LEAGUES[].label (exact match). */
export const LEAGUE_LOGOS: Record<string, string> = {
  NBA:          '/leagues/nba.svg',
  WNBA:         '/leagues/wnba.svg',
  NCAAM:        '/leagues/ncaam.svg',
  NFL:          '/leagues/nfl.svg',
  MLB:          '/leagues/mlb.svg',
  NHL:          '/leagues/nhl.svg',
  EPL:          '/leagues/epl.svg',
  'LA LIGA':    '/leagues/la-liga.svg',
  BUNDESLIGA:   '/leagues/bundesliga.svg',
  'SERIE A':    '/leagues/serie-a.svg',
  'LIGUE 1':    '/leagues/ligue-1.svg',
  MLS:          '/leagues/mls.svg',
  'LIGA MX':    '/leagues/liga-mx.svg',
  NWSL:         '/leagues/nwsl.svg',
  UCL:          '/leagues/ucl.svg',
  'WORLD CUP':  '/leagues/world-cup.svg',
  F1:           '/leagues/f1.svg',
  NASCAR:       '/leagues/nascar.svg',
  UFC:          '/leagues/ufc.svg',
  ATP:          '/leagues/atp.svg',
  WTA:          '/leagues/wta.svg',
  LoL:          '/leagues/lol.svg',
  VALORANT:     '/leagues/valorant.svg',
  CS2:          '/leagues/cs2.svg',
  'DOTA 2':     '/leagues/dota2.svg'
};

export function getLeagueLogo(label: string): string | undefined {
  return LEAGUE_LOGOS[label];
}
