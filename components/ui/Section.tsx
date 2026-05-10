import * as React from 'react';
import { cn } from '@/components/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  /** Use full viewport-height treatment (hero only). */
  bleed?: boolean;
}

/** Standard section wrapper enforcing 48px vertical rhythm and a 1200px max-width.
 *  All landing sections compose through this primitive. */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, bleed, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        {...props}
        className={cn(
          'relative w-full',
          bleed
            ? 'px-6 md:px-10'
            : 'mx-auto max-w-[1200px] px-6 py-12 md:py-[48px]',
          className
        )}
      >
        {children}
      </section>
    );
  }
);
Section.displayName = 'Section';
