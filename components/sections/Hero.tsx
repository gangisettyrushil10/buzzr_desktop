import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { APP_STORE_URL, DISCORD_URL } from '@/src/lib/constants';
import { AppStoreBadge } from '@/components/ui/AppStoreBadge';
import { HeroStack, HeroStackMobile } from '@/components/ui/HeroStack';

const HERO_WORDS = ['Swipe.', 'Rate.', 'Engage.'];

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex w-full flex-col justify-center overflow-hidden px-8 pt-28 pb-24 min-h-[100dvh] sm:px-12 md:px-16 md:pt-36 md:pb-28 lg:px-24 xl:px-32 scroll-mt-24"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-[1600px] items-center gap-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative flex flex-col gap-10">
          <h1
            id="hero-title"
            className="font-display text-[clamp(64px,10vw,132px)] font-light leading-[0.92] tracking-[-0.045em] text-foreground"
          >
            {HERO_WORDS.map((word) => {
              const stem = word.slice(0, -1); // strip trailing period
              return (
                <span key={word} className="mr-[0.22em] inline-block">
                  <span className="font-medium">{stem}</span>
                  <span className="text-buzzr-accent">.</span>
                </span>
              );
            })}
          </h1>

          <p className="max-w-[28ch] text-lg font-light leading-snug text-mutedForeground md:text-xl">
            Any sport. <span className="text-foreground">Your way.</span>
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <AppStoreBadge href={APP_STORE_URL} />
            <Link
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-[#5865F2]/40 bg-[#5865F2]/10 px-5 py-3 text-sm font-medium text-foreground transition-all hover:border-[#5865F2]/80 hover:bg-[#5865F2]/20"
            >
              <FontAwesomeIcon icon={faDiscord} className="h-4 w-4 text-[#7983f5]" aria-hidden />
              Join the Discord
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <HeroStack />
          <HeroStackMobile />
        </div>
      </div>
    </section>
  );
}
