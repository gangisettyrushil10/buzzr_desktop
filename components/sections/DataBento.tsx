import { GlassCard } from '@/components/ui/GlassCard';
import { BuzzSceneProvider } from '@/src/hooks/useBuzzScene';
import { SceneScoreboard } from '@/components/mocks/app/SceneScoreboard';
import { BuzzrMeter } from '@/components/mocks/app/BuzzrMeter';
import { WinProbBar } from '@/components/mocks/app/WinProbBar';
import { VoteBar } from '@/components/mocks/app/VoteBar';
import { FeatureBars } from '@/components/mocks/app/FeatureBars';
import { PollenLevel } from '@/components/mocks/app/PollenLevel';
import { SwipeRing } from '@/components/mocks/app/SwipeRing';
import { EventTicker } from '@/components/mocks/app/EventTicker';

/**
 * DataBento — 4 rows × 12 cols, no row-spans. Every card in the same row
 * ends up the same height because CSS Grid stretches row items to the tallest
 * neighbor, so we just size content correctly and let the grid do the rest.
 *
 *   Row 1 (hero):        Scoreboard (7)  + BuzzrMeter (5)
 *   Row 2 (prediction):  WinProbBar (6)  + VoteBar (6)
 *   Row 3 (anatomy):     FeatureBars (8) + PollenLevel (4)
 *   Row 4 (telemetry):   EventTicker (8) + SwipeRing (4)
 */
export function DataBento() {
  return (
    <section
      id="data"
      aria-labelledby="data-title"
      className="relative mx-auto w-full max-w-[1200px] px-6 py-28 md:py-36 scroll-mt-24"
    >
      <div
        aria-hidden
        className="accent-glow-soft pointer-events-none absolute -top-16 -left-16 h-[320px] w-[440px] rounded-full opacity-70"
      />
      <header className="relative mb-12 max-w-[56ch]">
        <h2
          id="data-title"
          className="max-w-[22ch] font-display text-[clamp(32px,5vw,56px)] font-light leading-[0.98] tracking-[-0.035em] text-foreground"
        >
          The anatomy of a 9.2.
        </h2>
        <p className="mt-5 text-sm font-light leading-relaxed text-mutedForeground/80">
          Buzzr covers 25+ leagues across 9 sports: NBA, WNBA, NCAAB, NFL, MLB, NHL, MLS, EPL,
          La Liga, Bundesliga, Serie A, Ligue 1, UCL, FIFA World Cup, F1, NASCAR, UFC, ATP, WTA,
          plus League of Legends, Valorant, Counter-Strike 2, and Dota 2. Live scores update in
          under 30 seconds via ESPN, MLB Stats API, NHL API, PandaScore, and OpenF1. Every
          Buzzr Score is built from a 23-feature model, re-ranked to what you actually watch.
        </p>
      </header>

      <BuzzSceneProvider>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {/* Row 1: hero */}
          <GlassCard level={1} hoverLift className="min-h-[200px] md:col-span-1 lg:col-span-7">
            <SceneScoreboard />
          </GlassCard>
          <GlassCard level={1} hoverLift className="min-h-[200px] md:col-span-1 lg:col-span-5">
            <BuzzrMeter />
          </GlassCard>

          {/* Row 2: prediction — model vs crowd */}
          <GlassCard level={1} hoverLift className="min-h-[180px] md:col-span-1 lg:col-span-6">
            <WinProbBar />
          </GlassCard>
          <GlassCard level={1} hoverLift className="min-h-[180px] md:col-span-1 lg:col-span-6">
            <VoteBar />
          </GlassCard>

          {/* Row 3: anatomy */}
          <GlassCard level={1} hoverLift className="min-h-[260px] md:col-span-2 lg:col-span-8">
            <FeatureBars />
          </GlassCard>
          <GlassCard level={1} hoverLift className="min-h-[260px] md:col-span-2 lg:col-span-4">
            <PollenLevel />
          </GlassCard>

          {/* Row 4: telemetry */}
          <GlassCard level={1} hoverLift className="min-h-[220px] md:col-span-2 lg:col-span-8">
            <EventTicker />
          </GlassCard>
          <GlassCard level={1} hoverLift className="min-h-[220px] md:col-span-2 lg:col-span-4">
            <SwipeRing />
          </GlassCard>
        </div>
      </BuzzSceneProvider>
    </section>
  );
}
