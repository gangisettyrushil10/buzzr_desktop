/** ESPN team-logo URL builder.
 *  Pattern:  https://a.espncdn.com/i/teamlogos/<league>/500/<slug>.png
 *  The slug is the ESPN abbreviation (lowercase), e.g. nba/okc, nhl/fla, mlb/nyy.
 *  Soccer clubs use numeric IDs on ESPN , we pass those through via overrides. */

type LeagueSlug = 'nba' | 'wnba' | 'nfl' | 'mlb' | 'nhl' | 'mls' | 'soccer';

export function getTeamLogo(league: LeagueSlug, code: string): string {
  const slug = code.toLowerCase();
  return `https://a.espncdn.com/i/teamlogos/${league}/500/${slug}.png`;
}
