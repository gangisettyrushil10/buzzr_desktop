import { MetadataRoute } from 'next';
import { BASE_URL } from '@/src/lib/constants';
import { getAllPosts } from '@/src/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BASE_URL.replace(/\/+$/, '');

  const posts = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));

  return [
    {
      url: `${base}/`,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${base}/blog`,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    ...posts,
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
    },
    {
      url: `${base}/delete-account`,
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ];
}
