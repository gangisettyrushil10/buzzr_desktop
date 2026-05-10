import * as React from 'react';
import { cn } from '@/components/utils';

export interface CalloutCardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'article' | 'section';
}

export const CalloutCard = React.forwardRef<HTMLDivElement, CalloutCardProps>(
  ({ as: Tag = 'div', className, ...props }, ref) => {
    const Component = Tag as 'div';
    return (
      <Component
        ref={ref}
        className={cn(
          'bg-canvas border border-surface rounded-none p-4',
          'transition-[border-color,box-shadow] duration-200',
          'hover:border-white/15 hover:shadow-[inset_0_0_60px_rgba(0,230,118,0.04)]',
          className
        )}
        {...props}
      />
    );
  }
);
CalloutCard.displayName = 'CalloutCard';
