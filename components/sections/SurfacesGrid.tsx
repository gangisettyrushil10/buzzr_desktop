import { ComponentType, ReactNode } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { PulseFeedMock } from '@/components/mocks/PulseFeedMock';
import { DashboardGrid } from '@/components/mocks/DashboardGrid';
import { GameDrawerStack } from '@/components/mocks/GameDrawerStack';
import { ChatThread } from '@/components/mocks/ChatThread';
import { SwarmRoster } from '@/components/mocks/SwarmRoster';
import { BracketHub } from '@/components/mocks/BracketHub';

type Tile = {
  title: string;
  body: string;
  Mock: ComponentType;
};

const TILES: readonly Tile[] = [
  { title: 'News & takes in one feed.',   body: 'Outlets, takes, leaderboards.',          Mock: PulseFeedMock    },
  { title: 'Your sports, your widgets.',  body: 'Drag-and-drop widgets per league.',       Mock: DashboardGrid    },
  { title: 'Every stat, one tap deep.',   body: 'Box score to odds, stacked.',             Mock: GameDrawerStack  },
  { title: 'Yell about it together.',     body: 'DMs, squads, live per-game threads.',     Mock: ChatThread       },
  { title: 'Crews for bracket warfare.',  body: 'Invite-only squads, shared leaderboard.', Mock: SwarmRoster      },
  { title: 'Brackets you can’t put down.',body: 'Madness, playoffs, World Cup.',           Mock: BracketHub       }
];

export function SurfacesGrid() {
  return (
    <section
      id="surfaces"
      aria-labelledby="surfaces-title"
      className="mx-auto w-full max-w-[1200px] px-6 py-28 md:py-36 scroll-mt-24"
    >
      <header className="mb-12 max-w-[44ch]">
        <h2
          id="surfaces-title"
          className="font-display text-[clamp(32px,5vw,56px)] font-light leading-[0.98] tracking-[-0.035em] text-foreground"
        >
          One app. Six ways in.
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {TILES.map((t) => (
          <TileCard key={t.title} tile={t} />
        ))}
      </div>
    </section>
  );
}

function TileCard({ tile }: { tile: Tile }) {
  const { title, body, Mock } = tile;
  return (
    <GlassCard level={1} hoverLift className="flex h-full flex-col gap-5 p-6">
      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-[22px] font-light leading-[1.1] tracking-[-0.02em] text-foreground">
          {title}
        </h3>
        <p className="text-sm font-light leading-relaxed text-mutedForeground">
          {body}
        </p>
      </div>

      <MockFrame>
        <Mock />
      </MockFrame>
    </GlassCard>
  );
}

function MockFrame({ children }: { children: ReactNode }) {
  return (
    <div className="glass-1 mt-auto overflow-hidden rounded-md p-3">
      {children}
    </div>
  );
}
