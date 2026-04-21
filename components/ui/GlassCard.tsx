import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/components/utils';

type GlassLevel = 1 | 2 | 3;

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  level?: GlassLevel;
  pixelTicks?: boolean;
  hoverLift?: boolean;
  as?: 'div' | 'section' | 'article' | 'aside';
  children?: ReactNode;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  { level = 1, pixelTicks = false, hoverLift = false, as: Tag = 'div', className, children, ...rest },
  ref
) {
  const levelClass = level === 3 ? 'glass-3' : level === 2 ? 'glass-2' : 'glass-1';
  const Component = Tag as 'div';
  return (
    <Component
      ref={ref as never}
      className={cn(
        'relative rounded-xl',
        levelClass,
        hoverLift && 'glass-hover',
        pixelTicks && 'pixel-tick',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
});
