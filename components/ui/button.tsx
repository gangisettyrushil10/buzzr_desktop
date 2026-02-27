import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/components/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-[13px] font-medium tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 disabled:hover:scale-100',
  {
    variants: {
      variant: {
        default:
          'bg-accent text-background pixel-border hover:bg-accent/90',
        outline:
          'border border-buzzr-accent/70 bg-transparent text-foreground hover:bg-muted/40',
        ghost:
          'text-foreground hover:bg-muted/40'
      },
      size: {
        default: 'h-9 px-4 py-1.5',
        lg: 'h-10 px-6',
        sm: 'h-8 px-3 text-[11px]'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

