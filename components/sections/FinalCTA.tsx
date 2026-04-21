import { APP_STORE_URL } from '@/src/lib/constants';
import { AppStoreBadge } from '@/components/ui/AppStoreBadge';
import { GlassCard } from '@/components/ui/GlassCard';

export function FinalCTA() {
  return (
    <section id="download" aria-labelledby="cta-title" className="mx-auto w-full max-w-[1200px] px-6 py-28 md:py-36 scroll-mt-24">
      <GlassCard level={2} pixelTicks className="relative overflow-hidden p-10 md:p-16">
        <div
          aria-hidden
          className="accent-glow pointer-events-none absolute -top-24 -right-24 h-[360px] w-[360px] rounded-full"
        />
        <div
          aria-hidden
          className="accent-glow-soft pointer-events-none absolute -bottom-24 -left-24 h-[360px] w-[360px] rounded-full"
        />

        <div className="relative z-10 flex flex-col items-start gap-6">
          <h2
            id="cta-title"
            className="max-w-[20ch] font-display text-[clamp(36px,6vw,76px)] font-light leading-[0.95] tracking-[-0.04em] text-foreground"
          >
            Rate the <span className="text-buzzr-accent">game</span>.
          </h2>

          <p className="max-w-[40ch] text-base font-light text-mutedForeground md:text-lg">
            Free on iPhone.
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <AppStoreBadge href={APP_STORE_URL} size="lg" />
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
