import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BETA_TALLY_URL,
  FEEDBACK_TALLY_URL,
  HERO_EMOTIONAL_LINE,
  HERO_STAT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SUPPORT_EMAIL,
  TRUST_STRIP
} from '@/src/lib/constants';
import {
  APP_SCREENSHOTS,
  FAQS,
  FEATURES,
  HOW_IT_WORKS,
  PERSONAS,
  REVIEWS
} from '@/src/lib/homeContent';
import { Button } from '@/components/ui/button';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { Marquee } from '@/components/Marquee';
import { RotatingReviews } from '@/components/RotatingReviews';
import { ScrollReveal } from '@/components/ScrollReveal';
import { TrendingPulse } from '@/components/TrendingPulse';
import { Parallax } from '@/components/Parallax';
import { ScrollAudioTrigger } from '@/components/ScrollAudioTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';

import Image from 'next/image';

function MockupContent({ slug }: { slug: string }) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={`/screenshot-${slug}.png`}
        alt={`Mockup showing ${slug} feature`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 240px"
        priority
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION
  }
};

export default function HomePage() {
  return (
    <div className="relative">
      <ScrollAudioTrigger />
      <FloatingOrbs className="-z-10" />

      {/* Hero */}
      <section
        data-buzz-section="true"
        aria-labelledby="hero-title"
        className="relative mx-auto flex max-w-5xl flex-col gap-10 px-6 pb-20 pt-24 md:pt-32"
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
          >
            Buzzr — Rate sports games by entertainment.
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
            <span className="flex items-center gap-1.5 opacity-80 filter grayscale">
              <FontAwesomeIcon icon={faApple} className="h-3 w-3" />
              <FontAwesomeIcon icon={faGooglePlay} className="h-2.5 w-2.5" />
            </span>
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
      <TrendingPulse />

      {/* App screenshots */}
      <section
        data-buzz-section="true"
        aria-label="App preview"
        className="mx-auto max-w-5xl px-6 py-24 md:py-32"
      >
        <ScrollReveal delay={0}>
          <h2 className="mb-2 text-center text-xs uppercase tracking-[0.3em] text-buzzr-accent/80">
            See Buzzr in action
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-center text-sm text-mutedForeground">
            Rate games, start watch parties, and build your rewatch list — all in one place.
          </p>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {APP_SCREENSHOTS.map((shot, i) => (
            <ScrollReveal key={shot.slug} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-buzzr-surface/20 shadow-soft pb-4">
                <div className="aspect-[9/19] w-full max-w-[240px] mx-auto relative bg-background border-[6px] border-border/30 rounded-[2.5rem] mt-8 overflow-hidden shadow-2xl flex flex-col items-center">
                  <MockupContent slug={shot.slug} />
                </div>
                <p className="mt-6 text-center text-sm font-semibold tracking-wide text-foreground">
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
        className="relative mx-auto max-w-5xl px-6 py-24 md:py-32 overflow-hidden"
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
        data-buzz-section="true"
        aria-label="What fans are saying"
        className="mx-auto max-w-5xl px-6 py-24 md:py-32"
      >
        <ScrollReveal delay={0}>
          <h2 className="mb-2 text-center text-xs uppercase tracking-[0.3em] text-buzzr-accent/80">
            What fans are saying
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-center text-sm text-mutedForeground">
            Real reactions from people who care more about the show than the score.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0}>
          <RotatingReviews reviews={REVIEWS} />
        </ScrollReveal>
      </section>

      {/* Who Buzzr is for – full-width alternating rows */}
      <section
        data-buzz-section="true"
        aria-label="Who Buzzr is for"
        className="relative mx-auto max-w-5xl px-6 py-24 md:py-32 overflow-hidden"
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
        data-buzz-section="true"
        aria-label="How Buzzr works"
        className="mx-auto max-w-5xl px-6 py-24 md:py-32"
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
          {HOW_IT_WORKS.map((item, i) => (
            <ScrollReveal key={item.step} delay={(i % 3) as 0 | 1 | 2}>
              <div className="flex gap-6 border-l-2 border-border/60 py-6 pl-8 pr-0 last:pb-0 first:pt-0">
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-buzzr-accent/20 text-sm font-bold text-buzzr-accent ring-2 ring-buzzr-accent/30"
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
        data-buzz-section="true"
        aria-label="Frequently asked questions"
        className="mx-auto max-w-5xl px-6 py-24 md:py-32"
      >
        <ScrollReveal delay={0}>
          <h2 className="mb-3 text-center text-xs uppercase tracking-[0.3em] text-buzzr-accent/80">
            FAQ
          </h2>
        </ScrollReveal>
        <dl className="mx-auto max-w-2xl px-2">
          {FAQS.map((item, i) => (
            <ScrollReveal key={item.q} delay={(i % 3) as 0 | 1 | 2} className="border-b border-border/50 last:border-0">
              <div className="py-8">
                <dt className="text-sm font-bold uppercase tracking-widest text-foreground">
                  {item.q}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-mutedForeground">
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
          data-buzz-section="true"
          aria-label="Get early access"
          className="mx-auto max-w-2xl px-6 py-24 md:py-32 text-center"
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
          <div className="mt-4 flex items-center justify-center gap-3 text-mutedForeground/60">
            <FontAwesomeIcon icon={faApple} className="h-5 w-5 hover:text-foreground transition-colors" />
            <FontAwesomeIcon icon={faGooglePlay} className="h-4 w-4 hover:text-foreground transition-colors" />
          </div>
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
