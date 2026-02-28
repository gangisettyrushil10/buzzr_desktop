'use client';

import { Activity, Trophy, Snowflake, Flag, Swords, FlagTriangleRight, Target, Flame } from 'lucide-react';
import { cn } from '@/components/utils';

const DEFAULT_ITEMS = [
  { label: 'NBA', icon: Activity },
  { label: 'NFL', icon: Trophy },
  { label: 'MLB', icon: Target },
  { label: 'NHL', icon: Snowflake },
  { label: 'F1', icon: Flag },
  { label: 'NCAAB', icon: Flame },
  { label: 'NCAAF', icon: Trophy },
  { label: 'MLS', icon: Target },
  { label: 'World Cup', icon: FlagTriangleRight },
  { label: 'March Madness', icon: Flame },
  { label: 'UFC', icon: Swords },
  { label: 'Golf', icon: FlagTriangleRight },
];

type MarqueeProps = {
  items?: typeof DEFAULT_ITEMS;
  className?: string;
};

function MarqueeContent({ items }: { items: typeof DEFAULT_ITEMS }) {
  return (
    <div className="flex shrink-0 items-center gap-12 whitespace-nowrap pr-12">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <span
            key={i}
            className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-mutedForeground/80"
          >
            <Icon className="h-4 w-4 text-buzzr-accent/70" strokeWidth={2.5} />
            {item.label}
          </span>
        );
      })}
    </div>
  );
}

export function Marquee({ items = DEFAULT_ITEMS, className }: MarqueeProps) {
  return (
    <div
      className={cn('overflow-hidden border-y border-border/50 py-3', className)}
      aria-hidden
    >
      <div className="flex w-max animate-marquee-infinite">
        <MarqueeContent items={items} />
        <MarqueeContent items={items} />
        <MarqueeContent items={items} />
      </div>
    </div>
  );
}
