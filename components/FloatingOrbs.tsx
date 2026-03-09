'use client';

import { cn } from '@/components/utils';

export function FloatingOrbs({ className }: { className?: string }) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden
    >
      {/* Emerald orb — top-left */}
      <div
        className="absolute -left-[8%] top-[12%] h-[320px] w-[320px] rounded-full animate-float-orb-1"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0.04) 60%, transparent 100%)',
          filter: 'blur(60px)',
          animationDelay: '0s'
        }}
      />
      {/* Cyan orb — right-center */}
      <div
        className="absolute -right-[4%] top-[38%] h-[260px] w-[260px] rounded-full animate-float-orb-2"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.16) 0%, rgba(6,182,212,0.04) 60%, transparent 100%)',
          filter: 'blur(50px)',
          animationDelay: '-6s'
        }}
      />
      {/* Sky-blue orb — bottom-center */}
      <div
        className="absolute left-[28%] top-[68%] h-[280px] w-[280px] rounded-full animate-float-orb-3"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, rgba(103,232,249,0.05) 60%, transparent 100%)',
          filter: 'blur(65px)',
          animationDelay: '-11s'
        }}
      />
    </div>
  );
}
