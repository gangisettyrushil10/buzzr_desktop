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
  DEBATES,
  DIFFERENTIATORS,
  FAQS,
  FEATURES,
  HOW_IT_WORKS,
  PERSONAS,
  REVIEWS,
  UPCOMING_EVENTS,
  TRENDING_GAME,
} from '@/src/lib/homeContent';
import { Button } from '@/components/ui/button';
import { Marquee } from '@/components/Marquee';
import { RotatingReviews } from '@/components/RotatingReviews';
import { ScrollReveal } from '@/components/ScrollReveal';
import { BuzzrScoreMeter } from '@/components/BuzzrScoreMeter';
import { FaqAccordion } from '@/components/FaqAccordion';
import { SocialProofStrip } from '@/components/SocialProofStrip';
import { PixelFire, PixelBolt, PixelStar, PixelOrb } from '@/components/PixelIcons';
import { SegmentedBar } from '@/components/SegmentedBar';
import { LiveFeed } from '@/components/LiveFeed';
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

/** Photo assigned to each feature card */
const FEATURE_PHOTOS: Record<string, { src: string; position?: string }> = {
  CHAOS:  { src: '/sports/basketball-dark.jpg',  position: 'object-center' },
  ENERGY: { src: '/sports/soccer-action.jpg',    position: 'object-center' },
  DRAMA:  { src: '/sports/boxing-ring.jpg',       position: 'object-center' },
  CLUTCH: { src: '/sports/stadium-crowd.jpg',    position: 'object-center' },
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
      <LiveFeed />

      {/* ── HERO — dark sports photo, poster headline ─────────────────────── */}
      <section
        aria-labelledby="hero-title"
        className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden"
      >
        {/* Photo background */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/sports/basketball-dark.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-black/92" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/20" />
        </div>

        {/* BUZZR wordmark — top-left brand stamp */}
        <div className="absolute top-6 left-[5%] z-10">
          <span className="font-heading text-[11px] uppercase tracking-[0.45em] text-buzzr-accent">
            BUZZR
          </span>
        </div>

        {/* Hero content — bottom-left poster */}
        <div className="relative mx-auto w-[90%] max-w-[1400px] pb-16 pt-32">
          <header className="max-w-4xl">
            <h1
              id="hero-title"
              className="font-heading uppercase leading-[0.9] tracking-tight text-white"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
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
              className="mt-5 text-sm font-sans text-white/55 leading-relaxed opacity-0 animate-fade-in-up max-w-xs"
              style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
            >
              {HERO_SUBHEAD}
            </p>
          </header>

          {/* CTA */}
          <div
            className="mt-8 flex flex-wrap items-center gap-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.48s', animationFillMode: 'forwards' }}
          >
            <Link href={BETA_TALLY_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="min-w-[150px] animate-breathe glow-emerald-sm">
                Join Beta — Free
              </Button>
            </Link>
            <div className="flex items-center gap-4 text-xs font-sans text-white/45">
              <Link
                href={FEEDBACK_TALLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-3 transition-colors hover:text-white/80"
              >
                Leave feedback
              </Link>
              <span aria-hidden>·</span>
              <Link href="/support" className="underline underline-offset-3 transition-colors hover:text-white/80">
                Support
              </Link>
            </div>
          </div>

          <p
            className="mt-5 text-[11px] font-sans text-white/28 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            {TRUST_STRIP}
          </p>
        </div>

        {/* @handle — bottom-right */}
        <p className="absolute bottom-6 right-[5%] text-[10px] font-sans tracking-widest text-white/28">
          @the_real_buzzr
        </p>
      </section>

      {/* ── STATEMENT — soccer night photo, editorial ─────────────────────── */}
      <section
        aria-label="Buzzr manifesto"
        className="relative w-full overflow-hidden"
        style={{ minHeight: 'clamp(480px, 65vh, 780px)' }}
      >
        <Image
          src="/sports/soccer-night.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85" />

        <div className="relative flex h-full items-center justify-center py-28 px-6 text-center">
          <ScrollReveal delay={0}>
            <p className="mb-6 text-[11px] font-sans uppercase tracking-[0.45em] text-buzzr-accent/70">
              Letterboxd for Sports
            </p>
            <h2
              className="font-heading leading-[0.9] text-white mx-auto"
              style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
            >
              Chaos. Energy.<br />
              <em className="not-italic text-gradient">Drama.</em>
            </h2>
            <p className="mt-8 text-sm font-sans text-white/45 max-w-[280px] mx-auto leading-relaxed">
              Rate games by what actually matters.<br />Not the final score.
            </p>
          </ScrollReveal>
        </div>

        <p className="absolute bottom-6 right-8 text-[10px] font-sans tracking-widest text-white/22">
          @the_real_buzzr
        </p>
      </section>

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

      {/* ── FEATURE CARDS — photo poster with filmstrip (brand image style) ─ */}
      <section aria-label="Features" className="w-full">
        <ScrollReveal delay={0}>
          <div className="mx-auto w-[90%] max-w-[1400px] pt-20 pb-12">
            <p className="mb-2 text-center text-[11px] font-sans uppercase tracking-[0.3em] text-buzzr-accent/80">
              How you rate
            </p>
            <h2 className="mx-auto text-center font-heading text-2xl text-foreground md:text-3xl uppercase">
              Every dimension that <em className="not-italic text-gradient">matters.</em>
            </h2>
          </div>
        </ScrollReveal>

        {/* Full-width 2×2 photo poster grid */}
        <div className="grid sm:grid-cols-2">
          {FEATURES.map((feature, i) => {
            const photo = FEATURE_PHOTOS[feature.title] ?? { src: '/sports/basketball-macro.jpg' };
            return (
              <ScrollReveal key={feature.title} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <div
                  className="pixel-filmstrip group relative overflow-hidden"
                  style={{ minHeight: 'clamp(360px, 45vw, 580px)' }}
                >
                  {/* Photo */}
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${photo.position ?? 'object-center'}`}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />

                  {/* Content — bottom-left */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                    <h3
                      className="font-heading uppercase leading-none text-white mb-5"
                      style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}
                    >
                      {feature.title}
                    </h3>
                    <SegmentedBar value={feature.value} segments={10} segmentHeight={8} />
                    <p className="mt-4 text-xs font-sans leading-relaxed text-white/45 max-w-xs">
                      {feature.description}
                    </p>
                    <span className="mt-5 block text-[9px] font-sans uppercase tracking-[0.45em] text-buzzr-accent">
                      BUZZR
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── LEAGUE MARQUEE ────────────────────────────────────────────────── */}
      <Marquee />

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

      {/* ── TRENDING NOW — featured game, dark card ────────────────────────── */}
      <section
        aria-label="Trending game"
        className="mx-auto w-[90%] max-w-[1400px] py-4 md:py-6"
      >
        <ScrollReveal delay={0}>
          <p className="mb-5 text-[11px] font-sans uppercase tracking-[0.3em] text-buzzr-accent/80">
            Community pick · {TRENDING_GAME.label}
          </p>

          <div className="pixel-filmstrip border border-buzzr-accent/25 bg-buzzr-surface/30 p-8 md:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

              {/* Left — score + meta */}
              <div>
                {(() => {
                  const [trendInt, trendDec] = TRENDING_GAME.score.toFixed(1).split('.');
                  return (
                    <div className="mb-4 flex items-baseline leading-none">
                      <span className="font-heading text-white" style={{ fontSize: 'clamp(4rem, 12vw, 8rem)', lineHeight: 0.85 }}>
                        {trendInt}
                      </span>
                      <span className="font-heading text-buzzr-accent" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', lineHeight: 0.85 }}>
                        •
                      </span>
                      <span className="font-heading text-white" style={{ fontSize: 'clamp(4rem, 12vw, 8rem)', lineHeight: 0.85 }}>
                        {trendDec}
                      </span>
                    </div>
                  );
                })()}
                <p className="mb-2 text-xs font-sans tracking-wide text-white/38">{TRENDING_GAME.game}</p>
                <div className="mb-4 flex items-center gap-2">
                  <span className="border border-buzzr-accent/30 px-1.5 py-0.5 text-[9px] font-sans uppercase tracking-[0.2em] text-buzzr-accent/70">
                    {TRENDING_GAME.sport}
                  </span>
                  <span className="text-[9px] text-mutedForeground/40">{TRENDING_GAME.date}</span>
                </div>
                <p className="max-w-xs text-xs font-sans italic leading-relaxed text-white/45">
                  &ldquo;{TRENDING_GAME.context}&rdquo;
                </p>
              </div>

              {/* Right — breakdown */}
              <div className="flex flex-wrap gap-6 md:gap-10">
                {TRENDING_GAME.breakdown.map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-2">
                    <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-white/35">{label}</span>
                    <span className="font-heading text-xl leading-none text-white">{value}</span>
                    <SegmentedBar value={value} segments={10} segmentHeight={5} />
                  </div>
                ))}
              </div>

            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── SOCIAL PROOF ──────────────────────────────────────────────────── */}
      <section aria-label="Community stats" className="mx-auto w-[90%] max-w-[1000px] py-12 md:py-16">
        <ScrollReveal delay={0}>
          <SocialProofStrip />
        </ScrollReveal>
      </section>

      {/* ── SCORE CARDS — 3 classic games ─────────────────────────────────── */}
      <section
        aria-label="Classic game scores"
        className="mx-auto w-[90%] max-w-[1400px] py-14 md:py-16"
      >
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

      {/* ── DIFFERENTIATORS — what makes Buzzr different ──────────────────── */}
      <section
        aria-label="What makes Buzzr different"
        className="mx-auto w-[90%] max-w-[1400px] py-20 md:py-24"
      >
        <ScrollReveal delay={0}>
          <p className="mb-2 text-center text-[11px] font-sans uppercase tracking-[0.3em] text-buzzr-accent/80">
            Not just another rating app
          </p>
          <h2 className="mx-auto mb-14 max-w-xl text-center font-heading text-2xl text-foreground md:text-3xl uppercase">
            Built for fans who know the{' '}
            <em className="not-italic text-gradient">score doesn't tell the story.</em>
          </h2>
        </ScrollReveal>

        <div className="grid gap-px sm:grid-cols-2 bg-border/25">
          {DIFFERENTIATORS.map((item, i) => (
            <ScrollReveal key={item.number} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="bg-background p-8 md:p-10 flex flex-col gap-4 h-full">
                <span className="font-heading text-[11px] tracking-[0.35em] text-buzzr-accent/50">
                  {item.number}
                </span>
                <h3 className="font-heading uppercase text-xl text-foreground leading-tight md:text-2xl">
                  {item.title}
                </h3>
                <p className="text-xs font-sans leading-relaxed text-mutedForeground flex-1">
                  {item.description}
                </p>
                <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-white/22 border-l-2 border-border/40 pl-3">
                  {item.contrast}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

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

      {/* ── WATCH PARTIES — full-width editorial, major differentiator ────── */}
      <section
        aria-label="Watch parties"
        className="relative w-full overflow-hidden"
        style={{ minHeight: 'clamp(500px, 65vh, 760px)' }}
      >
        <Image
          src="/sports/stadium-crowd.jpg"
          alt="Stadium crowd"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* BUZZR stamp */}
        <div className="absolute top-6 left-8 z-10">
          <span className="font-heading text-[10px] uppercase tracking-[0.45em] text-buzzr-accent">
            BUZZR
          </span>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-end pb-16 md:pb-20">
          <div className="mx-auto w-[90%] max-w-[1400px]">
            <ScrollReveal delay={0}>
              <p className="mb-4 text-[11px] font-sans uppercase tracking-[0.35em] text-buzzr-accent">
                Watch Parties
              </p>
              <h2
                className="font-heading uppercase text-white leading-[0.9] mb-6"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
              >
                Rate it<br />
                <em className="not-italic text-gradient">together.</em>
              </h2>
              <p className="text-sm font-sans text-white/50 max-w-xs leading-relaxed mb-8">
                Invite friends, sync the game, and rate every wild moment in real-time.
                The crowd in your living room deserves a score too.
              </p>

              {/* Three micro-stats */}
              <div className="flex flex-wrap gap-6">
                {[
                  { stat: 'Live', label: 'Real-time ratings' },
                  { stat: 'Social', label: 'Rate with friends' },
                  { stat: 'Yours', label: 'Keep the log forever' },
                ].map(({ stat, label }) => (
                  <div key={stat} className="flex flex-col gap-1">
                    <span className="font-heading text-2xl text-white uppercase">{stat}</span>
                    <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-white/38">{label}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
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

      {/* ── UPCOMING EVENTS ───────────────────────────────────────────────── */}
      <section
        aria-label="Upcoming events"
        className="mx-auto w-[90%] max-w-[1400px] py-20 md:py-24"
      >
        <ScrollReveal delay={0}>
          <p className="mb-2 text-center text-[11px] font-sans uppercase tracking-[0.3em] text-buzzr-accent/80">
            On the radar
          </p>
          <h2 className="mx-auto mb-12 max-w-lg text-center font-heading text-2xl text-foreground md:text-3xl uppercase">
            Big games are{' '}
            <em className="not-italic text-gradient">coming.</em>
          </h2>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {UPCOMING_EVENTS.map((event, i) => (
            <ScrollReveal key={event.name} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className={`flex h-full flex-col gap-3 border p-6 transition-colors hover:border-buzzr-accent/40 ${
                event.highlight
                  ? 'border-buzzr-accent/50 bg-buzzr-surface/50'
                  : 'border-border/40 bg-buzzr-surface/20'
              }`}>
                <span className="inline-flex w-fit border border-buzzr-accent/30 px-1.5 py-0.5 text-[9px] font-sans uppercase tracking-[0.25em] text-buzzr-accent">
                  {event.league}
                </span>
                <p className="text-[10px] font-sans uppercase tracking-widest text-mutedForeground/55">
                  {event.dateShort}
                </p>
                <h3 className="font-heading text-lg uppercase leading-tight text-foreground">
                  {event.name}
                </h3>
                <p className="flex-1 text-xs font-sans leading-relaxed text-mutedForeground">
                  {event.subtitle}
                </p>
                {event.venue && (
                  <p className="text-[10px] font-sans uppercase tracking-wide text-white/25">
                    {event.venue}
                  </p>
                )}
                <div className="flex items-center gap-2 border-t border-border/30 pt-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-buzzr-accent animate-breathe" aria-hidden />
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-mutedForeground/60">
                    {event.fans}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── DEBATES — boxing ring photo, editorial ────────────────────────── */}
      <section
        aria-label="Buzzr Debates"
        className="pixel-filmstrip relative w-full overflow-hidden"
        style={{ minHeight: 'clamp(560px, 70vh, 820px)' }}
      >
        <Image
          src="/sports/boxing-ring.jpg"
          alt="Boxing ring"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

        {/* BUZZR stamp */}
        <div className="absolute top-6 left-8 z-10">
          <span className="font-heading text-[10px] uppercase tracking-[0.45em] text-buzzr-accent">
            BUZZR
          </span>
        </div>

        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-14 md:pb-20 px-[5%]">
          <ScrollReveal delay={0}>
            {/* VS tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-buzzr-accent font-heading text-sm tracking-widest">// VS //</span>
            </div>

            <h2
              className="font-heading uppercase text-white leading-[0.88] mb-6"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)' }}
            >
              DEBATE<br />
              <em className="not-italic text-gradient">ME.</em>
            </h2>
            <p className="text-[11px] font-sans uppercase tracking-[0.35em] text-white/35 mb-10">
              Buzzr Debates
            </p>

            {/* Debate cards — horizontal row */}
            <div className="grid gap-3 sm:grid-cols-3 max-w-3xl">
              {DEBATES.map((debate, i) => (
                <ScrollReveal key={debate.tag + i} delay={(i % 3) as 0 | 1 | 2}>
                  <div className="border border-buzzr-accent/30 bg-black/60 backdrop-blur-sm p-5">
                    <p className="text-[9px] font-sans uppercase tracking-[0.35em] text-buzzr-accent mb-2">
                      {debate.tag}
                    </p>
                    <p className="font-heading text-sm text-white uppercase leading-tight mb-2">
                      {debate.title}
                    </p>
                    <p className="text-[11px] font-sans text-white/38 leading-relaxed">
                      {debate.body}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ── BADGE SHOWCASE — pure dark bg, filmstrip, floating cards ─────── */}
      <section
        aria-label="Earn badges"
        className="pixel-filmstrip relative w-full overflow-hidden py-24 md:py-32 bg-black"
      >
        {/* BUZZR stamp */}
        <div className="absolute top-6 left-8 z-10">
          <span className="font-heading text-[10px] uppercase tracking-[0.45em] text-buzzr-accent">
            BUZZR
          </span>
        </div>

        <div className="relative z-10 mx-auto w-[90%] max-w-[1400px]">
          <ScrollReveal delay={0}>
            <p className="mb-2 text-center text-[11px] font-sans uppercase tracking-[0.3em] text-buzzr-accent/80">
              Earn your stripes
            </p>
            <h2 className="mx-auto mb-3 max-w-lg text-center font-heading text-2xl text-white md:text-3xl uppercase">
              Badges for real fans.
            </h2>
            <p className="mx-auto mb-14 max-w-sm text-center text-sm font-sans text-white/38">
              Rate games, log watches, and unlock badges that actually mean something.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-3">
            {BADGES.map((badge, i) => (
              <ScrollReveal key={badge.name} delay={(i % 3) as 0 | 1 | 2}>
                {/* Floating badge card — like Image 7 */}
                <div className="border border-buzzr-accent/45 bg-black/72 backdrop-blur-sm p-7 text-center">
                  <div className="flex justify-center gap-3 mb-5" aria-hidden>
                    <BadgeIcon icon={badge.icon} size={22} />
                    <BadgeIcon icon={badge.icon} size={22} />
                    <BadgeIcon icon={badge.icon} size={22} />
                  </div>
                  <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-buzzr-accent mb-2">
                    Badge Unlocked
                  </p>
                  <p className="font-heading uppercase text-xl text-white mb-5 tracking-wide">
                    {badge.name}
                  </p>
                  <SegmentedBar value={badge.level} segments={10} segmentHeight={5} className="mb-5" />
                  <p className="text-xs font-sans text-white/38 leading-relaxed">
                    {badge.description}
                  </p>
                  <span className="mt-5 block text-[9px] font-sans uppercase tracking-[0.45em] text-buzzr-accent/55">
                    BUZZR
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
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

      {/* ── FINAL CTA — basketball macro photo, filmstrip, large wordmark ──── */}
      <section
        aria-label="Get early access"
        className="pixel-filmstrip relative w-full overflow-hidden"
        style={{ minHeight: 'clamp(520px, 65vh, 760px)' }}
      >
        <Image
          src="/sports/basketball-macro.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/82 via-black/65 to-black/92" />

        {/* BUZZR stamp top-left */}
        <div className="absolute top-6 left-[5%] z-10">
          <span className="font-heading text-[10px] uppercase tracking-[0.45em] text-buzzr-accent">
            BUZZR
          </span>
        </div>

        {/* Content — bottom-left, like Image 8 */}
        <div className="absolute bottom-0 left-0 right-0 p-[5%] pb-16 md:pb-24">
          <ScrollReveal delay={0}>
            <p className="mb-5 text-[11px] font-sans uppercase tracking-[0.35em] text-buzzr-accent/75">
              {HERO_STAT}
            </p>
            {/* Large buzzr. wordmark */}
            <div className="mb-2">
              <span
                className="font-heading lowercase text-white leading-none"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)' }}
              >
                buzzr<span className="text-buzzr-accent">.</span>
              </span>
            </div>
            <p className="mb-10 text-[11px] font-sans uppercase tracking-[0.35em] text-white/38">
              RATE THE GAME.
            </p>
            <Link href={BETA_TALLY_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="min-w-[200px] animate-breathe glow-emerald-sm text-sm">
                Get early access
              </Button>
            </Link>
            <div className="mt-6 flex items-center gap-3 text-white/28">
              <FontAwesomeIcon icon={faApple} className="h-5 w-5" aria-label="iOS" />
              <FontAwesomeIcon icon={faGooglePlay} className="h-4 w-4" aria-label="Android" />
            </div>
          </ScrollReveal>
        </div>

        <p className="absolute bottom-6 right-[5%] text-[10px] font-sans tracking-widest text-white/22">
          @the_real_buzzr
        </p>
      </section>

      {/* ── CONTACT NOTE ──────────────────────────────────────────────────── */}
      <ScrollReveal delay={0}>
        <section aria-label="Contact information" className="mx-auto w-[90%] max-w-[1400px] pb-20 pt-8">
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
