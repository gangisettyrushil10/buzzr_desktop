import { SwipeStack } from '@/components/mocks/SwipeStack';
import { UniverseBackdrop } from '@/components/UniverseBackdrop';

/** Signature interaction section. Left: copy. Right: auto-advancing card stack.
 *  A cinematic "sports universe" backdrop spans the full section bleed behind
 *  the content — nebulae, stars, orbit rings, sport-ball planets, shooting stars. */
export function SwipeSection() {
  return (
    <section
      id="swipe"
      aria-labelledby="swipe-title"
      className="relative overflow-hidden scroll-mt-24"
    >
      {/* Full-bleed cinematic backdrop */}
      <UniverseBackdrop />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-28 md:py-36">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="flex flex-col gap-6">
            <h2
              id="swipe-title"
              className="max-w-[16ch] font-display text-[clamp(32px,5vw,56px)] font-light leading-[0.98] tracking-[-0.035em] text-foreground"
            >
              Swipe the whole sports universe.
            </h2>

            <p className="max-w-[34ch] text-base font-light leading-relaxed text-mutedForeground">
              Games, news, takes. One card at a time.
            </p>

            <p className="max-w-[48ch] text-sm font-light leading-relaxed text-mutedForeground/80">
              Buzzr is a sports rating app built for fans, not fantasy managers. Every live game
              gets a 1 to 10 entertainment score, the Buzzr Score, built from chaos, energy, and
              drama, not the final margin. A 40-point blowout and a triple-overtime thriller
              aren’t the same game, and your feed shouldn’t treat them like they are.
            </p>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[360px]">
              <SwipeStack />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
