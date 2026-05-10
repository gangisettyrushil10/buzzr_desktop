/** Static mock of the Events / Bracket Hub surface.
 *  Mini 4-seed bracket with user's picks highlighted + streak counter. */
export function BracketHub() {
  return (
    <div aria-hidden className="flex flex-col gap-3">
      {/* Streak header */}
      <div className="flex items-center justify-between">
        <div className="font-medium text-[8px] uppercase tracking-[0.22em] text-foreground">
          March Madness · your bracket
        </div>
        <div className="bg-canvas border border-surface inline-flex items-center gap-1 rounded-full bg-foreground/[0.12] px-2 py-0.5 text-[9px] font-medium tabular-nums text-foreground">
          🔥 7 streak
        </div>
      </div>

      {/* Bracket tree , 4 teams → 2 → 1 */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-2">
          <SeedPill seed="1" label="DUKE" picked />
          <SeedPill seed="8" label="ORE" />
          <SeedPill seed="4" label="UNC" picked />
          <SeedPill seed="5" label="GONZ" />
        </div>
        <Connector />
        <div className="flex flex-col gap-6">
          <SeedPill seed="1" label="DUKE" picked />
          <SeedPill seed="4" label="UNC" picked />
        </div>
        <Connector />
        <div className="flex flex-col">
          <SeedPill seed="1" label="DUKE" picked champion />
        </div>
      </div>

      {/* Footer stat */}
      <div className="flex items-center justify-between text-[10px] font-light text-muted">
        <span>Picks 12 of 15 correct</span>
        <span className="text-foreground">+240 pts</span>
      </div>
    </div>
  );
}

function SeedPill({ seed, label, picked = false, champion = false }: { seed: string; label: string; picked?: boolean; champion?: boolean }) {
  return (
    <div
      className={`bg-canvas border border-surface inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[9px] font-medium tabular-nums ${
        champion
          ? 'border-white/50 bg-foreground/[0.12] text-foreground'
          : picked
          ? 'border-white/30 bg-foreground/[0.06] text-foreground'
          : 'text-muted'
      }`}
    >
      <span className={picked ? 'text-foreground' : 'text-muted'}>{seed}</span>
      <span>{label}</span>
    </div>
  );
}

function Connector() {
  return (
    <div aria-hidden className="flex h-full w-2 flex-col justify-center">
      <span className="h-px w-full bg-white/10" />
    </div>
  );
}
