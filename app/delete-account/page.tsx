import type { Metadata } from 'next';
import Link from 'next/link';
import {
  COMPANY_NAME,
  DELETE_ACCOUNT_URL,
  SITE_NAME,
  SUPPORT_EMAIL,
  SUPPORT_URL
} from '@/src/lib/constants';

export const metadata: Metadata = {
  title: `Delete Account — ${SITE_NAME}`,
  description:
    `How to delete your ${SITE_NAME} account and associated data, including what is deleted and what may be retained for safety and legal compliance.`,
  alternates: {
    canonical: DELETE_ACCOUNT_URL
  }
};

export default function DeleteAccountPage() {
  return (
    <article
      aria-labelledby="delete-account-title"
      className="mx-auto max-w-3xl px-6 pb-16 pt-10 text-sm leading-relaxed text-mutedForeground"
    >
      <header className="mb-6 border-b border-border/70 pb-4">
        <p className="text-[11px] uppercase tracking-[0.3em] text-buzzr-accent/80">
          Account Help
        </p>
        <h1
          id="delete-account-title"
          className="mt-2 font-heading text-3xl text-foreground md:text-4xl"
        >
          Delete your {SITE_NAME} account
        </h1>
        <p className="mt-2 text-[12px] text-mutedForeground">
          Last updated: March 5, 2026
        </p>
      </header>

      <div className="space-y-6 rounded-2xl border border-border/70 bg-buzzr-surface/60 p-5 shadow-soft backdrop-blur">
        <section aria-labelledby="in-app-steps" className="space-y-2">
          <h2 id="in-app-steps" className="text-base font-semibold text-foreground">
            Delete in app (fastest)
          </h2>
          <ol className="list-decimal space-y-1 pl-5">
            <li>Sign in to your {SITE_NAME} account in the mobile app.</li>
            <li>Open your Profile tab.</li>
            <li>Tap <strong>Delete account</strong>.</li>
            <li>Confirm the deletion prompt.</li>
          </ol>
          <p>
            This calls our Supabase account deletion RPC (`delete_my_account`),
            which deletes your auth user and cascades deletion of linked account data.
          </p>
        </section>

        <section aria-labelledby="request-without-login" className="space-y-2">
          <h2 id="request-without-login" className="text-base font-semibold text-foreground">
            Can&apos;t sign in?
          </h2>
          <p>
            If you no longer have app access, email{' '}
            <a className="underline" href={`mailto:${SUPPORT_EMAIL}?subject=Delete%20account%20request`}>
              {SUPPORT_EMAIL}
            </a>{' '}
            with subject <strong>Delete account request</strong>.
          </p>
          <p>Include the email on your account and your user tag (if available).</p>
          <p>
            You can also submit a request through our{' '}
            <Link className="underline" href={SUPPORT_URL}>
              support page
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="what-is-deleted" className="space-y-2">
          <h2 id="what-is-deleted" className="text-base font-semibold text-foreground">
            What gets deleted
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Authentication account in Supabase Auth.</li>
            <li>Profile and preferences tied to your user ID.</li>
            <li>Ratings, events, watch parties, RSVPs, follows, and related social content tied to your user ID.</li>
            <li>Most other user-linked records that reference your account with delete cascades.</li>
          </ul>
        </section>

        <section aria-labelledby="what-may-remain" className="space-y-2">
          <h2 id="what-may-remain" className="text-base font-semibold text-foreground">
            What may be retained
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Certain moderation/safety report records may be retained in de-identified form (for example, user reference fields may be set to `NULL`).
            </li>
            <li>
              Encrypted infrastructure backups may retain snapshots for a limited rolling period before automatic expiry.
            </li>
          </ul>
        </section>

        <section aria-labelledby="operator" className="space-y-2">
          <h2 id="operator" className="text-base font-semibold text-foreground">
            Service operator
          </h2>
          <p>
            {SITE_NAME} is operated by {COMPANY_NAME}. For deletion questions, contact{' '}
            <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
