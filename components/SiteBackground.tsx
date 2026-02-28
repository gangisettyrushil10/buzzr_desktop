'use client';

import { useEffect, useState } from 'react';
import { CursorSpotlight } from './CursorSpotlight';

export function SiteBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-br from-[rgb(var(--bg-gradient-start))] via-[rgb(var(--bg-gradient-mid))] to-[rgb(var(--bg-gradient-end))]"
        aria-hidden
      />
      {/* Dynamic Parallax Gradient Mesh */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-50 transition-transform duration-75 ease-out"
        style={{
          transform: `translateY(${scrollY * -0.15}px) scale(${1 + scrollY * 0.0002})`,
          background: `
            radial-gradient(ellipse 70% 50% at ${20 + scrollY * 0.02}% 20%, rgba(var(--accent-3), 0.15), transparent),
            radial-gradient(ellipse 50% 40% at 80% ${80 + scrollY * -0.01}%, rgba(var(--accent), 0.12), transparent),
            radial-gradient(ellipse 60% 30% at 50% ${50 + scrollY * 0.05}%, rgba(var(--accent-5), 0.08), transparent)
          `
        }}
        aria-hidden
      />
      {/* Grid with its own subtle movement */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40 transition-transform duration-75 ease-out"
        style={{
          transform: `translateY(${scrollY * -0.05}px)`,
          backgroundImage: `
            linear-gradient(rgba(var(--accent-4), 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--accent-4), 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)'
        }}
        aria-hidden
      />
      <CursorSpotlight className="z-0" />
    </>
  );
}
