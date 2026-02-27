import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BETA_TALLY_URL,
  FEEDBACK_TALLY_URL,
  HERO_EMOTIONAL_LINE,
  HERO_STAT,
  SITE_DESCRIPTION,
  SUPPORT_EMAIL,
  TRUST_STRIP
} from '@/src/lib/constants';
import { Button } from '@/components/ui/button';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { Marquee } from '@/components/Marquee';
import { ScrollReveal } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Buzzr Sports — Rate sports games by entertainment.',
  description: SITE_DESCRIPTION,
  openGraph: {
    title: 'Buzzr Sports — Rate sports games by entertainment.',
    description: SITE_DESCRIPTION
  }
};

const APP_SCREENSHOTS = [
  { label: 'Rate by entertainment', slug: 'rate' },
  { label: 'Watch parties & lists', slug: 'watch-parties' },
  { label: 'Your game diary', slug: 'diary' }
];

const FEATURES = [
  {
    title: 'Entertainment ratings',
    description: 'Rate games on chaos, crowd energy, and drama — not just the box score. See what fans actually thought was worth watching.'
  },
  {
    title: 'Watch parties',
    description: 'Create watch parties, invite friends, and see when others are watching. Plan viewing together and compare ratings after.'
  },
  {
    title: 'Lists & rewatch queue',
    description: 'Build lists of classics, hidden gems, or “skip it” games. Share lists with friends and never forget that insane finish.'
  },
  {
    title: 'Game diary',
    description: 'Log every game you watch. Look back by season or league and remember which nights actually delivered.'
  }
];

const REVIEWS = [
  {
    quote: 'I couldn’t breathe the last five minutes. We were all just screaming. Still get chills thinking about it 🫠',
    game: 'NFL · Chiefs vs Bills, 2022 Divisional',
    rating: 'Chaos 10/10'
  },
  {
    quote: 'Cried. Actually cried. That game took years off my life 😭',
    game: 'FIFA World Cup 2022 · Argentina vs France',
    rating: 'Entertainment 10/10'
  },
  {
    quote: 'That shot. I still don’t believe it. My jaw was on the floor 😮',
    game: 'NCAAB · San Diego State vs FAU, 2023 Final Four',
    rating: 'Chaos 10/10'
  }
];

const PERSONAS = [
  {
    title: 'Die-hard sickos',
    description: 'You watched the random Tuesday night MAC game and the full West Coast slate. Buzzr keeps score on which nights were actually worth it.'
  },
  {
    title: 'Watch party hosts',
    description: 'You’re the friend with League Pass and the extra screen. Create parties, sync what you’re watching, and rate the chaos together.'
  },
  {
    title: 'Highlight hunters',
    description: 'You don’t have time for every game. See which matchups fans said were truly rewatchable before you commit your night.'
  }
];

const FAQS = [
  {
    q: 'Is Buzzr a betting app?',
    a: 'No. Buzzr is about entertainment and vibes, not betting lines or sportsbooks.'
  },
  {
    q: 'Which sports and leagues does Buzzr support?',
    a: 'We’re starting with the major leagues fans obsess over most — NBA, NFL, NCAAB, NCAAF, IPL, F1, NHL, MLB, MLS, plus big moments like March Madness and the World Cup.'
  },
  {
    q: 'Is Buzzr free to use?',
    a: 'Yes. During beta, Buzzr is free. We’ll share any future pricing changes well in advance.'
  },
  {
    q: 'How do I get access?',
    a: 'Join the beta waitlist from this page. We’re inviting fans in waves so we can keep the experience fast and focused.'
  },
  {
    q: 'Is Buzzr affiliated with BUZZR TV (Fremantle)?',
    a: 'No. Buzzr Sports is not affiliated with BUZZR TV (Fremantle).'
  },
  {
    q: 'What happens to my data?',
    a: 'We use your ratings and game logs to power your experience in the app. We don’t sell your personal data.'
  }
];

