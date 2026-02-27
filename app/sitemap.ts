import { MetadataRoute } from 'next';
import { BASE_URL } from '@/src/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BASE_URL.replace(/\/+$/, '');

  return [
    {
      url: `${base}/`,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${base}/privacy`,
      changeFrequency: 'yearly',
      priority: 0.6
    },
    {
      url: `${base}/terms`,
      changeFrequency: 'yearly',
      priority: 0.6
    },
    {
      url: `${base}/support`,
      changeFrequency: 'monthly',
      priority: 0.7
    }
  ];
}

