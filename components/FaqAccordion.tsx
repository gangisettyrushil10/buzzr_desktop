'use client';

import { useState } from 'react';

export type FaqItem = { q: string; a: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <dl className="mx-auto w-full max-w-2xl space-y-2">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.q}
            className={`glass-1 rounded-lg transition-colors duration-200 ${isOpen ? 'border-buzzr-accent/30' : ''}`}
          >
            <dt>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-foreground transition-colors hover:text-buzzr-accent"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <span
                  className={`shrink-0 font-medium text-[14px] transition-transform duration-200 ${
                    isOpen ? 'rotate-45 text-buzzr-accent' : 'rotate-0 text-mutedForeground'
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>
            </dt>
            <dd
              className="grid overflow-hidden transition-all duration-200 ease-out"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-mutedForeground">
                  {item.a}
                </p>
              </div>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
