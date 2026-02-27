'use client';

import { CursorSpotlight } from './CursorSpotlight';

export function SiteBackground() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-br from-[#253237] via-[#0f172a] to-black"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40 animate-gradient-mesh"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 20%, rgba(148, 210, 225, 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(6, 182, 212, 0.08), transparent),
            radial-gradient(ellipse 50% 30% at 50% 50%, rgba(148, 210, 225, 0.05), transparent)
          `
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 animate-grid-pulse"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 210, 225, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 210, 225, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
        aria-hidden
      />
      <CursorSpotlight className="z-0" />
    </>
  );
}
