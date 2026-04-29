import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { APP_STORE_URL, SITE_NAME, SITE_TAGLINE } from '@/src/lib/constants';
import {
  SHARE_BASE_URL,
  appendParams,
  fetchProfileByTag,
  pickAttribution,
  truncate,
  type ShareSearchParams,
} from '@/src/lib/share';

type Props = {
  params: Promise<{ tag: string }>;
  searchParams: Promise<ShareSearchParams>;
};

const TAG_PATTERN = /^[A-Za-z0-9_.-]{2,32}$/;

function normalizeTag(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim().replace(/^@/, '');
  return TAG_PATTERN.test(trimmed) ? trimmed : null;
}

const PROFILE_FALLBACK_DESCRIPTION =
  'Open this Buzzr profile to follow their ratings, takes, and sports taste.';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: rawTag } = await params;
  const tag = normalizeTag(rawTag);
  const url = `${SHARE_BASE_URL}/u/${rawTag}`;

  if (!tag) {
    return {
      title: `Profile · ${SITE_NAME}`,
      description: SITE_TAGLINE,
      metadataBase: new URL(SHARE_BASE_URL),
      alternates: { canonical: url },
    };
  }

  const profile = await fetchProfileByTag(tag);
  const handle = profile?.user_tag ?? tag;
  const title = `@${handle} on ${SITE_NAME}`;
  const description = profile?.headline
    ? truncate(profile.headline, 160)
    : PROFILE_FALLBACK_DESCRIPTION;

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
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ProfileLandingPage({ params, searchParams }: Props) {
  const [{ tag: rawTag }, sp] = await Promise.all([params, searchParams]);
  const tag = normalizeTag(rawTag);
  if (!tag) notFound();

  const profile = await fetchProfileByTag(tag);
  const handle = profile?.user_tag ?? tag;

  const attribution = pickAttribution(sp);
  const deepLink = appendParams(`buzzr://u/${handle}`, attribution);

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-[11px] uppercase tracking-[0.3em] text-buzzr-accent/80">
        Shared with you
      </p>
      <h1 className="mt-4 font-heading text-4xl text-foreground md:text-5xl">
        @{handle}
      </h1>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-mutedForeground">
        {profile?.headline ? truncate(profile.headline, 220) : PROFILE_FALLBACK_DESCRIPTION}
      </p>

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
        Tapping <span className="font-medium text-foreground">Open in {SITE_NAME}</span> on iPhone takes you straight to this profile.
      </p>
    </main>
  );
}
