import Link from 'next/link';
import { APP_STORE_URL, DISCORD_URL } from '@/src/lib/constants';

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-24 min-h-[100dvh] md:pt-40 md:pb-32"
    >
      {/* Single luminous glow, xAI's diffuse hero halo, emerald-tinted */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(0,230,118,0.26) 0%, rgba(0,230,118,0.12) 35%, transparent 65%)'
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 text-center">
        <h1
          id="hero-title"
          className="text-[clamp(48px,9vw,80px)] font-normal leading-[1] tracking-[-0.025em] text-foreground"
        >
          Rate the game.<br />
          Not the score.
        </h1>

        <p className="max-w-[560px] text-[20px] leading-[1.4] tracking-[-0.025em] text-muted">
          Any sport, any league. Score games by entertainment, scroll, rate, and follow the moments that actually mattered.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-foreground px-3 py-1 text-[14px] tracking-[-0.025em] text-canvas transition-colors hover:bg-foreground/90"
          >
            Get the App
          </Link>
          <Link
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-white/25 px-4 py-2 text-[14px] tracking-[-0.025em] text-foreground transition-colors hover:border-white/50"
          >
            Join the Discord
          </Link>
        </div>
      </div>
    </section>
  );
}
