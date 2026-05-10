import { Section } from '@/components/ui/Section';
import { CalloutCard } from '@/components/ui/CalloutCard';
import { Badge } from '@/components/ui/Badge';
import { BuzzSceneProvider } from '@/src/hooks/useBuzzScene';
import { SceneScoreboard } from '@/components/mocks/app/SceneScoreboard';
import { BuzzrMeter } from '@/components/mocks/app/BuzzrMeter';
import { WinProbBar } from '@/components/mocks/app/WinProbBar';
import { VoteBar } from '@/components/mocks/app/VoteBar';
import { FeatureBars } from '@/components/mocks/app/FeatureBars';
import { PollenLevel } from '@/components/mocks/app/PollenLevel';
import { SwipeRing } from '@/components/mocks/app/SwipeRing';
import { EventTicker } from '@/components/mocks/app/EventTicker';

export function DataBento() {
  return (
    <Section id="data" aria-labelledby="data-title">
      <header className="mb-10 max-w-[56ch]">
        <Badge>Anatomy</Badge>
        <h2
          id="data-title"
          className="mt-3 max-w-[22ch] text-[clamp(32px,4.5vw,48px)] font-normal leading-[1.11] tracking-[-0.025em] text-foreground"
        >
          The anatomy of a 9.2.
        </h2>
        <p className="mt-5 text-[16px] leading-[1.5] tracking-[-0.025em] text-muted">
          47 leagues across 12 sports, every league a fan actually watches, from NBA Finals and FIFA World Cup to F1, ATP, WTA, esports, and cricket. Live scores update in under 30 seconds where available. Every Buzzr Score is built from chaos, energy, and drama, re-ranked to what you actually watch.
        </p>
      </header>

      <BuzzSceneProvider>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
          <CalloutCard className="min-h-[200px] md:col-span-1 lg:col-span-7"><SceneScoreboard /></CalloutCard>
          <CalloutCard className="min-h-[200px] md:col-span-1 lg:col-span-5"><BuzzrMeter /></CalloutCard>
          <CalloutCard className="min-h-[180px] md:col-span-1 lg:col-span-6"><WinProbBar /></CalloutCard>
          <CalloutCard className="min-h-[180px] md:col-span-1 lg:col-span-6"><VoteBar /></CalloutCard>
          <CalloutCard className="min-h-[260px] md:col-span-2 lg:col-span-8"><FeatureBars /></CalloutCard>
          <CalloutCard className="min-h-[260px] md:col-span-2 lg:col-span-4"><PollenLevel /></CalloutCard>
          <CalloutCard className="min-h-[220px] md:col-span-2 lg:col-span-8"><EventTicker /></CalloutCard>
          <CalloutCard className="min-h-[220px] md:col-span-2 lg:col-span-4"><SwipeRing /></CalloutCard>
        </div>
      </BuzzSceneProvider>
    </Section>
  );
}
