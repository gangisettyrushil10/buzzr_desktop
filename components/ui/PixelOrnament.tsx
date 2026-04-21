import { cn } from '@/components/utils';

type Variant = 'bolt' | 'cross' | 'corner' | 'dot-row';

interface PixelOrnamentProps {
  variant?: Variant;
  size?: number;
  color?: string;
  className?: string;
  blink?: boolean;
}

/**
 * Tiny 8-bit ornamental marks. Used as precision accents near headlines,
 * on glass card corners, and in pixel-counter strips.
 */
export function PixelOrnament({
  variant = 'bolt',
  size = 16,
  color = 'rgb(var(--accent))',
  className,
  blink = false
}: PixelOrnamentProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 8 8',
    fill: 'none',
    className: cn('shrink-0', blink && 'animate-pixel-blink', className),
    'aria-hidden': true as const
  };

  if (variant === 'bolt') {
    const pixels: [number, number][] = [
      [4, 0], [3, 1], [4, 1], [2, 2], [3, 2], [4, 2],
      [3, 3], [4, 3], [5, 3], [6, 3],
      [2, 4], [3, 4], [4, 4], [5, 4],
      [3, 5], [4, 5],
      [3, 6], [4, 6],
      [3, 7]
    ];
    return (
      <svg {...common}>
        {pixels.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />
        ))}
      </svg>
    );
  }

  if (variant === 'cross') {
    const pixels: [number, number][] = [[3, 3], [4, 3], [3, 4], [4, 4]];
    return (
      <svg {...common}>
        {pixels.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />
        ))}
      </svg>
    );
  }

  if (variant === 'corner') {
    return (
      <svg {...common}>
        <rect x={0} y={0} width={2} height={1} fill={color} />
        <rect x={0} y={0} width={1} height={2} fill={color} />
      </svg>
    );
  }

  // dot-row
  const pixels: [number, number][] = Array.from({ length: 8 }, (_, i) => [i, 3]);
  return (
    <svg {...common}>
      {pixels.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />
      ))}
    </svg>
  );
}
