import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { SwipeStack } from '@/components/mocks/SwipeStack';

export function ScrollSection() {
  return (
    <Section id="scroll" aria-labelledby="scroll-title">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <Badge>One feed</Badge>
          <h2
            id="scroll-title"
            className="max-w-[16ch] text-[clamp(32px,4.5vw,48px)] font-normal leading-[1.11] tracking-[-0.025em] text-foreground"
          >
            Scroll the whole sports universe.
          </h2>

          <p className="max-w-[36ch] text-[20px] leading-[1.4] tracking-[-0.025em] text-muted">
            Games, news, players. One card at a time.
          </p>

          <p className="max-w-[48ch] text-[16px] leading-[1.5] tracking-[-0.025em] text-muted">
            Buzzr is a sports rating app built for fans, not fantasy managers. Every live game gets a 1 to 10 entertainment score, the Buzzr Score, built from chaos, energy, and drama. Not the final margin. A 40-point blowout and a triple-overtime thriller aren&apos;t the same game, and your feed shouldn&apos;t treat them like they are.
          </p>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[360px]">
            <SwipeStack />
          </div>
        </div>
      </div>
    </Section>
  );
}
