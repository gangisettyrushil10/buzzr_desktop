import { ComponentType, ReactNode } from 'react';
import { Section } from '@/components/ui/Section';
import { CalloutCard } from '@/components/ui/CalloutCard';
import { Badge } from '@/components/ui/Badge';
import { SwarmFeedMock } from '@/components/mocks/SwarmFeedMock';
import { DashboardGrid } from '@/components/mocks/DashboardGrid';
import { GameDrawerStack } from '@/components/mocks/GameDrawerStack';
import { ChatThread } from '@/components/mocks/ChatThread';
import { SwarmRoster } from '@/components/mocks/SwarmRoster';
import { BracketHub } from '@/components/mocks/BracketHub';

type Tile = {
  number: string;
  title: string;
  body: string;
  Mock: ComponentType;
};

const TILES: readonly Tile[] = [
  { number: '01', title: 'News & ratings in one feed.', body: 'News, ratings, leaderboards.',           Mock: SwarmFeedMock    },
  { number: '02', title: 'Your sports, your widgets.',  body: 'Drag-and-drop widgets per league.',      Mock: DashboardGrid    },
  { number: '03', title: 'Every stat, one tap deep.',   body: 'Box score to odds, stacked.',            Mock: GameDrawerStack  },
  { number: '04', title: 'Yell about it together.',     body: 'DMs, squads, live per-game threads.',    Mock: ChatThread       },
  { number: '05', title: 'Crews for bracket warfare.',  body: 'Invite-only squads, shared leaderboard.',Mock: SwarmRoster      },
  { number: '06', title: 'Brackets you can’t put down.', body: 'Madness, playoffs, World Cup.',    Mock: BracketHub       }
];

export function SurfacesGrid() {
  return (
    <Section id="surfaces" aria-labelledby="surfaces-title">
      <header className="mb-10 max-w-[44ch]">
        <Badge>Surfaces</Badge>
        <h2
          id="surfaces-title"
          className="mt-3 text-[clamp(32px,4.5vw,48px)] font-normal leading-[1.11] tracking-[-0.025em] text-foreground"
        >
          One app. Six ways in.
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {TILES.map((t) => (
          <TileCard key={t.title} tile={t} />
        ))}
      </div>
    </Section>
  );
}

function TileCard({ tile }: { tile: Tile }) {
  const { number, title, body, Mock } = tile;
  return (
    <CalloutCard className="flex h-full flex-col gap-5">
      <div className="flex items-baseline gap-3">
        <Badge>{number}</Badge>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-[20px] leading-[1.4] tracking-[-0.025em] text-foreground">{title}</h3>
        <p className="text-[14px] leading-[1.43] tracking-[0.1px] text-muted">{body}</p>
      </div>
      <MockFrame>
        <Mock />
      </MockFrame>
    </CalloutCard>
  );
}

function MockFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mt-auto border border-surface bg-canvas p-3">
      {children}
    </div>
  );
}
