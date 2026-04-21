'use client';

import { useEffect, useState } from 'react';

/**
 * BrandAura — sleek emerald wash at the very top of the page. Visible only
 * at scrollY === 0 and fading out linearly over the first 200px of scroll.
 * Non-interactive, sits behind the hero content. Kept intentionally minimal
 * so the single HeroSwoosh arc reads as the one deliberate motion.
 */
export function BrandAura() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setOpacity(Math.max(0, 1 - y / 200));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-20 h-[520px]"
      style={{
        opacity,
        transition: 'opacity 120ms linear',
        background: `
          radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,230,118,0.18) 0%, rgba(0,230,118,0.08) 28%, transparent 62%),
          linear-gradient(to bottom, rgba(0,230,118,0.05) 0%, transparent 40%)
        `,
        mixBlendMode: 'screen'
      }}
    />
  );
}
