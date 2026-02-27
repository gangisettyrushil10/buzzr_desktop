import { MetadataRoute } from 'next';
import { BASE_URL } from '@/src/lib/constants';

export default function robots(): MetadataRoute.Robots {
  const base = BASE_URL.replace(/\/+$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      disallow: []
    },
    sitemap: `${base}/sitemap.xml`,
    host: base
  };
}

