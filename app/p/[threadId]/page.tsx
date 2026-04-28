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
  params: { threadId: string };
  searchParams?: { ref?: SearchParamValue };
};

export function generateMetadata({ params, searchParams }: PageProps): Metadata {
  const ref = firstParam(searchParams?.ref);
  const canonical = canonicalUrl(`/p/${encodeURIComponent(params.threadId)}`, ref);
  return shareMetadata({
    canonical,
    title: 'Open this Buzzr take',
    description: 'Read the take, jump into the sports conversation, and share your own rating.',
  });
}

export default function PostLandingPage({ params, searchParams }: PageProps) {
  const ref = normalizeReferralCode(firstParam(searchParams?.ref));
  const path = `/p/${encodeURIComponent(params.threadId)}`;
  const canonical = canonicalUrl(path, ref);
  const installUrl = branchCtaUrl({
    canonical,
    ref,
    shareId: params.threadId,
    shareType: 'post',
    targetPath: path,
  });

  return (
    <ShareLanding
      badge="Buzzr Take"
      canonical={canonical}
      description="Open Buzzr to read this take, reply in context, and follow what sports fans are saying."
      installUrl={installUrl}
      openUrl={appDeepLink(path)}
      title="A take is live on Buzzr"
    />
  );
}
