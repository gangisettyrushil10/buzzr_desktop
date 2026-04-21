import type { ReactNode } from 'react';
import { cn } from '@/components/utils';

/**
 * Prose container , typography for MDX post bodies.
 * Custom rather than @tailwindcss/typography to match the minimal aesthetic.
 */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'max-w-none font-light leading-relaxed text-mutedForeground',
        // Paragraphs
        '[&_p]:my-5 [&_p]:text-[16px] [&_p]:leading-[1.75]',
        // Headings
        '[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-foreground [&_h2]:font-display [&_h2]:text-[28px] [&_h2]:font-light [&_h2]:leading-[1.2] [&_h2]:tracking-[-0.02em]',
        '[&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-foreground [&_h3]:font-display [&_h3]:text-[20px] [&_h3]:font-medium [&_h3]:leading-[1.25] [&_h3]:tracking-[-0.015em]',
        // Links
        '[&_a]:text-buzzr-accent [&_a]:underline [&_a]:decoration-buzzr-accent/40 [&_a]:underline-offset-[3px] [&_a]:transition-colors hover:[&_a]:decoration-buzzr-accent',
        // Lists
        '[&_ul]:my-5 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul>li]:list-disc [&_ul>li]:marker:text-buzzr-accent/60',
        '[&_ol]:my-5 [&_ol]:space-y-2 [&_ol]:pl-5 [&_ol>li]:list-decimal [&_ol>li]:marker:text-mutedForeground',
        // Blockquote
        '[&_blockquote]:my-7 [&_blockquote]:border-l-2 [&_blockquote]:border-buzzr-accent/50 [&_blockquote]:pl-5 [&_blockquote]:text-foreground [&_blockquote]:italic',
        // Strong & em
        '[&_strong]:font-medium [&_strong]:text-foreground',
        '[&_em]:text-foreground',
        // Code
        '[&_code]:rounded [&_code]:bg-white/[0.06] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-foreground',
        // Horizontal rule
        '[&_hr]:my-10 [&_hr]:border-white/[0.08]',
        className
      )}
    >
      {children}
    </div>
  );
}
