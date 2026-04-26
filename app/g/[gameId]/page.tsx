import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { APP_STORE_URL, BASE_URL, SITE_NAME, SITE_TAGLINE } from '@/src/lib/constants';

type Props = { params: Promise<{ gameId: string }> };

// Accept UUIDs (Supabase game ids) and shorter slugs.
const GAME_ID_PATTERN = /^[A-Za-z0-9-]{4,64}$/;

function normalizeGameId(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!GAME_ID_PATTERN.test(trimmed)) return null;
  return trimmed;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { gameId: rawId } = await params;
  const gameId = normalizeGameId(rawId);
  const url = `${BASE_URL}/g/${rawId}`;

  if (!gameId) {
    return {
      title: `Game · ${SITE_NAME}`,
      description: SITE_TAGLINE,
      alternates: { canonical: url },
    };
  }

  const title = `Rate this game on ${SITE_NAME}`;
  const description = `Open this matchup in ${SITE_NAME} and rate it by entertainment, not the score.`;

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

export default async function GameLandingPage({ params }: Props) {
  const { gameId: rawId } = await params;
  const gameId = normalizeGameId(rawId);

  if (!gameId) notFound();

  const deepLink = `buzzr://g/${gameId}`;

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-[11px] uppercase tracking-[0.3em] text-buzzr-accent/80">
        Shared with you
      </p>
      <h1 className="mt-4 font-heading text-4xl text-foreground md:text-5xl">
        Rate this game
      </h1>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-mutedForeground">
        {SITE_TAGLINE}
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
        Tapping <span className="font-medium text-foreground">Open in {SITE_NAME}</span> on iPhone takes you straight into the matchup.
      </p>
    </main>
  );
}
