'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/components/utils';

export function CursorSpotlight({ className }: { className?: string }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setPos({ x, y });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-0 z-0 transition-opacity duration-300',
        className
      )}
      aria-hidden
    >
      <div
        className="absolute h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-buzzr-accent/8 blur-[100px] transition-all duration-300 ease-out"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`
        }}
      />
    </div>
  );
}
