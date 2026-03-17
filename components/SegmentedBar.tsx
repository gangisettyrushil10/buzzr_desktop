'use client';

import { useEffect, useRef, useState } from 'react';

interface SegmentedBarProps {
  /** Value 0–10 */
  value: number;
  /** Number of block segments (default 10) */
  segments?: number;
  /** Height of each segment block in px (default 6) */
  segmentHeight?: number;
  /** Animate in when visible */
  animate?: boolean;
  className?: string;
}

export function SegmentedBar({
  value,
  segments = 10,
  segmentHeight = 6,
  animate = true,
  className = ''
}: SegmentedBarProps) {
  const [started, setStarted] = useState(!animate);
  const ref = useRef<HTMLDivElement>(null);
  const filled = Math.round((value / 10) * segments);

  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return (
    <div ref={ref} className={`segment-bar-wrap ${className}`} role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={10}>
      {Array.from({ length: segments }, (_, i) => {
        const isFilled = i < filled;
        return (
          <div
            key={i}
            className={`seg ${isFilled ? 'filled' : ''} ${isFilled && animate ? 'animate-segment' : ''}`}
            style={{
              height: segmentHeight,
              animationDelay: isFilled && started ? `${i * 55}ms` : '0ms',
              // if animate but not started yet, hide filled segments until triggered
              opacity: isFilled && animate && !started ? 0 : undefined,
            }}
          />
        );
      })}
    </div>
  );
}
