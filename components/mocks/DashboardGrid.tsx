import { SegmentedBar } from '@/components/SegmentedBar';

/** Static mock of the multi-league Dashboard surface.
 *  2×2 widget grid: hero number · sparkline · donut · progress bar.
 *  Pager dots hint at the multi-league swipe-between-pages model. */
export function DashboardGrid() {
  return (
    <div aria-hidden className="flex flex-col gap-3">
      {/* Multi-league pager dots */}
      <div className="flex items-center justify-center gap-1.5">
        <span className="h-1 w-6 rounded-full bg-buzzr-accent" />
        <span className="h-1 w-1.5 rounded-full bg-white/20" />
        <span className="h-1 w-1.5 rounded-full bg-white/20" />
        <span className="h-1 w-1.5 rounded-full bg-white/20" />
      </div>

      {/* 2x2 widget grid */}
      <div className="grid grid-cols-2 gap-2">
        {/* Hero number */}
        <div className="glass-1 rounded-md p-3">
          <div className="mb-1 font-medium text-[8px] uppercase tracking-[0.22em] text-mutedForeground">
            Buzzr · season
          </div>
          <div className="font-display text-[32px] font-light leading-none tabular-nums text-foreground">
            8.4
          </div>
          <div className="mt-1 text-[9px] text-buzzr-accent">+0.6 vs last week</div>
        </div>

        {/* Sparkline */}
        <div className="glass-1 rounded-md p-3">
          <div className="mb-2 font-medium text-[8px] uppercase tracking-[0.22em] text-mutedForeground">
            Swipes · 7 d
          </div>
          <svg viewBox="0 0 80 28" className="h-10 w-full">
            <polyline
              fill="none"
              stroke="rgb(var(--accent))"
              strokeWidth="1.5"
              points="0,22 12,18 24,20 36,12 48,14 60,6 72,9 80,4"
            />
            <circle cx="80" cy="4" r="2" fill="rgb(var(--accent))" />
          </svg>
        </div>

        {/* Donut */}
        <div className="glass-1 rounded-md p-3">
          <div className="mb-2 font-medium text-[8px] uppercase tracking-[0.22em] text-mutedForeground">
            Form
          </div>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 40 40" className="h-10 w-10 -rotate-90">
              <circle cx="20" cy="20" r="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
              <circle
                cx="20"
                cy="20"
                r="14"
                fill="none"
                stroke="rgb(var(--accent))"
                strokeWidth="5"
                strokeDasharray="88"
                strokeDashoffset="22"
                strokeLinecap="round"
              />
            </svg>
            <div>
              <div className="font-display text-[18px] font-light leading-none tabular-nums text-foreground">
                7–3
              </div>
              <div className="text-[9px] text-mutedForeground">L10</div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="glass-1 rounded-md p-3">
          <div className="mb-2 font-medium text-[8px] uppercase tracking-[0.22em] text-mutedForeground">
            Chaos tonight
          </div>
          <div className="mb-1 font-display text-[14px] font-light tabular-nums text-foreground">
            9.2 <span className="text-[10px] text-mutedForeground">/ 10</span>
          </div>
          <SegmentedBar value={9.2} segments={10} segmentHeight={3} />
        </div>
      </div>
    </div>
  );
}
