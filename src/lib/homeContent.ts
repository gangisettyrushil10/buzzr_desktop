export type AppScreenshot = {
  label: string;
  slug: string;
};

export type FeatureItem = {
  title: string;
  description: string;
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

export const APP_SCREENSHOTS: AppScreenshot[] = [
  { label: 'Follow the action', slug: 'home' },
  { label: 'Find games to watch', slug: 'games' },
  { label: 'Rate by entertainment', slug: 'rate' },
  { label: 'Host watch parties', slug: 'party' }
];

export const FEATURES: FeatureItem[] = [
  {
    title: 'Entertainment ratings',
    description:
      'Rate games on chaos, crowd energy, and drama - not just the box score. See what fans actually thought was worth watching.'
  },
  {
    title: 'Watch parties',
    description:
      'Create watch parties, invite friends, and see when others are watching. Plan viewing together and compare ratings after.'
  },
  {
    title: 'Lists & rewatch queue',
    description:
      'Build lists of classics, hidden gems, or "skip it" games. Share lists with friends and never forget that insane finish.'
  },
  {
    title: 'Game diary',
    description:
      'Log every game you watch. Look back by season or league and remember which nights actually delivered.'
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
    a: 'No. Buzzr is about entertainment and vibes, not betting lines or sportsbooks.'
  },
  {
    q: 'Which sports and leagues does Buzzr support?',
    a: 'We are starting with the major leagues fans obsess over most - NBA, NFL, NCAAB, NCAAF, IPL, F1, NHL, MLB, MLS, plus big moments like March Madness and the World Cup.'
  },
  {
    q: 'Is Buzzr free to use?',
    a: 'Yes. During beta, Buzzr is free. We will share any future pricing changes well in advance.'
  },
  {
    q: 'How do I get access?',
    a: 'Join the beta waitlist from this page. We are inviting fans in waves so we can keep the experience fast and focused.'
  },
  {
    q: 'Is Buzzr affiliated with BUZZR TV (Fremantle)?',
    a: 'No. Buzzr Sports is not affiliated with BUZZR TV (Fremantle).'
  },
  {
    q: 'What happens to my data?',
    a: 'We use your ratings and game logs to power your experience in the app. We do not sell your personal data.'
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
    body: 'Chaos factor, crowd energy, drama - rate on vibes, not just the box score.'
  },
  {
    step: 3,
    title: 'Never miss a classic',
    body: 'See what other fans thought was rewatchable and build your list of must-watch games.'
  }
];
