import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { APP_STORE_URL, BASE_URL, SITE_NAME, SITE_TAGLINE } from '@/src/lib/constants';

type Props = { params: Promise<{ code: string }> };

const CODE_PATTERN = /^[A-Za-z0-9]{4,16}$/;

function normalizeCode(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!CODE_PATTERN.test(trimmed)) return null;
  return trimmed.toUpperCase();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code: rawCode } = await params;
  const code = normalizeCode(rawCode);
  const url = `${BASE_URL}/r/${rawCode}`;

  if (!code) {
    return {
      title: `Invite · ${SITE_NAME}`,
      description: SITE_TAGLINE,
      alternates: { canonical: url },
    };
  }

  const title = `Join ${SITE_NAME} with code ${code}`;
  const description = `A friend invited you to ${SITE_NAME}. ${SITE_TAGLINE}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ReferralLandingPage({ params }: Props) {
  const { code: rawCode } = await params;
  const code = normalizeCode(rawCode);

  if (!code) notFound();

  const deepLink = `buzzr://r/${code}`;

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-[11px] uppercase tracking-[0.3em] text-buzzr-accent/80">
        You&apos;re invited
      </p>
      <h1 className="mt-4 font-heading text-4xl text-foreground md:text-5xl">
        Join {SITE_NAME}
      </h1>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-mutedForeground">
        {SITE_TAGLINE}
      </p>

      <div className="mt-8 rounded-2xl border border-border/70 bg-buzzr-surface/60 px-8 py-6 shadow-soft backdrop-blur">
        <p className="text-xs uppercase tracking-[0.3em] text-mutedForeground">
          Invite code
        </p>
        <p className="mt-2 font-mono text-3xl font-semibold tracking-[0.4em] text-foreground">
          {code}
        </p>
      </div>

      <div className="mt-10 flex w-full max-w-sm flex-col gap-3">
        <Link
          href={deepLink}
          className="inline-flex items-center justify-center rounded-xl bg-buzzr-accent px-6 py-4 text-base font-semibold text-black transition hover:bg-buzzr-accent/90">
          Open in {SITE_NAME}
        </Link>
        <Link
          href={APP_STORE_URL}
          className="inline-flex items-center justify-center rounded-xl border border-border/70 bg-buzzr-surface/40 px-6 py-4 text-base font-medium text-foreground transition hover:bg-buzzr-surface/60">
          Get the app
        </Link>
      </div>

      <p className="mt-10 text-xs text-mutedForeground">
        Already installed? Tapping <span className="font-medium text-foreground">Open in {SITE_NAME}</span> will jump straight in with your code applied.
      </p>
    </main>
  );
}
