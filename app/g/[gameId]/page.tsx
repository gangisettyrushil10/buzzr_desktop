import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { APP_STORE_URL, SITE_NAME, SITE_TAGLINE } from '@/src/lib/constants';
import {
  SHARE_BASE_URL,
  appendParams,
  fetchGame,
  gameDescription,
  gameTitle,
  pickAttribution,
  type ShareSearchParams,
} from '@/src/lib/share';

type Props = {
  params: Promise<{ gameId: string }>;
  searchParams: Promise<ShareSearchParams>;
};

const GAME_ID_PATTERN = /^[A-Za-z0-9-]{4,64}$/;

function normalizeGameId(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  return GAME_ID_PATTERN.test(trimmed) ? trimmed : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { gameId: rawId } = await params;
  const gameId = normalizeGameId(rawId);
  const url = `${SHARE_BASE_URL}/g/${rawId}`;

  if (!gameId) {
    return {
      title: `Game · ${SITE_NAME}`,
      description: SITE_TAGLINE,
      metadataBase: new URL(SHARE_BASE_URL),
      alternates: { canonical: url },
    };
  }

  const game = await fetchGame(gameId);
  const title = game
    ? gameTitle(game)
    : `Rate this game on ${SITE_NAME}`;
  const description = game
    ? gameDescription(game)
    : `Open this matchup in ${SITE_NAME} and rate it by entertainment, not the score.`;

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
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function GameLandingPage({ params, searchParams }: Props) {
  const [{ gameId: rawId }, sp] = await Promise.all([params, searchParams]);
  const gameId = normalizeGameId(rawId);
  if (!gameId) notFound();

  const attribution = pickAttribution(sp);
  const deepLink = appendParams(`buzzr://g/${gameId}`, attribution);

  const game = await fetchGame(gameId);
  const headline = game ? gameTitle(game).replace(' · Buzzr', '') : 'Rate this game';
  const sub = game ? gameDescription(game) : SITE_TAGLINE;

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-[11px] uppercase tracking-[0.3em] text-buzzr-accent/80">
        Shared with you
      </p>
      <h1 className="mt-4 font-heading text-4xl text-foreground md:text-5xl">
        {headline}
      </h1>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-mutedForeground">
        {sub}
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
