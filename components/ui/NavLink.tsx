import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/components/utils';

type Props = React.ComponentProps<typeof Link> & {
  active?: boolean;
};

export function NavLink({ className, active, ...props }: Props) {
  return (
    <Link
      {...props}
      className={cn(
        'inline-flex items-center bg-transparent text-foreground py-1.5',
        'text-[14px] tracking-[-0.025em] transition-colors duration-150',
        active ? 'text-foreground' : 'text-muted hover:text-foreground',
        className
      )}
    />
  );
}
