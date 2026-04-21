/** Static mock of the Chat surface. Shows a pinned game-share message,
 *  three alternating bubbles, and a typing indicator. */
export function ChatThread() {
  return (
    <div aria-hidden className="flex flex-col gap-2">
      {/* Pinned game share */}
      <div className="rounded-md border border-buzzr-accent/20 bg-buzzr-accent/[0.06] p-2.5">
        <div className="mb-1 flex items-center gap-1.5 font-medium text-[8px] uppercase tracking-[0.22em] text-buzzr-accent">
          <span aria-hidden>📌</span>
          Pinned · game share
        </div>
        <div className="text-[11px] font-light text-foreground">
          Lakers @ Pacers · Tonight 6:00 PM · Buzz 9.1
        </div>
      </div>

      {/* Incoming */}
      <Bubble side="left" name="tori">stood up at the buzzer</Bubble>
      {/* Outgoing */}
      <Bubble side="right">that was a 10, my neighbors hate me</Bubble>
      {/* Incoming */}
      <Bubble side="left" name="mk">chaos meter is off the charts</Bubble>

      {/* Typing */}
      <div className="ml-0 flex items-center gap-1.5 rounded-pill bg-white/[0.04] px-2.5 py-1.5 self-start">
        <span className="text-[9px] text-mutedForeground">sarveshjax typing</span>
        <span className="flex gap-0.5">
          <span className="h-1 w-1 animate-pulse rounded-full bg-buzzr-accent" style={{ animationDelay: '0ms' }} />
          <span className="h-1 w-1 animate-pulse rounded-full bg-buzzr-accent" style={{ animationDelay: '200ms' }} />
          <span className="h-1 w-1 animate-pulse rounded-full bg-buzzr-accent" style={{ animationDelay: '400ms' }} />
        </span>
      </div>
    </div>
  );
}

function Bubble({ side, name, children }: { side: 'left' | 'right'; name?: string; children: React.ReactNode }) {
  const isRight = side === 'right';
  return (
    <div className={`flex flex-col ${isRight ? 'items-end' : 'items-start'}`}>
      {name && !isRight && (
        <span className="mb-0.5 text-[9px] text-mutedForeground">{name}</span>
      )}
      <div
        className={`max-w-[85%] rounded-md px-2.5 py-1.5 text-[11px] font-light leading-snug ${
          isRight
            ? 'bg-buzzr-accent/90 text-buzzr-onAccent'
            : 'glass-1 text-foreground'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
