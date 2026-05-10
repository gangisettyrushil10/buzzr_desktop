import * as React from 'react';
import { cn } from '@/components/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center bg-transparent text-muted',
          'font-mono text-[12px] leading-[2] tracking-[0.1em]',
          'rounded-none p-0',
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';
