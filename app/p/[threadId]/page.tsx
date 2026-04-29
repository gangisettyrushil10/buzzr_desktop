import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { APP_STORE_URL, SITE_NAME, SITE_TAGLINE } from '@/src/lib/constants';
import {
  SHARE_BASE_URL,
  appendParams,
  fetchThreadWithAuthor,
  isThreadPublic,
  pickAttribution,
  truncate,
  type ShareSearchParams,
} from '@/src/lib/share';

type Props = {
  params: Promise<{ threadId: string }>;
  searchParams: Promise<ShareSearchParams>;
};

const THREAD_ID_PATTERN = /^[A-Za-z0-9-]{4,64}$/;

function normalizeThreadId(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  return THREAD_ID_PATTERN.test(trimmed) ? trimmed : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { threadId: rawId } = await params;
  const threadId = normalizeThreadId(rawId);
  const url = `${SHARE_BASE_URL}/p/${rawId}`;

  if (!threadId) {
    return {
      title: `Take · ${SITE_NAME}`,
      description: SITE_TAGLINE,
      metadataBase: new URL(SHARE_BASE_URL),
      alternates: { canonical: url },
    };
  }

  const result = await fetchThreadWithAuthor(threadId);
  if (!result || !isThreadPublic(result.thread)) {
    return {
      title: `Take · ${SITE_NAME}`,
      description: SITE_TAGLINE,
      metadataBase: new URL(SHARE_BASE_URL),
      alternates: { canonical: url },
    };
  }

  const { thread, author } = result;
  const handle = author?.user_tag ?? author?.username ?? null;
  const title = handle
    ? `@${handle} on ${SITE_NAME}`
    : `A take on ${SITE_NAME}`;
  const description = thread.body
    ? truncate(thread.body, 160)
    : SITE_TAGLINE;

  return {
    title,
    description,
    metadataBase: new URL(SHARE_BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ThreadLandingPage({ params, searchParams }: Props) {
  const [{ threadId: rawId }, sp] = await Promise.all([params, searchParams]);
  const threadId = normalizeThreadId(rawId);
  if (!threadId) notFound();

  const result = await fetchThreadWithAuthor(threadId);
  if (!result || !isThreadPublic(result.thread)) notFound();

  const { thread, author } = result;
  const handle = author?.user_tag ?? author?.username ?? null;

  const attribution = pickAttribution(sp);
  const deepLink = appendParams(`buzzr://p/${threadId}`, attribution);

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-[11px] uppercase tracking-[0.3em] text-buzzr-accent/80">
        Shared with you
      </p>
      <h1 className="mt-4 font-heading text-4xl text-foreground md:text-5xl">
        {handle ? `@${handle}` : 'A take on Buzzr'}
      </h1>
      {thread.body ? (
        <p className="mt-4 max-w-lg text-base leading-relaxed text-mutedForeground">
          “{truncate(thread.body, 220)}”
        </p>
      ) : (
        <p className="mt-4 max-w-lg text-base leading-relaxed text-mutedForeground">
          {SITE_TAGLINE}
        </p>
      )}

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
        Tapping <span className="font-medium text-foreground">Open in {SITE_NAME}</span> on iPhone takes you straight to the take.
      </p>
    </main>
  );
}
