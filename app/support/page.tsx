import type { Metadata } from 'next';
import Link from 'next/link';
import { SupportForm } from '@/src/components/SupportForm';
import { COMPANY_NAME, SITE_NAME, SUPPORT_EMAIL } from '@/src/lib/constants';
import { ScrollReveal } from '@/components/ScrollReveal';

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
      <ScrollReveal delay={0}>
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
      </ScrollReveal>

      <ScrollReveal delay={1}>
        <div
          className="grid gap-6 rounded-2xl border border-border/70 bg-buzzr-surface/60 p-6 text-sm shadow-soft backdrop-blur sm:p-8"
        >
          <div>
            <p>
              Email us directly at{' '}
              <a className="text-buzzr-accent underline underline-offset-3 transition-colors hover:text-buzzr-accent2" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
            <p className="mt-2 text-mutedForeground">
              Need account removal details? Visit our{' '}
              <Link className="text-buzzr-accent underline underline-offset-3 transition-colors hover:text-buzzr-accent2" href="/delete-account">
                delete account page
              </Link>
              .
            </p>
            <p className="mt-2 text-[13px] text-mutedForeground/70">
              Buzzr Sports is operated by {COMPANY_NAME}.
            </p>
          </div>
          <div className="divider-gradient" aria-hidden />
          <section aria-label="Support contact form">
            <h2 className="mb-3 text-sm font-semibold text-foreground">
              Send us a message
            </h2>
            <SupportForm />
          </section>
        </div>
      </ScrollReveal>
    </section>
  );
}
