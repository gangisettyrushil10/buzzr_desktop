import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME } from '@/src/lib/constants';

export const metadata: Metadata = {
  title: `Not found · ${SITE_NAME}`,
  description: 'That page doesn\'t exist on Buzzr.'
};

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(0,230,118,0.08) 0%, rgba(0,230,118,0.04) 35%, transparent 65%)'
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[640px] flex-col items-center gap-8 text-center">
        <span className="font-mono text-[12px] uppercase tracking-[0.1em] leading-[2] text-muted">
          404
        </span>
        <h1
          id="not-found-title"
          className="text-[clamp(48px,8vw,80px)] font-normal leading-[1] tracking-[-0.025em] text-foreground"
        >
          That page doesn&rsquo;t exist.
        </h1>
        <p className="text-[20px] leading-[1.4] tracking-[-0.025em] text-muted">
          The link is broken or the page has moved. Try the home page, or browse the latest releases.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center rounded-full bg-foreground px-4 py-2.5 text-[14px] tracking-[-0.025em] text-canvas transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(0,230,118,0.55)]"
          >
            Back home
          </Link>
          <Link
            href="/changelog"
            className="inline-flex min-h-[44px] items-center rounded-full border border-white/25 px-4 py-2.5 text-[14px] tracking-[-0.025em] text-foreground transition-colors hover:border-white/50 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(0,230,118,0.55)]"
          >
            See what shipped
          </Link>
        </div>
      </div>
    </section>
  );
}
