import type { Metadata } from 'next';

import {
  APP_STORE_URL,
  BASE_URL,
  BRANCH_LINK_BASE,
  SITE_NAME,
} from './constants';

export type ShareLandingKind = 'referral' | 'game' | 'post' | 'profile' | 'player';

export type SearchParamValue = string | string[] | undefined;

export function firstParam(value: SearchParamValue): string {
  return Array.isArray(value) ? value[0] ?? '' : value ?? '';
}

export function normalizeReferralCode(value: string): string {
  return value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
}

export function canonicalUrl(path: string, ref?: string): string {
  const url = new URL(path.startsWith('/') ? path : `/${path}`, BASE_URL);
  const cleanRef = normalizeReferralCode(ref ?? '');
  if (cleanRef) url.searchParams.set('ref', cleanRef);
  return url.toString();
}

export function appDeepLink(path: string): string {
  return `buzzr://${path.replace(/^\/+/, '')}`;
}

function normalizeBranchBase(): URL | null {
  if (!BRANCH_LINK_BASE) return null;
  try {
    return new URL(BRANCH_LINK_BASE);
  } catch {
    return null;
  }
}

export function branchCtaUrl({
  canonical,
  ref,
  shareId,
  shareType,
  targetPath,
}: {
  canonical: string;
  ref?: string;
  shareId: string;
  shareType: ShareLandingKind;
  targetPath: string;
}): string {
  const branchUrl = normalizeBranchBase();
  if (!branchUrl) return APP_STORE_URL;

  const cleanRef = normalizeReferralCode(ref ?? '');
  branchUrl.searchParams.set('$canonical_url', canonical);
  branchUrl.searchParams.set('$desktop_url', canonical);
  branchUrl.searchParams.set('$fallback_url', APP_STORE_URL);
  branchUrl.searchParams.set('$ios_url', APP_STORE_URL);
  branchUrl.searchParams.set('$deeplink_path', targetPath.replace(/^\/+/, ''));
  branchUrl.searchParams.set('target_path', targetPath);
  branchUrl.searchParams.set('share_type', shareType);
  branchUrl.searchParams.set('share_id', shareId);
  branchUrl.searchParams.set('~feature', 'share');
  branchUrl.searchParams.set('~channel', 'web_landing');
  if (cleanRef) branchUrl.searchParams.set('ref', cleanRef);
  return branchUrl.toString();
}

export function shareMetadata({
  canonical,
  description,
  title,
}: {
  canonical: string;
  description: string;
  title: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
