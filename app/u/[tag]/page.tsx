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
  params: { tag: string };
  searchParams?: { ref?: SearchParamValue };
};

function cleanTag(tag: string): string {
  return tag.replace(/^@/, '').trim();
}

export function generateMetadata({ params, searchParams }: PageProps): Metadata {
  const tag = cleanTag(params.tag);
  const ref = firstParam(searchParams?.ref);
  const canonical = canonicalUrl(`/u/${encodeURIComponent(tag)}`, ref);
  return shareMetadata({
    canonical,
    title: `@${tag} on Buzzr`,
    description: 'Open this Buzzr profile to follow their ratings, takes, and sports taste.',
  });
}

export default function ProfileLandingPage({ params, searchParams }: PageProps) {
  const tag = cleanTag(params.tag);
  const ref = normalizeReferralCode(firstParam(searchParams?.ref));
  const path = `/u/${encodeURIComponent(tag)}`;
  const canonical = canonicalUrl(path, ref);
  const installUrl = branchCtaUrl({
    canonical,
    ref,
    shareId: tag,
    shareType: 'profile',
    targetPath: path,
  });

  return (
    <ShareLanding
      badge="Buzzr Profile"
      canonical={canonical}
      description={`Open Buzzr to view @${tag}, follow their ratings, and see their latest sports takes.`}
      installUrl={installUrl}
      openUrl={appDeepLink(path)}
      title={`@${tag} is on Buzzr`}
    />
  );
}
