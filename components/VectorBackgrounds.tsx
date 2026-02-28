import { cn } from './utils';

export function PixelBuzzrLogo({ className }: { className?: string }) {
  const pixels = [
    // b (offset x: 0)
    [0,0], [0,1], [0,2], [0,3], [0,4],
    [1,2], [2,2], [3,3], [2,4], [1,4],
    // u (offset x: 5)
    [5,2], [5,3], [5,4],
    [6,4], [7,4],
    [8,2], [8,3], [8,4],
    // z (offset x: 10)
    [10,2], [11,2], [12,2], [13,2],
    [12,3],
    [10,4], [11,4], [12,4], [13,4],
    // z (offset x: 15)
    [15,2], [16,2], [17,2], [18,2],
    [17,3],
    [15,4], [16,4], [17,4], [18,4],
    // r (offset x: 20)
    [20,2], [20,3], [20,4],
    [21,2], [22,2]
  ];

  return (
    <svg viewBox="-2 -2 28 8" xmlns="http://www.w3.org/2000/svg" className={cn("fill-current", className)} preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.4" result="blur1" />
          <feGaussianBlur stdDeviation="1.2" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#neonGlow)">
        {pixels.map(([x, y], i) => (
          <rect key={`}x-${x}-y-${y}-{i}`} x={x} y={y} width="1.05" height="1.05" />
        ))}
      </g>
    </svg>
  );
}

export function CourtLines({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={cn("fill-none stroke-current", className)} xmlns="http://www.w3.org/2000/svg">
      <g strokeWidth="2" opacity="0.15">
        <rect x="10" y="10" width="380" height="280" />
        <path d="M 200 10 L 200 290" />
        <circle cx="200" cy="150" r="40" />
        <path d="M 10 40 Q 140 40 140 150 T 10 260" />
        <path d="M 390 40 Q 260 40 260 150 T 390 260" />
        <rect x="10" y="110" width="50" height="80" />
        <rect x="340" y="110" width="50" height="80" />
      </g>
    </svg>
  );
}
