import type { Metadata } from 'next';

import { ShareLanding } from '@/components/ShareLanding';
import {
  appDeepLink,
  branchCtaUrl,
  canonicalUrl,
  firstParam,
  normalizeReferralCode,
  shareMetadata,
  type SearchParamValue,
} from '@/src/lib/shareLanding';

type PageProps = {
  params: { athleteId: string; league: string };
  searchParams?: { ref?: SearchParamValue };
};

function cleanLeague(league: string): string {
  return league.trim().toLowerCase();
}

export function generateMetadata({ params, searchParams }: PageProps): Metadata {
  const league = cleanLeague(params.league);
  const ref = firstParam(searchParams?.ref);
  const canonical = canonicalUrl(
    `/player/${encodeURIComponent(league)}/${encodeURIComponent(params.athleteId)}`,
    ref,
  );
  return shareMetadata({
    canonical,
    title: 'Open this player on Buzzr',
    description: 'View player context, ratings conversation, and related games in Buzzr.',
  });
}

export default function PlayerLandingPage({ params, searchParams }: PageProps) {
  const league = cleanLeague(params.league);
  const ref = normalizeReferralCode(firstParam(searchParams?.ref));
  const path = `/player/${encodeURIComponent(league)}/${encodeURIComponent(params.athleteId)}`;
  const canonical = canonicalUrl(path, ref);
  const installUrl = branchCtaUrl({
    canonical,
    ref,
    shareId: params.athleteId,
    shareType: 'player',
    targetPath: path,
  });

  return (
    <ShareLanding
      badge="Buzzr Player"
      canonical={canonical}
      description="Open Buzzr to see this player in context, including related games, stats, and fan conversation."
      installUrl={installUrl}
      openUrl={appDeepLink(path)}
      title="A player is being discussed on Buzzr"
    />
  );
}
