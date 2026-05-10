import type { ReactNode } from 'react';
import { cn } from '@/components/utils';

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'max-w-none text-muted',
        '[&_p]:my-5 [&_p]:text-[16px] [&_p]:leading-[1.5] [&_p]:tracking-[-0.025em]',
        '[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-foreground [&_h2]:text-[36px] [&_h2]:leading-[1.2] [&_h2]:tracking-[-0.025em]',
        '[&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-foreground [&_h3]:text-[20px] [&_h3]:leading-[1.4] [&_h3]:tracking-[-0.025em]',
        '[&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-[3px] [&_a]:transition-colors',
        '[&_ul]:my-5 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul>li]:list-disc [&_ul>li]:marker:text-muted',
        '[&_ol]:my-5 [&_ol]:space-y-2 [&_ol]:pl-5 [&_ol>li]:list-decimal [&_ol>li]:marker:text-muted',
        '[&_blockquote]:my-7 [&_blockquote]:border-l-2 [&_blockquote]:border-surface [&_blockquote]:pl-5 [&_blockquote]:text-foreground [&_blockquote]:italic',
        '[&_strong]:text-foreground',
        '[&_em]:text-foreground',
        '[&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[14px] [&_code]:tracking-[0.1px] [&_code]:text-foreground',
        '[&_hr]:my-10 [&_hr]:border-surface',
        className
      )}
    >
      {children}
    </div>
  );
}
