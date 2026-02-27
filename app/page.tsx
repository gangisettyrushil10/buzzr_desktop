import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  BETA_TALLY_URL,
  FEEDBACK_TALLY_URL,
  SITE_DESCRIPTION,
  SUPPORT_EMAIL
} from '@/src/lib/constants';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Buzzr Sports — Rate sports games by entertainment.',
  description: SITE_DESCRIPTION,
  openGraph: {
    title: 'Buzzr Sports — Rate sports games by entertainment.',
    description: SITE_DESCRIPTION
  }
};

export default function HomePage() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative mx-auto flex max-w-5xl flex-col gap-10 px-6 pb-16 pt-10 md:pt-16"
    >
      {/* Stadium glow band with subtle pixel edges */}
      <div className="pointer-events-none absolute inset-x-0 top-4 -z-10 mx-auto h-80 max-w-4xl rounded-[2.2rem] border border-buzzr-accent/18 bg-[radial-gradient(circle_at_top,_rgba(148,210,225,0.55),_transparent_60%)] shadow-[0_22px_80px_rgba(0,0,0,0.8)]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0)_0,_rgba(0,0,0,0.55)_80%)]" />
      </div>

      <header className="space-y-5">
        <p className="text-xs uppercase tracking-[0.3em] text-buzzr-accent/80">
          Letterboxd for sports
        </p>
        <div className="flex items-center gap-4">
          <div className="relative hidden h-20 w-20 overflow-hidden rounded-[0.9rem] border border-buzzr-accent/60 bg-[#020817] shadow-[0_0_0_1px_rgba(15,23,42,0.9)] sm:block">
            <Image
              src="/buzzr-stadium-dark.png"
              alt="Buzzr Sports pixel stadium logo"
              fill
              sizes="80px"
              className="object-contain"
              priority
            />
          </div>
        <h1
          id="hero-title"
          className="font-heading text-4xl leading-tight text-foreground md:text-5xl"
        >
          Buzzr Sports — Rate sports games by entertainment.
        </h1>
        </div>
        <p className="max-w-xl text-sm text-mutedForeground md:text-base">
          Buzzr is the Letterboxd for sports games. See what was actually worth
          watching, track the games you loved (or regretted), and find
          rewatchable classics.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <Link href={BETA_TALLY_URL}>
          <Button size="lg">Join Beta</Button>
        </Link>
        <Link href={FEEDBACK_TALLY_URL}>
          <Button size="lg" variant="outline">
            Leave Feedback
          </Button>
        </Link>
        <Link href="/support">
          <Button size="lg" variant="ghost">
            Support
          </Button>
        </Link>
      </div>

      {/* Thin pixel line under hero to echo retro HUD */}
      <div className="h-px w-full max-w-md bg-[repeating-linear-gradient(to_right,_rgba(148,210,225,0.6)_0,_rgba(148,210,225,0.6)_4px,transparent_4px,transparent_8px)]" />

      <section
        aria-label="How Buzzr Sports works"
        className="grid gap-4 md:grid-cols-3"
      >
        <article className="rounded-2xl border border-border/80 bg-buzzr-surface/60 p-4 shadow-soft backdrop-blur-sm">
          <h2 className="mb-1 text-sm font-semibold text-foreground">
            Track every game
          </h2>
          <p className="text-xs text-mutedForeground">
            Log the games you watch across leagues and seasons so you can look
            back at what was actually worth your time.
          </p>
        </article>
        <article className="rounded-2xl border border-border/80 bg-buzzr-surface/60 p-4 shadow-soft backdrop-blur-sm">
          <h2 className="mb-1 text-sm font-semibold text-foreground">
            Entertainment-first ratings
          </h2>
          <p className="text-xs text-mutedForeground">
            Rate games on vibes, not just box scores — chaos factor, crowd
            energy, drama, and pure fun.
          </p>
        </article>
        <article className="rounded-2xl border border-border/80 bg-buzzr-surface/60 p-4 shadow-soft backdrop-blur-sm">
          <h2 className="mb-1 text-sm font-semibold text-foreground">
            Never miss a classic
          </h2>
          <p className="text-xs text-mutedForeground">
            See what other fans thought was rewatchable so you can catch up on
            must-watch games from any season.
          </p>
        </article>
      </section>

      <section aria-label="Contact information" className="pt-2">
        <p className="text-xs text-mutedForeground">
          For legal or support questions, contact us at{' '}
          <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </section>
    </section>
  );
}
