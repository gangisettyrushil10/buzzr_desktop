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
  params: { code: string };
  searchParams?: { ref?: SearchParamValue };
};

export function generateMetadata({ params }: PageProps): Metadata {
  const code = normalizeReferralCode(params.code);
  const canonical = canonicalUrl(`/r/${encodeURIComponent(code)}`);
  return shareMetadata({
    canonical,
    title: `Join Buzzr with code ${code}`,
    description: 'Open this Buzzr invite, install the app, and the referral code will apply on first launch.',
  });
}

export default function ReferralLandingPage({ params, searchParams }: PageProps) {
  const code = normalizeReferralCode(params.code);
  const ref = normalizeReferralCode(firstParam(searchParams?.ref) || code);
  const path = `/r/${encodeURIComponent(code)}`;
  const canonical = canonicalUrl(path);
  const installUrl = branchCtaUrl({
    canonical,
    ref,
    shareId: code,
    shareType: 'referral',
    targetPath: path,
  });

  return (
    <ShareLanding
      badge="Buzzr Invite"
      canonical={canonical}
      description={`Use code ${code} when you join Buzzr. If you install from here, Buzzr will save it for first launch.`}
      installUrl={installUrl}
      openUrl={appDeepLink(path)}
      title="You have a Buzzr referral"
    />
  );
}