export default function HomePage() {
  return (
    <div className="relative">
      <FloatingOrbs className="-z-10" />

      {/* Hero */}
      <section
        aria-labelledby="hero-title"
        className="relative mx-auto flex max-w-5xl flex-col gap-10 px-6 pb-12 pt-10 md:pt-16"
      >
        <header className="space-y-6">
          <p
            className="text-xs uppercase tracking-[0.3em] text-buzzr-accent/80 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            Letterboxd for sports
          </p>
          <h1
            id="hero-title"
            className="font-heading text-4xl leading-tight text-foreground md:text-5xl max-w-3xl opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            Buzzr Sports — Rate sports games by entertainment.
          </h1>
          <p
            className="max-w-xl text-sm text-mutedForeground md:text-base opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
          >
            Buzzr is where sports fans rate games by entertainment, not just the score. Track everything you watch, see what other fans loved, and never miss a classic again.
          </p>
          <p
            className="text-gradient-shimmer animate-text-shimmer text-sm font-medium opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            {HERO_EMOTIONAL_LINE}
          </p>
        </header>

        <div className="space-y-3 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <Link href={BETA_TALLY_URL}>
            <Button size="lg" className="min-w-[140px] animate-breathe">
              Join Beta
            </Button>
          </Link>
          <p className="flex flex-wrap items-center gap-x-2 text-xs text-mutedForeground">
            <Link href={FEEDBACK_TALLY_URL} className="underline transition-colors hover:text-foreground">
              Leave Feedback
            </Link>
            <span aria-hidden>·</span>
            <Link href="/support" className="underline transition-colors hover:text-foreground">
              Support
            </Link>
            <span className="text-mutedForeground/60">·</span>
            <span>{HERO_STAT} Coming soon to iOS and Android.</span>
          </p>
        </div>

        <div
          className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-buzzr-accent/40 to-transparent opacity-0 animate-fade-in"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          aria-hidden
        />
      </section>

      <p className="text-center text-xs text-mutedForeground/70 px-6 py-2">
        {TRUST_STRIP}
      </p>

      <Marquee />

      {/* App screenshots */}
      <section
        aria-label="App preview"
        className="mx-auto max-w-5xl px-6 py-16"
      >
        <ScrollReveal delay={0}>
          <h2 className="mb-2 text-center text-xs uppercase tracking-[0.3em] text-buzzr-accent/80">
            See Buzzr in action
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-center text-sm text-mutedForeground">
            Rate games, start watch parties, and build your rewatch list — all in one place.
          </p>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-3">
          {APP_SCREENSHOTS.map((shot, i) => (
            <ScrollReveal key={shot.slug} delay={i as 0 | 1 | 2}>
              <div className="group overflow-hidden rounded-2xl border border-border/80 bg-buzzr-surface/40 shadow-soft transition-all duration-300 hover:scale-[1.02] hover:border-buzzr-accent/40 hover:shadow-glow">
                <div className="aspect-[9/19] w-full max-w-[280px] mx-auto bg-gradient-to-b from-[#0f172a] to-[#1e293b] flex items-center justify-center p-4">
                  <span className="text-center text-xs text-mutedForeground/70">
                    {shot.label}
                    <br />
                    <span className="text-[10px]">Screenshot</span>
                  </span>
                </div>
                <p className="p-3 text-center text-xs font-medium text-foreground">
                  {shot.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Features: including watch parties */}
      <section
        aria-label="Features"
        className="mx-auto max-w-5xl px-6 py-16"
      >
        <ScrollReveal delay={0}>
          <h2 className="mb-2 text-center text-xs uppercase tracking-[0.3em] text-buzzr-accent/80">
            Built for how you watch
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-center text-sm text-mutedForeground">
            Rate by entertainment, host watch parties, and never lose track of a classic.
          </p>
        </ScrollReveal>
        <ul className="mx-auto max-w-2xl space-y-0">
          {FEATURES.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <li className="group flex gap-4 border-b border-border/40 py-5 first:pt-0 last:border-b-0">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-buzzr-accent" aria-hidden />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-mutedForeground">
                    {feature.description}
                  </p>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </section>

      {/* What fans are saying – hero quote + two smaller */}
      <section
        aria-label="What fans are saying"
        className="mx-auto max-w-5xl px-6 py-16"
      >
        <ScrollReveal delay={0}>
          <h2 className="mb-2 text-center text-xs uppercase tracking-[0.3em] text-buzzr-accent/80">
            What fans are saying
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-center text-sm text-mutedForeground">
            Real reactions from people who care more about the show than the score.
          </p>
        </ScrollReveal>
        <div className="mx-auto max-w-3xl">
          <ScrollReveal delay={0}>
            <blockquote className="text-center">
              <p className="text-lg md:text-xl leading-relaxed text-foreground">
                &ldquo;{REVIEWS[0].quote}&rdquo;
              </p>
              <footer className="mt-3 text-xs text-mutedForeground">
                {REVIEWS[0].game} · {REVIEWS[0].rating}
              </footer>
            </blockquote>
          </ScrollReveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {REVIEWS.slice(1, 3).map((review, i) => (
              <ScrollReveal key={i} delay={(i + 1) as 0 | 1 | 2}>
                <blockquote className="border-l-2 border-buzzr-accent/40 pl-4">
                  <p className="text-sm leading-relaxed text-foreground">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <footer className="mt-2 text-[11px] text-mutedForeground">
                    {review.game} — {review.rating}
                  </footer>
                </blockquote>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who Buzzr is for – full-width alternating rows */}
      <section
        aria-label="Who Buzzr is for"
        className="mx-auto max-w-5xl px-6 py-16"
      >
        <ScrollReveal delay={0}>
          <h2 className="mb-2 text-center text-xs uppercase tracking-[0.3em] text-buzzr-accent/80">
            Built for fans like you
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-center text-sm text-mutedForeground">
            Whether you watch every game or just chase the best ones, Buzzr keeps track of the nights that actually delivered.
          </p>
        </ScrollReveal>
        <div className="overflow-hidden rounded-xl border border-border/50">
          {PERSONAS.map((persona, i) => (
            <ScrollReveal key={persona.title} delay={(i % 3) as 0 | 1 | 2}>
              <div
                className={`flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:gap-6 ${i % 2 === 0 ? 'bg-buzzr-surface/30' : 'bg-transparent'}`}
              >
                <h3 className="shrink-0 text-sm font-semibold text-foreground sm:w-40">
                  {persona.title}
                </h3>
                <p className="text-xs leading-relaxed text-mutedForeground sm:flex-1">
                  {persona.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* How it works – numbered steps */}
      <section
        aria-label="How Buzzr works"
        className="mx-auto max-w-5xl px-6 py-16"
      >
        <ScrollReveal delay={0}>
          <h2 className="mb-2 text-center text-xs uppercase tracking-[0.3em] text-buzzr-accent/80">
            How it works
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-mutedForeground">
            Three steps to a better watch list.
          </p>
        </ScrollReveal>
        <div className="mx-auto mt-10 max-w-2xl space-y-0">
          {[
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
              body: "See what other fans thought was rewatchable and build your list of must-watch games."
            }
          ].map((item, i) => (
            <ScrollReveal key={item.step} delay={(i % 3) as 0 | 1 | 2}>
              <div className="group flex gap-6 border-l-2 border-border/60 py-6 pl-8 pr-0 last:pb-0 first:pt-0 transition-colors hover:border-buzzr-accent/50">
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-buzzr-accent/20 text-sm font-bold text-buzzr-accent ring-2 ring-buzzr-accent/30 transition-colors group-hover:bg-buzzr-accent/30 group-hover:ring-buzzr-accent/50"
                  aria-hidden
                >
                  {item.step}
                </span>
                <div className="min-w-0">
                  <h3 className="mb-1 text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-mutedForeground">
                    {item.body}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-label="Frequently asked questions"
        className="mx-auto max-w-5xl px-6 pb-8 pt-4"
      >
        <ScrollReveal delay={0}>
          <h2 className="mb-3 text-center text-xs uppercase tracking-[0.3em] text-buzzr-accent/80">
            FAQ
          </h2>
        </ScrollReveal>
        <dl className="mx-auto max-w-2xl divide-y divide-border/50">
          {FAQS.map((item, i) => (
            <ScrollReveal key={item.q} delay={(i % 3) as 0 | 1 | 2}>
              <div className="py-4 first:pt-0">
                <dt className="text-xs font-semibold uppercase tracking-wide text-foreground">
                  {item.q}
                </dt>
                <dd className="mt-1.5 text-xs leading-relaxed text-mutedForeground">
                  {item.a}
                </dd>
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </section>

      {/* CTA */}
      <ScrollReveal delay={0}>
        <section
          aria-label="Get early access"
          className="mx-auto max-w-2xl px-6 py-16 text-center"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-buzzr-accent/80">
            {HERO_STAT}
          </p>
          <h2 className="mb-3 font-heading text-2xl text-foreground md:text-3xl">
            Join the beta
          </h2>
          <p className="mb-6 text-sm text-mutedForeground">
            Be the first to rate games by entertainment and host watch parties.
          </p>
          <Link href={BETA_TALLY_URL}>
            <Button size="lg" className="min-w-[180px] animate-breathe">
              Get early access
            </Button>
          </Link>
          <p className="mt-3 text-xs text-mutedForeground/80">
            Coming soon on iOS and Android.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-in-up" delay={0}>
        <section
          aria-label="Contact information"
          className="mx-auto max-w-5xl px-6 pb-20 pt-4"
        >
          <p className="text-center text-sm text-mutedForeground">
            For legal or support questions, contact us at{' '}
            <a
              className="text-buzzr-accent underline transition-colors hover:text-foreground"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </section>
      </ScrollReveal>
    </div>
  );
}
