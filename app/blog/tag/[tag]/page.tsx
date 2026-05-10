import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BASE_URL, SITE_NAME } from '@/src/lib/constants';
import {
  getAllTagSlugs,
  getPostsByTagSlug,
  tagLabelFromSlug
} from '@/src/lib/blog';
import { PostCard } from '@/components/blog/PostCard';

type PageProps = { params: { tag: string } };

export function generateStaticParams() {
  return getAllTagSlugs().map((tag) => ({ tag }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const slug = params.tag;
  const posts = getPostsByTagSlug(slug);
  if (posts.length === 0) {
    return { title: `Not found · ${SITE_NAME}` };
  }

  const label = tagLabelFromSlug(slug);
  const title = `${label} · ${SITE_NAME} Blog`;
  const description = `Buzzr blog posts tagged ${label}, essays and engineering write-ups on ${label.toLowerCase()} in the sports-media shift.`;
  const url = `${BASE_URL}/blog/tag/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/tag/${slug}`,
      languages: { 'en-US': url, 'x-default': url }
    },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title,
      description
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@the_real_buzzr'
    }
  };
}

export default function TagPage({ params }: PageProps) {
  const slug = params.tag;
  const posts = getPostsByTagSlug(slug);
  if (posts.length === 0) notFound();

  const label = tagLabelFromSlug(slug);
  const url = `${BASE_URL}/blog/tag/${slug}`;

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url,
    url,
    name: `${label} · ${SITE_NAME} Blog`,
    description: `Posts tagged ${label}.`,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'Blog',
      '@id': `${BASE_URL}/blog#blog`,
      url: `${BASE_URL}/blog`
    },
    hasPart: posts.map((post) => ({
      '@type': 'BlogPosting',
      url: `${BASE_URL}/blog/${post.slug}`,
      headline: post.title,
      datePublished: post.publishedAt
    }))
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: label, item: url }
    ]
  };

  return (
    <section
      aria-labelledby="tag-title"
      className="mx-auto w-full max-w-[1200px] px-6 pt-24 pb-[48px] md:pt-32"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav aria-label="Breadcrumb" className="mb-10 font-mono text-[12px] uppercase tracking-[0.1em] leading-[2] text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li aria-hidden>·</li>
          <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
          <li aria-hidden>·</li>
          <li className="text-foreground" aria-current="page">{label}</li>
        </ol>
      </nav>

      <header className="mb-12 max-w-[52ch]">
        <span className="font-mono text-[12px] uppercase tracking-[0.1em] leading-[2] text-muted">Topic</span>
        <h1
          id="tag-title"
          className="mt-3 text-[clamp(36px,5vw,48px)] font-normal leading-[1.11] tracking-[-0.025em] text-foreground"
        >
          {label}.
        </h1>
        <p className="mt-5 text-[16px] leading-[1.5] tracking-[-0.025em] text-muted">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} on {label.toLowerCase()}.
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} priority={i < 3} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/blog"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-[14px] tracking-[-0.025em] text-foreground transition-colors hover:border-white/50 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(0,230,118,0.55)]"
        >
          ← All posts
        </Link>
      </div>
    </section>
  );
}
