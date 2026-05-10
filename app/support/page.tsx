import type { Metadata } from 'next';
import Link from 'next/link';
import { SupportForm } from '@/src/components/SupportForm';
import { BASE_URL, COMPANY_NAME, SITE_NAME, SUPPORT_EMAIL } from '@/src/lib/constants';

const PAGE_TITLE = `Support · ${SITE_NAME}`;
const PAGE_DESCRIPTION = `Get help with ${SITE_NAME}. Contact support or submit a request to ${COMPANY_NAME}.`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/support' },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/support`,
    siteName: SITE_NAME,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION
  },
  twitter: {
    card: 'summary',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    site: '@the_real_buzzr'
  }
};

export default function SupportPage() {
  return (
    <section
      aria-labelledby="support-title"
      className="mx-auto flex max-w-4xl flex-col gap-8 px-6 pb-16 pt-10"
    >
      <>
        <header className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.3em] text-foreground">
            Need support?
          </p>
          <h1
            id="support-title"
            className="font-sans text-3xl text-foreground md:text-4xl"
          >
            Support
          </h1>
          <p className="max-w-xl text-sm text-muted md:text-[15px]">
            Need help with Buzzr Sports, found a bug, or have a question?
            Drop us a note and we&apos;ll get back to you as soon as we can.
          </p>
        </header>
      </>

      <>
        <div
          className="grid gap-6 rounded-2xl border border-surface/70 bg-surface p-6 text-sm backdrop-blur sm:p-8"
        >
          <div>
            <p>
              Email us directly at{' '}
              <a className="text-foreground underline underline-offset-3 transition-colors hover:text-muted" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
            <p className="mt-2 text-muted">
              Need account removal details? Visit our{' '}
              <Link className="text-foreground underline underline-offset-3 transition-colors hover:text-muted" href="/delete-account">
                delete account page
              </Link>
              .
            </p>
            <p className="mt-2 text-[13px] text-muted">
              Buzzr Sports is operated by {COMPANY_NAME}.
            </p>
          </div>
          <div className="divider-hairline" aria-hidden />
          <section aria-label="Support contact form">
            <h2 className="mb-3 text-sm font-semibold text-foreground">
              Send us a message
            </h2>
            <SupportForm />
          </section>
        </div>
      </>
    </section>
  );
}
