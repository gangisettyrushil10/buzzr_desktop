import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/components/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-[13px] font-medium tracking-wide transition-all duration-[250ms] cubic-bezier(0.25, 0.46, 0.45, 0.94) active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        default:
          'bg-accent text-background pixel-border hover:opacity-90 active:opacity-100',
        outline:
          'border border-buzzr-accent/40 bg-transparent text-foreground hover:bg-muted/10 active:bg-muted/20',
        ghost:
          'text-foreground hover:bg-muted/10 active:bg-muted/20'
      },
      size: {
        default: 'h-10 px-5 py-2',
        lg: 'h-12 px-8 text-[14px]',
        sm: 'h-8 px-3 text-[12px]'
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
