/** Static mock of the Game Detail surface with its stacked bottom drawers.
 *  Shows the game hero up top and three peeking drawer tabs beneath:
 *  Box Score · Play-by-Play · Odds , the core "data drawers" pitch. */
export function GameDrawerStack() {
  return (
    <div aria-hidden className="flex flex-col gap-3">
      {/* Game hero */}
      <div className="glass-2 rounded-md p-3">
        <div className="mb-2 flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.22em]">
          <span className="text-buzzr-accent">NBA · live</span>
          <span className="inline-flex items-center gap-1 rounded-pill bg-live/15 px-1.5 py-0.5 text-live">
            <span className="h-1 w-1 animate-pulse rounded-full bg-live" />
            4Q 2:14
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-mutedForeground">POR</span>
            <span className="font-display text-[28px] font-light tabular-nums text-foreground">108</span>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-mutedForeground">vs</span>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-mutedForeground">CHA</span>
            <span className="font-display text-[28px] font-light tabular-nums text-foreground">112</span>
          </div>
        </div>
      </div>

      {/* Stacked drawers */}
      <div className="flex flex-col gap-1.5">
        <DrawerTab label="Box Score" value="4 starters in double digits" open />
        <DrawerTab label="Play-by-Play" value="Ball steps back, 3 good." />
        <DrawerTab label="Odds" value="CHA -2.5 · O/U 224.5" />
      </div>
    </div>
  );
}

function DrawerTab({ label, value, open = false }: { label: string; value: string; open?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between rounded-md px-3 py-2 transition-colors ${
        open
          ? 'glass-1 border-buzzr-accent/30 bg-buzzr-accent/[0.06]'
          : 'glass-1'
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="font-medium text-[8px] uppercase tracking-[0.22em] text-buzzr-accent">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-light text-mutedForeground">{value}</span>
        <span aria-hidden className="text-[10px] text-mutedForeground">
          {open ? '–' : '+'}
        </span>
      </div>
    </div>
  );
}
