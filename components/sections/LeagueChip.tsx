import Image from 'next/image';
import type { League } from '@/src/lib/constants';
import { getLeagueLogo } from '@/src/lib/leagueLogos';

export function LeagueChip({ league }: { league: League }) {
  const logo = getLeagueLogo(league.label);
  const initials = league.label.replace(/[^A-Z0-9]/gi, '').slice(0, 2);

  return (
    <span
      title={league.long}
      className="glass-chip group inline-flex items-center gap-2 rounded-pill py-1 pl-1 pr-3 font-medium text-[11px] uppercase tracking-[0.18em] text-buzzr-ink-80 transition-colors hover:border-buzzr-accent/40 hover:text-foreground"
    >
      <span
        aria-hidden
        className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/95 ring-1 ring-white/10"
      >
        {logo ? (
          <Image
            src={logo}
            alt=""
            width={20}
            height={20}
            sizes="20px"
            className="h-[18px] w-[18px] object-contain"
          />
        ) : (
          <span className="font-mono text-[9px] font-bold leading-none text-buzzr-ink-10">
            {initials}
          </span>
        )}
      </span>
      {league.label}
    </span>
  );
}
