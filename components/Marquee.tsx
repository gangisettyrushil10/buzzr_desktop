'use client';

import { cn } from '@/components/utils';

const DEFAULT_ITEMS = [
  'IPL',
  'F1',
  'NHL',
  'MLB',
  'NBA',
  'NFL',
  'NCAAB',
  'NCAAF',
  'MLS',
  'World Cup',
  'March Madness',
  'UFC',
  'Golf',
];

type MarqueeProps = {
  items?: string[];
  className?: string;
};

function MarqueeContent({ items }: { items: string[] }) {
  return (
    <div className="flex shrink-0 items-center gap-10 whitespace-nowrap pr-10">
      {items.map((label, i) => (
        <span
          key={i}
          className="text-sm font-medium uppercase tracking-widest text-mutedForeground/80"
        >
          {label}
        </span>
      ))}
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
