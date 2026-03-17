import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  BETA_TALLY_URL,
  FEEDBACK_TALLY_URL,
  HERO_LINE1,
  HERO_LINE2_ACCENT,
  HERO_LINE2_PLAIN,
  HERO_SUBHEAD,
  HERO_STAT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SUPPORT_EMAIL,
  TRUST_STRIP
} from '@/src/lib/constants';
import {
  APP_SCREENSHOTS,
  BADGES,
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
import { BuzzrScoreMeter } from '@/components/BuzzrScoreMeter';
import { FaqAccordion } from '@/components/FaqAccordion';
import { SocialProofStrip } from '@/components/SocialProofStrip';
import { PixelFire, PixelBolt, PixelStar, PixelOrb } from '@/components/PixelIcons';
import { SegmentedBar } from '@/components/SegmentedBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — Rate sports games by entertainment.`,
    description: SITE_DESCRIPTION
  }
};

function MockupContent({ slug }: { slug: string }) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={`/screenshot-${slug}.png`}
        alt={`Buzzr app — ${slug} screen`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 240px"
        priority
      />
    </div>
  );
}

function Divider() {
  return (
    <div className="mx-auto w-[90%] max-w-[1400px]">
      <div className="divider-gradient" aria-hidden />
    </div>
  );
}

function BadgeIcon({ icon, size = 24 }: { icon: string; size?: number }) {
  if (icon === 'fire') return <PixelFire size={size} />;
  if (icon === 'bolt') return <PixelBolt size={size} />;
  if (icon === 'star') return <PixelStar size={size} />;
  return <PixelOrb size={size} />;
}

