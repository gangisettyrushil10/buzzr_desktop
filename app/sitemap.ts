import { MetadataRoute } from 'next';
import { BASE_URL } from '@/src/lib/constants';
import { getAllPosts, getAllTagSlugs } from '@/src/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BASE_URL.replace(/\/+$/, '');
  const posts = getAllPosts();

  const latestPostDate =
    posts.length > 0 ? new Date(posts[0].publishedAt) : new Date();

  const postEntries = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));

  const tagEntries = getAllTagSlugs().map((slug) => ({
    url: `${base}/blog/tag/${slug}`,
    lastModified: latestPostDate,
    changeFrequency: 'weekly' as const,
    priority: 0.6
  }));

  return [
    {
      url: `${base}/`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${base}/blog`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${base}/changelog`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    ...postEntries,
    ...tagEntries,
    {
      url: `${base}/privacy`,
      lastModified: latestPostDate,
      changeFrequency: 'yearly',
      priority: 0.4
    },
    {
      url: `${base}/terms`,
      lastModified: latestPostDate,
      changeFrequency: 'yearly',
      priority: 0.4
    },
    {
      url: `${base}/support`,
      lastModified: latestPostDate,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${base}/delete-account`,
      lastModified: latestPostDate,
      changeFrequency: 'monthly',
      priority: 0.6
    }
  ];
}
