import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { SITE_NAME, BASE_URL } from '@/src/lib/constants';
import { getAllPostSlugs, getPostBySlug, formatPublishedDate } from '@/src/lib/blog';
import { Prose } from '@/components/blog/Prose';

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: `Not found · ${SITE_NAME}` };

  const url = `${BASE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} · ${SITE_NAME}`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: post.cover.src, alt: post.cover.alt }]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.cover.src]
    }
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    image: post.cover.src,
    mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
    keywords: post.tags.join(', ')
  };

  return (
    <article className="relative mx-auto w-full max-w-[860px] px-6 pt-16 pb-24 md:pt-20 md:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-light text-mutedForeground transition-colors hover:text-foreground"
        >
          <span aria-hidden>←</span> All posts
        </Link>
      </div>

      <header className="mb-10">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-[11px] font-light tracking-wide text-mutedForeground">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="uppercase tracking-[0.18em] text-buzzr-accent"
            >
              {tag}
            </span>
          ))}
          <span aria-hidden>·</span>
          <span>{formatPublishedDate(post.publishedAt)}</span>
          <span aria-hidden>·</span>
          <span>{post.readingTime} min read</span>
        </div>

        <h1 className="font-display text-[clamp(34px,5vw,60px)] font-light leading-[1.02] tracking-[-0.03em] text-foreground">
          {post.title}
        </h1>

        <p className="mt-5 text-lg font-light leading-relaxed text-mutedForeground">
          {post.description}
        </p>

        <p className="mt-4 text-xs font-light text-mutedForeground">
          By {post.author}
        </p>
      </header>

      <figure className="relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/[0.06]">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 860px"
          className="object-cover"
        />
        {post.cover.credit && (
          <figcaption className="absolute bottom-0 right-0 bg-black/60 px-3 py-1.5 text-[10px] font-light text-mutedForeground backdrop-blur-sm">
            Photo:{' '}
            {post.cover.creditUrl ? (
              <a
                href={post.cover.creditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mutedForeground underline underline-offset-2 hover:text-foreground"
              >
                {post.cover.credit}
              </a>
            ) : (
              post.cover.credit
            )}
          </figcaption>
        )}
      </figure>

      <Prose>
        <MDXRemote source={post.body} />
      </Prose>

      <hr className="my-14 border-white/[0.08]" />

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-7">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-buzzr-accent">
          Buzzr
        </p>
        <p className="mt-2 font-display text-xl font-light leading-snug tracking-tight text-foreground">
          Rate every live game by entertainment. Chaos, energy, drama.
        </p>
        <p className="mt-3 text-sm font-light text-mutedForeground">
          Free on iPhone.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-light text-foreground transition-all hover:border-buzzr-accent/40 hover:bg-white/[0.04]"
        >
          See the app
        </Link>
      </div>
    </article>
  );
}