export default function HomePage() {
  return (
    <div className="relative">
      <FloatingOrbs className="-z-10" />

      {/* ── HERO — full viewport, sports photo bg ─────────────────────────── */}
      <section
        aria-labelledby="hero-title"
        className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden"
      >
        {/* Photo background */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/stadium-dark.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark scrim — lighter in center so photo is visible, heavy at edges/bottom for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20" />
        </div>

        {/* Live badge — top left, matching brand image layout */}
        <div className="absolute top-6 left-[5%] md:left-[5%]">
          <span
            className="badge-live inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-sans font-medium tracking-wide opacity-0 animate-fade-in"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-buzzr-accent2" aria-hidden />
            GAME NIGHT
          </span>
        </div>

        {/* Content — anchored bottom-left, poster style */}
        <div className="relative mx-auto w-[90%] max-w-[1400px] pb-16 pt-32">
          <header className="max-w-4xl space-y-4">
            <h1
              id="hero-title"
              className="font-heading uppercase leading-[0.92] tracking-tight text-white"
              style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
            >
              <span
                className="block opacity-0 animate-fade-in-up"
                style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
              >
                {HERO_LINE1}
              </span>
              <span
                className="block opacity-0 animate-fade-in-up"
                style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
              >
                {HERO_LINE2_PLAIN}{' '}
                <em className="not-italic text-gradient">{HERO_LINE2_ACCENT}</em>
              </span>
            </h1>

            <p
              className="max-w-sm text-sm font-sans text-white/70 leading-relaxed opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
            >
              {HERO_SUBHEAD}
            </p>
          </header>

          {/* CTA row */}
          <div
            className="mt-8 flex flex-wrap items-center gap-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.48s', animationFillMode: 'forwards' }}
          >
            <Link href={BETA_TALLY_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="min-w-[150px] animate-breathe glow-emerald-sm">
                Join Beta — Free
              </Button>
            </Link>
            <div className="flex items-center gap-4 text-xs font-sans text-white/50">
              <Link href={FEEDBACK_TALLY_URL} target="_blank" rel="noopener noreferrer"
                    className="underline underline-offset-3 transition-colors hover:text-white/80">
                Leave feedback
              </Link>
              <span aria-hidden>·</span>
              <Link href="/support" className="underline underline-offset-3 transition-colors hover:text-white/80">
                Support
              </Link>
              <span aria-hidden>·</span>
              <span className="flex items-center gap-1.5 opacity-60">
                <FontAwesomeIcon icon={faApple} className="h-3.5 w-3.5" aria-label="iOS" />
                <FontAwesomeIcon icon={faGooglePlay} className="h-3 w-3" aria-label="Android" />
              </span>
            </div>
          </div>

          {/* Trust strip */}
          <p
            className="mt-5 text-xs font-sans text-white/35 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            {TRUST_STRIP}
          </p>
        </div>

        {/* Bottom-right social handle */}
        <p className="absolute bottom-6 right-[5%] text-[10px] font-sans tracking-widest text-white/30">
          @the_real_buzzr
        </p>
      </section>

      {/* ── STATEMENT / MANIFESTO ─────────────────────────────────────────── */}
      <section aria-label="Buzzr manifesto" className="w-full bg-black py-24 md:py-32 text-center">
        <ScrollReveal delay={0}>
          <p className="mb-6 text-[11px] font-sans uppercase tracking-[0.35em] text-mutedForeground/60">
            Letterboxd for Sports
          </p>
          <h2
            className="font-heading uppercase leading-[0.9] text-foreground mx-auto max-w-4xl px-6"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            Chaos. Energy.<br />
            <em className="not-italic text-gradient">Drama.</em>
          </h2>
          <p className="mt-8 text-sm font-sans text-mutedForeground max-w-sm mx-auto leading-relaxed px-6">
            Rate games by what actually matters.<br />Not the final score.
          </p>
        </ScrollReveal>
      </section>

      {/* ── GAME NIGHT — photo section ────────────────────────────────────── */}
      <section aria-label="Game night" className="relative w-full overflow-hidden" style={{ height: 'clamp(320px, 55vh, 600px)' }}>
        <Image
          src="/sports/soccer-night.jpg"
          alt="Football field lit up at night"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient scrim — heavy at bottom so text reads */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* BUZZR wordmark top-left — matches brand image style */}
        <div className="absolute top-6 left-8">
          <span className="font-heading text-[10px] uppercase tracking-[0.4em] text-buzzr-accent">
            BUZZR
          </span>
        </div>

        {/* Content — bottom-left anchored */}
        <div className="absolute bottom-0 left-0 p-8 md:p-12">
          {/* Pixel icons row */}
          <div className="flex gap-3 mb-3 opacity-70" aria-hidden>
            <PixelFire size={18} />
            <PixelBolt size={18} />
            <PixelStar size={18} />
          </div>
          <h2
            className="font-heading uppercase text-white leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            GAME NIGHT.
          </h2>
          <p className="mt-2 text-[11px] font-sans uppercase tracking-widest text-white/40">
            Every game. Rated. Remembered.
          </p>
        </div>
      </section>

      {/* ── LEAGUE MARQUEE ────────────────────────────────────────────────── */}
      <Marquee />

      {/* ── SOCIAL PROOF ──────────────────────────────────────────────────── */}
      <section aria-label="Community stats" className="mx-auto w-[90%] max-w-[1000px] py-12 md:py-16">
        <ScrollReveal delay={0}>
          <SocialProofStrip />
        </ScrollReveal>
      </section>

      <Divider />

      {/* ── SCORE METER DEMO ──────────────────────────────────────────────── */}
      <section
        aria-label="Buzzr score demo"
        className="mx-auto w-[90%] max-w-[1400px] py-16 md:py-20"
      >
        <ScrollReveal delay={0}>
          <p className="mb-1 text-center text-[11px] font-sans uppercase tracking-[0.3em] text-buzzr-accent/70">
            Entertainment Scores
          </p>
          <p className="mx-auto mb-10 max-w-xs text-center text-xs font-sans text-mutedForeground/60">
            Rated by fans on chaos, energy, and drama.
          </p>
        </ScrollReveal>
        <div className="grid gap-4 sm:grid-cols-3">
          <ScrollReveal delay={0} className="flex">
            <BuzzrScoreMeter
              score={9.4}
              game="Chiefs vs Bills · Divisional"
              sport="NFL"
              date="Jan 2022"
              breakdown={[
                { label: 'Chaos',  value: 9.8 },
                { label: 'Energy', value: 9.2 },
                { label: 'Drama',  value: 9.4 },
              ]}
            />
          </ScrollReveal>
          <ScrollReveal delay={1} className="flex">
            <BuzzrScoreMeter
              score={10}
              game="Argentina vs France · WC Final"
              sport="FIFA"
              date="Dec 2022"
              breakdown={[
                { label: 'Chaos',  value: 10  },
                { label: 'Energy', value: 9.8 },
                { label: 'Drama',  value: 10  },
              ]}
            />
          </ScrollReveal>
          <ScrollReveal delay={2} className="flex">
            <BuzzrScoreMeter
              score={9.8}
              game="SD State vs FAU · Final Four"
              sport="NCAAB"
              date="Apr 2023"
              breakdown={[
                { label: 'Chaos',  value: 9.4 },
                { label: 'Energy', value: 9.6 },
                { label: 'Drama',  value: 10  },
              ]}
            />
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ── FEATURE CARDS — metric style ──────────────────────────────────── */}
      <section
        aria-label="Features"
        className="mx-auto w-[90%] max-w-[1400px] py-20 md:py-24"
      >
        <ScrollReveal delay={0}>
          <p className="mb-2 text-center text-[11px] font-sans uppercase tracking-[0.3em] text-buzzr-accent/80">
            How you rate
          </p>
          <h2 className="mx-auto mb-12 max-w-lg text-center font-heading text-2xl text-foreground md:text-3xl uppercase">
            Every dimension that <em className="not-italic text-gradient">matters.</em>
          </h2>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {FEATURES.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="group relative overflow-hidden border border-border/40 bg-buzzr-surface/20 p-6 transition-all hover:border-buzzr-accent/30 hover:bg-buzzr-surface/40">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-buzzr-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3
                  className="font-heading uppercase leading-none mb-4 text-foreground"
                  style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}
                >
                  {feature.title}
                </h3>
                <SegmentedBar value={feature.value} segments={10} segmentHeight={6} />
                <p className="mt-5 text-xs font-sans leading-relaxed text-mutedForeground">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── APP SCREENSHOTS ───────────────────────────────────────────────── */}
      <section
        aria-label="App preview"
        className="mx-auto w-[90%] max-w-[1400px] py-20 md:py-24"
      >
        <ScrollReveal delay={0}>
          <p className="mb-2 text-center text-[11px] font-sans uppercase tracking-[0.3em] text-buzzr-accent/80">
            See Buzzr in action
          </p>
          <p className="mx-auto mb-10 max-w-lg text-center text-sm font-sans text-mutedForeground">
            Rate games, start watch parties, and build your rewatch list — all in one place.
          </p>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {APP_SCREENSHOTS.map((shot, i) => (
            <ScrollReveal key={shot.slug} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="group overflow-hidden border border-border/40 bg-black pb-4 transition-all hover:border-buzzr-accent/30 hover:shadow-glow">
                <div className="aspect-[9/19] w-full max-w-[220px] mx-auto relative bg-background border-[5px] border-border/40 mt-6 overflow-hidden shadow-soft flex flex-col items-center">
                  <MockupContent slug={shot.slug} />
                </div>
                <p className="mt-5 text-center text-[11px] font-sans font-medium tracking-wide text-mutedForeground group-hover:text-foreground transition-colors">
                  {shot.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section
        aria-label="How Buzzr works"
        className="mx-auto w-[90%] max-w-[1400px] py-20 md:py-24"
      >
        <ScrollReveal delay={0}>
          <p className="mb-2 text-center text-[11px] font-sans uppercase tracking-[0.3em] text-buzzr-accent/80">
            How it works
          </p>
          <h2 className="mx-auto mb-12 max-w-md text-center font-heading text-2xl text-foreground md:text-3xl uppercase">
            Three steps to a better watch list.
          </h2>
        </ScrollReveal>

        <div className="mx-auto max-w-2xl">
          {HOW_IT_WORKS.map((item, i) => (
            <ScrollReveal key={item.step} delay={(i % 3) as 0 | 1 | 2}>
              <div className="flex gap-6 pb-10 last:pb-0">
                <div className="flex flex-col items-center gap-2">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center font-heading text-base font-bold text-buzzr-accent"
                    style={{
                      background: 'rgba(16,185,129,0.08)',
                      border: '1px solid rgba(16,185,129,0.3)'
                    }}
                    aria-hidden
                  >
                    {item.step}
                  </span>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div
                      className="w-px flex-1"
                      style={{ background: 'linear-gradient(to bottom, rgba(16,185,129,0.25), transparent)' }}
                      aria-hidden
                    />
                  )}
                </div>
                <div className="min-w-0 pb-2 pt-1.5">
                  <h3 className="mb-1.5 text-sm font-sans font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs font-sans leading-relaxed text-mutedForeground">{item.body}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── REVIEWS ───────────────────────────────────────────────────────── */}
      <section
        aria-label="What fans are saying"
        className="mx-auto w-[90%] max-w-[1400px] py-20 md:py-24"
      >
        <ScrollReveal delay={0}>
          <p className="mb-2 text-center text-[11px] font-sans uppercase tracking-[0.3em] text-buzzr-accent/80">
            What fans are saying
          </p>
          <p className="mx-auto mb-10 max-w-lg text-center text-sm font-sans text-mutedForeground">
            Real reactions from people who care more about the show than the score.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0}>
          <RotatingReviews reviews={REVIEWS} />
        </ScrollReveal>
      </section>

      <Divider />

      {/* ── WHO BUZZR IS FOR ──────────────────────────────────────────────── */}
      <section
        aria-label="Who Buzzr is for"
        className="mx-auto w-[90%] max-w-[1400px] py-20 md:py-24"
      >
        <ScrollReveal delay={0}>
          <p className="mb-2 text-center text-[11px] font-sans uppercase tracking-[0.3em] text-buzzr-accent/80">
            Built for fans like you
          </p>
          <h2 className="mx-auto mb-10 max-w-lg text-center font-heading text-2xl text-foreground md:text-3xl uppercase">
            Whether you watch every game or{' '}
            <em className="not-italic text-gradient">just chase the best ones.</em>
          </h2>
        </ScrollReveal>

        <div className="overflow-hidden border border-border/40">
          {PERSONAS.map((persona, i) => (
            <ScrollReveal key={persona.title} delay={(i % 3) as 0 | 1 | 2}>
              <div
                className={`flex flex-col gap-2 px-6 py-6 sm:flex-row sm:items-center sm:gap-8 transition-colors ${
                  i % 2 === 0 ? 'bg-buzzr-surface/30' : 'bg-transparent'
                } hover:bg-buzzr-surface/50`}
              >
                <h3 className="shrink-0 text-sm font-heading uppercase text-foreground sm:w-44">
                  {persona.title}
                </h3>
                <div className="h-px w-full sm:hidden bg-border/30" aria-hidden />
                <p className="text-xs font-sans leading-relaxed text-mutedForeground sm:flex-1">
                  {persona.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── BADGE SHOWCASE ────────────────────────────────────────────────── */}
      <section
        aria-label="Earn badges"
        className="mx-auto w-[90%] max-w-[1400px] py-20 md:py-24"
      >
        <ScrollReveal delay={0}>
          <p className="mb-2 text-center text-[11px] font-sans uppercase tracking-[0.3em] text-buzzr-accent/80">
            Earn your stripes
          </p>
          <h2 className="mx-auto mb-3 max-w-lg text-center font-heading text-2xl text-foreground md:text-3xl uppercase">
            Badges for real fans.
          </h2>
          <p className="mx-auto mb-12 max-w-sm text-center text-sm font-sans text-mutedForeground">
            Rate games, log watches, and unlock badges that actually mean something.
          </p>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-3">
          {BADGES.map((badge, i) => (
            <ScrollReveal key={badge.name} delay={(i % 3) as 0 | 1 | 2}>
              <div className="pixel-frame-full bg-buzzr-surface/20 p-6 text-center transition-shadow hover:shadow-glow">
                <div className="flex justify-center gap-3 mb-5" aria-hidden>
                  <BadgeIcon icon={badge.icon} size={20} />
                  <BadgeIcon icon={badge.icon} size={20} />
                  <BadgeIcon icon={badge.icon} size={20} />
                </div>
                <p className="font-heading uppercase text-lg text-foreground mb-1 tracking-wide">
                  {badge.name}
                </p>
                <p className="text-[10px] font-sans uppercase tracking-widest text-buzzr-accent mb-4">
                  Badge Unlocked
                </p>
                <SegmentedBar value={badge.level} segments={10} segmentHeight={5} className="mb-4" />
                <p className="text-xs font-sans text-mutedForeground leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section
        aria-label="Frequently asked questions"
        className="mx-auto w-[90%] max-w-[1400px] py-20 md:py-24"
      >
        <ScrollReveal delay={0}>
          <p className="mb-2 text-center text-[11px] font-sans uppercase tracking-[0.3em] text-buzzr-accent/80">
            FAQ
          </p>
          <h2 className="mx-auto mb-10 max-w-lg text-center font-heading text-2xl text-foreground md:text-3xl uppercase">
            Common questions.
          </h2>
        </ScrollReveal>
        <FaqAccordion items={FAQS} />
      </section>

      <Divider />

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <ScrollReveal delay={0}>
        <section
          aria-label="Get early access"
          className="mx-auto w-[90%] max-w-2xl py-24 md:py-32 text-center"
        >
          <p className="mb-3 text-[11px] font-sans uppercase tracking-[0.3em] text-buzzr-accent/80">
            {HERO_STAT}
          </p>
          <h2 className="mb-4 font-heading text-3xl text-foreground md:text-5xl uppercase">
            Join the beta.
          </h2>
          <p className="mb-10 text-sm font-sans text-mutedForeground max-w-sm mx-auto leading-relaxed">
            Be the first to rate games by entertainment and host watch parties with your crew.
          </p>
          <Link href={BETA_TALLY_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="min-w-[200px] animate-breathe glow-emerald-sm text-sm">
              Get early access
            </Button>
          </Link>
          <div className="mt-6 flex items-center justify-center gap-3 text-mutedForeground/40">
            <FontAwesomeIcon icon={faApple} className="h-5 w-5 hover:text-mutedForeground transition-colors" aria-label="iOS" />
            <FontAwesomeIcon icon={faGooglePlay} className="h-4 w-4 hover:text-mutedForeground transition-colors" aria-label="Android" />
          </div>
        </section>
      </ScrollReveal>

      {/* ── CONTACT NOTE ──────────────────────────────────────────────────── */}
      <ScrollReveal delay={0}>
        <section aria-label="Contact information" className="mx-auto w-[90%] max-w-[1400px] pb-20 pt-4">
          <p className="text-center text-xs font-sans text-mutedForeground/60">
            For legal or support questions, contact{' '}
            <a
              className="text-buzzr-accent underline underline-offset-3 transition-colors hover:text-buzzr-accent2"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>
          </p>
        </section>
      </ScrollReveal>
    </div>
  );
}
