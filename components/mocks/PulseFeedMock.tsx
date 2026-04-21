/**
 * Static mock of the Pulse feed surface (app's social tab).
 * Shows three item types: news card, community take, leaderboard rail peek.
 * Purely presentational , no state, no data fetching.
 */
export function PulseFeedMock() {
  return (
    <div aria-hidden className="flex flex-col gap-2.5">
      {/* News card */}
      <div className="glass-1 rounded-md p-3">
        <div className="mb-1.5 flex items-center gap-2 font-medium text-[9px] uppercase tracking-[0.22em] text-buzzr-accent">
          <span className="h-1 w-1 rounded-full bg-buzzr-accent" />
          ESPN · 2 m
        </div>
        <div className="text-[12px] font-light leading-snug text-foreground">
          Lakers rally from 18 down, steal Game 3 in Denver.
        </div>
      </div>

      {/* Community take */}
      <div className="glass-1 rounded-md p-3">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-buzzr-accent/80 text-[8px] font-medium text-buzzr-onAccent">
            TM
          </span>
          <span className="text-[10px] font-medium text-foreground">tonymad</span>
          <span className="text-[10px] text-mutedForeground">· 5 m</span>
        </div>
        <div className="mb-2 text-[12px] font-light leading-snug text-foreground">
          Super Bowl overtime. I forgot to breathe for ten minutes.
        </div>
        <div className="flex items-center gap-3 text-[10px] tabular-nums text-mutedForeground">
          <span className="text-buzzr-accent">🔥 248</span>
          <span>🧊 12</span>
          <span>· 41 replies</span>
        </div>
      </div>

      {/* Leaderboard rail peek */}
      <div className="rounded-md border border-buzzr-accent/20 bg-buzzr-accent/[0.05] p-3">
        <div className="mb-1 flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.22em] text-buzzr-accent">
          <span>Hot takes · today</span>
          <span className="text-mutedForeground">See all</span>
        </div>
        <div className="text-[11px] font-light text-foreground">
          #1 <span className="text-mutedForeground">@hoopshead</span> · net +312
        </div>
      </div>
    </div>
  );
}
