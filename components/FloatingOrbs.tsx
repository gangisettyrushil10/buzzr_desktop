'use client';

import { cn } from '@/components/utils';

export function FloatingOrbs({ className }: { className?: string }) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden
    >
      <div
        className="absolute -left-[10%] top-[15%] h-[280px] w-[280px] rounded-full bg-buzzr-accent/15 blur-[80px] animate-float-orb-1"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="absolute -right-[5%] top-[40%] h-[200px] w-[200px] rounded-full bg-buzzr-accent2/16 blur-[60px] animate-float-orb-2"
        style={{ animationDelay: '-5s' }}
      />
      <div
        className="absolute left-[30%] top-[70%] h-[240px] w-[240px] rounded-full bg-buzzr-accent4/14 blur-[70px] animate-float-orb-3"
        style={{ animationDelay: '-10s' }}
      />
    </div>
  );
}
