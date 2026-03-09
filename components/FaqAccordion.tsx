'use client';

import { useState } from 'react';
import type { FaqItem } from '@/src/lib/homeContent';
import { ScrollReveal } from '@/components/ScrollReveal';

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <dl className="mx-auto max-w-2xl divide-y divide-border/40">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <ScrollReveal key={item.q} delay={(i % 3) as 0 | 1 | 2}>
            <div className="group">
              <dt>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-foreground transition-colors hover:text-buzzr-accent2"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span
                    className={`shrink-0 text-mutedForeground/50 transition-transform duration-200 ${
                      isOpen ? 'rotate-45' : 'rotate-0'
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
              </dt>
              <dd
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{
                  maxHeight: isOpen ? '200px' : '0px',
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <p className="pb-5 text-sm leading-relaxed text-mutedForeground">
                  {item.a}
                </p>
              </dd>
            </div>
          </ScrollReveal>
        );
      })}
    </dl>
  );
}
