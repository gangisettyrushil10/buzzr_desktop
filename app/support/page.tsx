import type { Metadata } from 'next';
import { SupportForm } from '@/src/components/SupportForm';
import { COMPANY_NAME, SITE_NAME, SUPPORT_EMAIL } from '@/src/lib/constants';

export const metadata: Metadata = {
  title: `Support — ${SITE_NAME}`,
  description:
    `Get help with ${SITE_NAME}. Contact support or submit a request to ${COMPANY_NAME}.`
};

export default function SupportPage() {
  return (
    <section
      aria-labelledby="support-title"
      className="mx-auto flex max-w-4xl flex-col gap-8 px-6 pb-16 pt-10"
    >
      <header className="space-y-3">
        <p className="text-[11px] uppercase tracking-[0.3em] text-buzzr-accent/80">
          Need support?
        </p>
        <h1
          id="support-title"
          className="font-heading text-3xl text-foreground md:text-4xl"
        >
          Support
        </h1>
        <p className="max-w-xl text-sm text-mutedForeground md:text-[15px]">
          Need help with Buzzr Sports, found a bug, or have a question?
          Drop us a note and we&apos;ll get back to you as soon as we can.
        </p>
      </header>

      <section
        aria-label="Support contact details"
        className="grid gap-6 rounded-2xl border border-border/70 bg-buzzr-surface/60 p-5 text-sm shadow-soft backdrop-blur"
      >
        <div>
          <p>
            Email us directly at{' '}
            <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
          <p className="mt-2 text-[13px] text-mutedForeground">
            Buzzr Sports is operated by {COMPANY_NAME}.
          </p>
        </div>
        <div
          className="h-px"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to right, rgba(var(--accent-3), 0.6) 0, rgba(var(--accent-3), 0.6) 4px, transparent 4px, transparent 8px)'
          }}
        />
        <section aria-label="Support contact form">
          <h2 className="mb-3 text-sm font-semibold text-foreground">
            Send us a message
          </h2>
          <SupportForm />
        </section>
      </section>
    </section>
  );
}
