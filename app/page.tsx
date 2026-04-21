import type { Metadata } from 'next';
import {
  ALTERNATE_NAME,
  APP_STORE_URL,
  BASE_URL,
  INSTAGRAM_URL,
  SITE_NAME,
  SITE_TAGLINE,
  TWITTER_URL
} from '@/src/lib/constants';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Hero } from '@/components/sections/Hero';
import { SwipeSection } from '@/components/sections/SwipeSection';
import { SurfacesGrid } from '@/components/sections/SurfacesGrid';
import { Highlights } from '@/components/sections/Highlights';
import { DataBento } from '@/components/sections/DataBento';
import { RateMission } from '@/components/sections/RateMission';
import { LeaguesWall } from '@/components/sections/LeaguesWall';
import { Faq } from '@/components/sections/Faq';
import { Reviews } from '@/components/sections/Reviews';
import { LatestPosts } from '@/components/sections/LatestPosts';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { BRAND_ASSETS } from '@/src/lib/brandAssets';

const PAGE_TITLE = `${SITE_NAME} · Rate sports games by entertainment`;
const PAGE_DESCRIPTION =
  'Rate live sports games by entertainment, not the final score. Chaos, energy, drama across NBA, NFL, EPL, NCAAB, F1, MLS, esports and more. Free iOS app.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'sports rating app',
    'rate sports games',
    'Letterboxd for sports',
    'entertainment score',
    'Buzzr Score',
    'live game ratings',
    'NBA game ratings',
    'NFL entertainment rating',
    'March Madness ratings',
    'FIFA World Cup 2026',
    'Watch Party sports',
    'sports social app'
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: SITE_NAME,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    site: '@the_real_buzzr',
    creator: '@the_real_buzzr'
  }
};

export default function HomePage() {
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: ALTERNATE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}${BRAND_ASSETS.transparent}`,
    sameAs: [TWITTER_URL, INSTAGRAM_URL]
  };

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: ALTERNATE_NAME,
    url: BASE_URL,
    description: PAGE_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  const softwareLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${SITE_NAME} ${ALTERNATE_NAME.split(' ')[1] ?? ''}`.trim(),
    alternateName: ALTERNATE_NAME,
    applicationCategory: 'SportsApplication',
    operatingSystem: 'iOS',
    description: PAGE_DESCRIPTION,
    url: BASE_URL,
    downloadUrl: APP_STORE_URL,
    installUrl: APP_STORE_URL,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL
    }
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />

      <Hero />
      <ScrollReveal>
        <RateMission />
      </ScrollReveal>
      <ScrollReveal>
        <SwipeSection />
      </ScrollReveal>
      <ScrollReveal>
        <SurfacesGrid />
      </ScrollReveal>
      <ScrollReveal>
        <Highlights />
      </ScrollReveal>
      <ScrollReveal>
        <DataBento />
      </ScrollReveal>
      <ScrollReveal>
        <LeaguesWall />
      </ScrollReveal>
      <ScrollReveal>
        <Reviews />
      </ScrollReveal>
      <ScrollReveal>
        <Faq />
      </ScrollReveal>
      <ScrollReveal>
        <LatestPosts />
      </ScrollReveal>
      <ScrollReveal>
        <FinalCTA />
      </ScrollReveal>
    </div>
  );
}
