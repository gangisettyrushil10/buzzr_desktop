export type AppScreenshot = {
  label: string;
  slug: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  /** Sample metric value 0–10 for the segmented bar */
  value: number;
};

export type ReviewItem = {
  quote: string;
  game: string;
  rating: string;
};

export type PersonaItem = {
  title: string;
  description: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type HowItWorksItem = {
  step: number;
  title: string;
  body: string;
};

export type BadgeItem = {
  name: string;
  description: string;
  /** Icon key: 'fire' | 'bolt' | 'star' | 'orb' */
  icon: 'fire' | 'bolt' | 'star' | 'orb';
  /** Progress 0–10 toward next level */
  level: number;
};

export type DebateItem = {
  tag: string;
  title: string;
  body: string;
};

export type DifferentiatorItem = {
  number: string;
  title: string;
  description: string;
  contrast: string;
};

export type UpcomingEventItem = {
  name: string;
  subtitle: string;
  date: string;
  dateShort: string;
  league: string;
  venue?: string;
  fans: string;
  highlight?: boolean;
};

export type TrendingGameItem = {
  score: number;
  game: string;
  sport: string;
  date: string;
  label: string;
  breakdown: { label: string; value: number }[];
  context: string;
};

export const APP_SCREENSHOTS: AppScreenshot[] = [
  { label: 'Follow the action', slug: 'home' },
  { label: 'Find games to watch', slug: 'games' },
  { label: 'Rate by entertainment', slug: 'rate' },
  { label: 'Host watch parties', slug: 'party' }
];

export const FEATURES: FeatureItem[] = [
  {
    title: 'CHAOS',
    description:
      'Rate how unpredictable and wild a game was. The stuff that makes you stand up and scream.',
    value: 9.4
  },
  {
    title: 'ENERGY',
    description:
      'Crowd atmosphere, momentum swings, pace. How much was the arena absolutely buzzing?',
    value: 8.7
  },
  {
    title: 'DRAMA',
    description:
      'Comebacks, overtime, buzzer beaters. The moments you replay in your head for days.',
    value: 9.8
  },
  {
    title: 'CLUTCH',
    description:
      'When it mattered most, who delivered? Log and discover the games defined by the moment.',
    value: 7.5
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    quote:
      "That last-second heave. The whole building just froze. I rated it before the net stopped moving. Chaos 10, no debate.",
    game: 'NCAAB - March Madness 2026, Round of 64 · #13 over #4',
    rating: 'Chaos 10/10'
  },
  {
    quote:
      "Super Bowl overtime in 2026 and somehow I was more nervous than the players. I had to lie down after.",
    game: 'NFL - Super Bowl LX · Chiefs vs Eagles, Feb 2026',
    rating: 'Drama 9.9/10'
  },
  {
    quote:
      "Three overtimes. I lost my voice before halftime and I was watching alone in my apartment.",
    game: 'NBA - Thunder vs Nuggets, Feb 22 2026',
    rating: 'Energy 9.7/10'
  },
  {
    quote: 'Cried. Actually cried. That game took years off my life.',
    game: 'FIFA World Cup 2022 - Argentina vs France',
    rating: 'Entertainment 10/10'
  },
  {
    quote:
      'I could not breathe the last five minutes. We were all just screaming. Still get chills thinking about it.',
    game: 'NFL - Chiefs vs Bills, 2022 Divisional',
    rating: 'Chaos 10/10'
  },
  {
    quote:
      "My whole group chat was rating in real time. Never watched a game the same way since.",
    game: 'NCAAB - Florida vs Houston, 2025 National Championship',
    rating: 'Clutch 9.5/10'
  }
];

export const PERSONAS: PersonaItem[] = [
  {
    title: 'Die-hard sickos',
    description:
      'You watched the random Tuesday night MAC game and the full West Coast slate. Buzzr keeps score on which nights were actually worth it.'
  },
  {
    title: 'Watch party hosts',
    description:
      'You are the friend with League Pass and the extra screen. Create parties, sync what you are watching, and rate the chaos together.'
  },
  {
    title: 'Highlight hunters',
    description:
      'You do not have time for every game. See which matchups fans said were truly rewatchable before you commit your night.'
  }
];

export const FAQS: FaqItem[] = [
  {
    q: 'Is Buzzr a betting app?',
    a: 'No. Buzzr is about entertainment and vibes — chaos, energy, drama. Zero connection to betting lines or sportsbooks.'
  },
  {
    q: 'Which sports and leagues does Buzzr support?',
    a: 'We are starting with the majors: NBA, NFL, NCAAB, NCAAF, IPL, F1, NHL, MLB, MLS — plus March Madness, the World Cup, and the games that define generations.'
  },
  {
    q: 'Is Buzzr free to use?',
    a: 'Yes. During beta, Buzzr is completely free. We will give you plenty of notice before anything changes.'
  },
  {
    q: 'How do I get access?',
    a: 'Join the beta waitlist from this page. We are rolling invites out in waves to keep the experience tight and focused.'
  },
  {
    q: 'How is this different from just checking the score?',
    a: 'The score tells you who won. Buzzr tells you whether the game was actually worth watching — the swings, the tension, the moments. A 40-point blowout gets a 3. A double-overtime comeback gets a 10.'
  },
  {
    q: 'Can I rate games from the past?',
    a: "Absolutely. From last night's comeback to a 2022 World Cup Final you still think about — log it, rate it, add it to your history."
  },
  {
    q: 'What are Watch Parties?',
    a: 'Invite friends into a shared session, sync up on the same game, and rate in real-time together. The crowd in your living room gets a score too.'
  },
  {
    q: 'Is Buzzr affiliated with BUZZR TV (Fremantle)?',
    a: 'No. Buzzr Sports is not affiliated with BUZZR TV (Fremantle).'
  },
  {
    q: 'What happens to my data?',
    a: 'Your ratings and game logs power your personal experience. We do not sell your personal data.'
  }
];

export const HOW_IT_WORKS: HowItWorksItem[] = [
  {
    step: 1,
    title: 'Follow the games that matter',
    body: 'Track upcoming events — FIFA World Cup, NBA Playoffs, March Madness — and never lose the thread of what you watched.'
  },
  {
    step: 2,
    title: 'Rate by what you felt',
    body: 'Chaos, Energy, Drama, Clutch. Four dimensions that actually capture whether a game was worth your night. Not just the score.'
  },
  {
    step: 3,
    title: 'Watch, debate, and discover together',
    body: 'Host live watch parties. See what the community rated. Find the games fans say are rewatchable before you commit your evening.'
  }
];

export const DEBATES: DebateItem[] = [
  {
    tag: 'Buzzr Debates',
    title: 'Was that a 10?',
    body: "Drop your rating. Back it up. Argue with strangers who watched the same game and felt completely different about it.",
  },
  {
    tag: 'Hot Take',
    title: 'The comeback > the trophy.',
    body: "The final score is just a number. What you felt in the last two minutes — that's the real story. Rate it. Fight for it.",
  },
  {
    tag: 'Buzzr Debates',
    title: 'Overrated. Fight me.',
    body: 'Some games live on hype. Some deserve a 3. Post your take and let the crowd prove you wrong — or validate your taste forever.',
  },
];

export const DIFFERENTIATORS: DifferentiatorItem[] = [
  {
    number: '01',
    title: 'Not a number. A feeling.',
    description:
      "Rate Chaos, Energy, and Drama separately — because one number can't capture why that game was unforgettable.",
    contrast: 'Basic apps give you a single star rating.',
  },
  {
    number: '02',
    title: 'Watch it together.',
    description:
      "Host live watch parties. Rate in real-time with your friends, not alone scrolling a recap the next morning.",
    contrast: 'Basic apps are a solo experience.',
  },
  {
    number: '03',
    title: 'Find your next classic.',
    description:
      "See which games fans actually rewatched. Build a must-see list and never waste a night on a 40-point blowout.",
    contrast: "Basic apps tell you what happened. Buzzr tells you what's worth watching.",
  },
  {
    number: '04',
    title: 'Zero betting. Pure vibes.',
    description:
      'No spreads, no lines, no predictions. Buzzr is 100% about entertainment value — the chaos, the comebacks, the moments.',
    contrast: 'Basic apps blur the line with sports gambling.',
  },
];

export const UPCOMING_EVENTS: UpcomingEventItem[] = [
  {
    name: 'March Madness 2026',
    subtitle: 'The bracket is live. Rate every upset, buzzer beater, and Cinderella run.',
    date: 'March 17 – April 6, 2026',
    dateShort: 'LIVE NOW',
    league: 'NCAAB',
    fans: '14.2K fans rating',
    highlight: true,
  },
  {
    name: 'NBA Playoffs 2026',
    subtitle: 'Playoff race is heating up. Every game counts.',
    date: 'April – June 2026',
    dateShort: 'Apr 2026',
    league: 'NBA',
    fans: '9.3K fans watching',
  },
  {
    name: 'NHL Playoffs 2026',
    subtitle: 'Overtimes. Shutouts. The race for the Cup is coming.',
    date: 'April – June 2026',
    dateShort: 'Apr 2026',
    league: 'NHL',
    fans: '4.8K fans watching',
  },
  {
    name: 'FIFA World Cup 2026',
    subtitle: '48 teams. 104 matches. The biggest sporting event on earth.',
    date: 'June 11 – July 19, 2026',
    dateShort: 'Jun 2026',
    league: 'FIFA',
    venue: 'Final · MetLife Stadium, NJ',
    fans: '13.1K fans watching',
  },
];

export const TRENDING_GAME: TrendingGameItem = {
  score: 9.8,
  game: 'Argentina vs France · FIFA World Cup Final',
  sport: 'FIFA',
  date: 'Dec 18, 2022',
  label: 'All-Time Classic',
  breakdown: [
    { label: 'Chaos',  value: 10  },
    { label: 'Energy', value: 9.8 },
    { label: 'Drama',  value: 10  },
    { label: 'Clutch', value: 9.6 },
  ],
  context: 'Three penalties. Two Mbappé comebacks. Extra time. The greatest World Cup Final in history.',
};

export const BADGES: BadgeItem[] = [
  {
    name: 'BALL KNOWER',
    description: 'Rate 10 games across 3 different leagues',
    icon: 'orb',
    level: 7
  },
  {
    name: 'RIDE OR DIE',
    description: 'Log 5 games from the same team in a season',
    icon: 'fire',
    level: 5
  },
  {
    name: 'DRAMA QUEEN',
    description: 'Rate 3 games with Drama score above 9.5',
    icon: 'star',
    level: 9
  }
];
