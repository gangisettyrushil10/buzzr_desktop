/** @jest-environment node */
import {
  appDeepLink,
  branchCtaUrl,
  canonicalUrl,
  normalizeReferralCode,
} from '@/src/lib/shareLanding';
import { APP_STORE_URL, BASE_URL, BRANCH_LINK_BASE } from '@/src/lib/constants';
import { GET as getAasa } from '@/app/.well-known/apple-app-site-association/route';
import { GET as getAssetLinks } from '@/app/.well-known/assetlinks.json/route';

describe('share landing helpers', () => {
  it('builds canonical share URLs with normalized referral query params', () => {
    expect(canonicalUrl('/g/game 1', 'ab-c 123')).toBe(
      `${BASE_URL}/g/game%201?ref=ABC123`,
    );
    expect(normalizeReferralCode('friend-42')).toBe('FRIEND42');
  });

  it('builds app deep links from canonical paths', () => {
    expect(appDeepLink('/player/nba/123')).toBe('buzzr://player/nba/123');
  });

  it('builds a Branch CTA when configured and otherwise falls back to App Store', () => {
    const cta = branchCtaUrl({
      canonical: `${BASE_URL}/g/g1`,
      ref: 'abc',
      shareId: 'g1',
      shareType: 'game',
      targetPath: '/(protected)/game/g1',
    });
    if (BRANCH_LINK_BASE) {
      expect(cta).toContain('share_type=game');
      expect(cta).toContain('ref=ABC');
    } else {
      expect(cta).toBe(APP_STORE_URL);
    }
  });
});

describe('well-known association routes', () => {
  it('serves Apple AASA coverage for share paths', async () => {
    const json = await getAasa().json();
    const components = json.applinks.details[0].components;
    expect(components).toEqual(expect.arrayContaining([
      { '/': '/g/*' },
      { '/': '/p/*' },
      { '/': '/u/*' },
      { '/': '/player/*' },
      { '/': '/r/*' },
    ]));
  });

  it('serves Android assetlinks JSON', async () => {
    const json = await getAssetLinks().json();
    expect(Array.isArray(json)).toBe(true);
  });
});
