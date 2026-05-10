'use client';

import { useEffect, useState } from 'react';

/**
 * BrandAura: emerald wash anchored at the top of the page that fades to 0
 * over the first 480px of scroll. Two layered radials (centered + off-center)
 * plus a vertical wash, blended with `screen` to read as ambient brand light.
 * Mount only on the home route.
 */
export function BrandAura() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const update = () => {
      setOpacity(Math.max(0, 1 - window.scrollY / 480));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[760px]"
      style={{
        opacity,
        transition: 'opacity 120ms linear',
        background: `
          radial-gradient(ellipse 95% 75% at 50% -10%, rgba(0, 230, 118, 0.32) 0%, rgba(0, 230, 118, 0.16) 30%, transparent 65%),
          radial-gradient(ellipse 60% 60% at 78% 18%, rgba(0, 230, 118, 0.18) 0%, rgba(0, 230, 118, 0.08) 35%, transparent 70%),
          linear-gradient(to bottom, rgba(0, 230, 118, 0.10) 0%, transparent 50%)
        `,
        mixBlendMode: 'screen'
      }}
    />
  );
}
