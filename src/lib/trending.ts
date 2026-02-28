export type TrendingGame = {
  id: string;
  league: string;
  matchup: string;
  startsInMinutes: number;
  buzzScore: number;
  activeWatchers: number;
  momentumLabel: 'Rising' | 'Hot' | 'Peak';
};

export type TrendingSnapshot = {
  generatedAt: string;
  games: TrendingGame[];
  stats: {
    activeRaters: number;
    liveWatchParties: number;
  };
};

type BaseGame = {
  id: string;
  league: string;
  matchup: string;
  startsInMinutes: number;
  baseBuzzScore: number;
  baseWatchers: number;
};

const BASE_GAMES: BaseGame[] = [
  {
    id: 'nba-lal-gsw',
    league: 'NBA',
    matchup: 'Lakers vs Warriors',
    startsInMinutes: 38,
    baseBuzzScore: 88,
    baseWatchers: 1240
  },
  {
    id: 'nfl-kc-buf',
    league: 'NFL',
    matchup: 'Chiefs vs Bills',
    startsInMinutes: 55,
    baseBuzzScore: 93,
    baseWatchers: 1710
  },
  {
    id: 'f1-race-night',
    league: 'F1',
    matchup: 'Grand Prix Night Session',
    startsInMinutes: 24,
    baseBuzzScore: 84,
    baseWatchers: 960
  },
  {
    id: 'ipl-mi-csk',
    league: 'IPL',
    matchup: 'Mumbai vs Chennai',
    startsInMinutes: 72,
    baseBuzzScore: 90,
    baseWatchers: 1450
  },
  {
    id: 'ncaab-top10',
    league: 'NCAAB',
    matchup: 'Top 10 Matchup',
    startsInMinutes: 46,
    baseBuzzScore: 81,
    baseWatchers: 820
  }
];

function createDrift(seed: number, index: number, amplitude: number) {
  const raw = Math.sin(seed * 0.27 + index * 1.91) * amplitude;
  return Math.round(raw);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function momentumFromScore(score: number): TrendingGame['momentumLabel'] {
  if (score >= 91) return 'Peak';
  if (score >= 84) return 'Hot';
  return 'Rising';
}

export function buildTrendingSnapshot(now = new Date()): TrendingSnapshot {
  const minuteSeed = Math.floor(now.getTime() / 60000);

  const games = BASE_GAMES
    .map((game, index) => {
      const buzzDrift = createDrift(minuteSeed, index, 6);
      const watcherDrift = createDrift(minuteSeed, index + 11, 220);
      const startsDrift = createDrift(minuteSeed, index + 23, 5);

      const buzzScore = clamp(game.baseBuzzScore + buzzDrift, 72, 99);
      const activeWatchers = clamp(game.baseWatchers + watcherDrift, 220, 4500);
      const startsInMinutes = clamp(game.startsInMinutes + startsDrift, 5, 120);

      return {
        id: game.id,
        league: game.league,
        matchup: game.matchup,
        startsInMinutes,
        buzzScore,
        activeWatchers,
        momentumLabel: momentumFromScore(buzzScore)
      };
    })
    .sort((a, b) => b.buzzScore - a.buzzScore)
    .slice(0, 4);

  const activeRaters = games.reduce(
    (sum, game) => sum + Math.round(game.activeWatchers * 0.43),
    0
  );
  const liveWatchParties = games.reduce(
    (sum, game) => sum + Math.max(10, Math.round(game.activeWatchers / 32)),
    0
  );

  return {
    generatedAt: now.toISOString(),
    games,
    stats: {
      activeRaters,
      liveWatchParties
    }
  };
}
