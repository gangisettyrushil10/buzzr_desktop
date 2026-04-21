/** Static mock of the Swarm (Squad) surface. A crew roster with
 *  avatar stack, member count, and a bracket rank stat line. */

const MEMBERS = [
  { name: 'sarveshjax', role: 'Host',   hue: 'rgb(var(--accent))' },
  { name: 'tori',       role: 'Member', hue: '#f59e0b' },
  { name: 'mk',         role: 'Member', hue: '#3b82f6' },
  { name: 'dev',        role: 'Member', hue: '#a855f7' }
] as const;

export function SwarmRoster() {
  return (
    <div aria-hidden className="flex flex-col gap-3">
      {/* Squad identity */}
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-0.5 font-medium text-[8px] uppercase tracking-[0.22em] text-buzzr-accent">
            Squad · invite only
          </div>
          <div className="font-display text-[18px] font-light leading-tight text-foreground">
            Nine Below Zero
          </div>
        </div>
        <div className="glass-chip rounded-pill px-2 py-0.5 text-[9px] font-medium tabular-nums text-mutedForeground">
          12 members
        </div>
      </div>

      {/* Avatar row */}
      <div className="flex -space-x-1.5">
        {MEMBERS.map((m) => (
          <span
            key={m.name}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-buzzr-background text-[9px] font-medium text-buzzr-onAccent"
            style={{ background: m.hue }}
            title={m.name}
          >
            {m.name.slice(0, 2).toUpperCase()}
          </span>
        ))}
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-buzzr-background bg-white/[0.06] text-[9px] font-medium text-mutedForeground">
          +8
        </span>
      </div>

      {/* Bracket rank stat */}
      <div className="glass-1 rounded-md p-3">
        <div className="mb-1 font-medium text-[8px] uppercase tracking-[0.22em] text-mutedForeground">
          Bracket rank
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[24px] font-light leading-none tabular-nums text-foreground">#3</span>
          <span className="text-[10px] text-mutedForeground">of 12 · +180 pts</span>
        </div>
      </div>
    </div>
  );
}
