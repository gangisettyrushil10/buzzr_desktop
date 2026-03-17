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
      'I could not breathe the last five minutes. We were all just screaming. Still get chills thinking about it.',
    game: 'NFL - Chiefs vs Bills, 2022 Divisional',
    rating: 'Chaos 10/10'
  },
  {
    quote: 'Cried. Actually cried. That game took years off my life.',
    game: 'FIFA World Cup 2022 - Argentina vs France',
    rating: 'Entertainment 10/10'
  },
  {
    quote: 'That shot. I still do not believe it. My jaw was on the floor.',
    game: 'NCAAB - San Diego State vs FAU, 2023 Final Four',
    rating: 'Chaos 10/10'
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
    title: 'Track every game',
    body: 'Log the games you watch across leagues and seasons so you can look back at what was actually worth your time.'
  },
  {
    step: 2,
    title: 'Rate by entertainment',
    body: 'Chaos factor, crowd energy, drama — rate on vibes, not just the box score.'
  },
  {
    step: 3,
    title: 'Never miss a classic',
    body: 'See what other fans thought was rewatchable and build your list of must-watch games before you commit your night.'
  }
];

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
