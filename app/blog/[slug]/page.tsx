import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { SITE_NAME, BASE_URL, COMPANY_NAME } from '@/src/lib/constants';
import {
  getAllPostSlugs,
  getPostBySlug,
  formatPublishedDate,
  wordCount,
  tagSlug
} from '@/src/lib/blog';
import { authorJsonLd, getAuthor } from '@/src/lib/authors';
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
    alternates: {
      canonical: url,
      languages: { 'en-US': url, 'x-default': url }
    },
    // Note: openGraph.images is intentionally omitted so Next auto-attaches
    // the per-post `app/blog/[slug]/opengraph-image.tsx` output. Same for twitter.
    openGraph: {
      type: 'article',
      url,
      siteName: SITE_NAME,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      site: '@the_real_buzzr',
      creator: '@the_real_buzzr'
    }
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const url = `${BASE_URL}/blog/${post.slug}`;
  const author = getAuthor(post.author);
  const words = wordCount(post.body);

  const blogPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: 'en-US',
    wordCount: words,
    articleSection: post.tags[0] ?? 'Blog',
    keywords: post.tags.join(', '),
    author: authorJsonLd(post.author),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/brand/buzzr-mark-transparent.png`
      }
    },
    image: {
      '@type': 'ImageObject',
      url: post.cover.src,
      width: 1600,
      height: 900
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog',  item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url }
    ]
  };

  return (
    <article className="relative mx-auto w-full max-w-[860px] px-6 pt-16 pb-24 md:pt-20 md:pb-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav aria-label="Breadcrumb" className="mb-10 font-mono text-[12px] uppercase tracking-[0.1em] leading-[2] text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li aria-hidden>·</li>
          <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
          <li aria-hidden>·</li>
          <li className="text-foreground" aria-current="page">{post.tags[0] ?? 'Post'}</li>
        </ol>
      </nav>

      <header className="mb-12">
        <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-[12px] tracking-[0.1em] leading-[2] text-muted">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tagSlug(tag)}`}
              className="uppercase hover:text-foreground transition-colors"
            >
              {tag}
            </Link>
          ))}
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt} className="uppercase">
            {formatPublishedDate(post.publishedAt)}
          </time>
          <span aria-hidden>·</span>
          <span className="uppercase">{post.readingTime} MIN</span>
        </div>

        <h1 className="text-[clamp(36px,5vw,48px)] font-normal leading-[1.11] tracking-[-0.025em] text-foreground">
          {post.title}
        </h1>

        <p className="mt-5 text-[20px] leading-[1.4] tracking-[-0.025em] text-muted">
          {post.description}
        </p>

        <p className="mt-4 font-mono text-[12px] tracking-[0.1em] leading-[2] text-muted uppercase">
          By <Link href={author.url} className="text-foreground hover:opacity-80 transition-opacity">{post.author}</Link>
        </p>
      </header>

      <figure className="relative mb-12 aspect-[16/9] w-full overflow-hidden border border-surface">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 860px"
          className="object-cover"
        />
        {post.cover.credit && (
          <figcaption className="absolute bottom-0 right-0 bg-canvas/85 px-3 py-1.5 font-mono text-[12px] tracking-[0.1em] text-muted backdrop-blur-sm">
            Photo:{' '}
            {post.cover.creditUrl ? (
              <a
                href={post.cover.creditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted underline underline-offset-2 hover:text-foreground"
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
        <MDXRemote
          source={post.body}
          options={{
            mdxOptions: {
              rehypePlugins: [
                rehypeSlug,
                [
                  rehypeAutolinkHeadings,
                  {
                    behavior: 'wrap',
                    properties: {
                      className: 'no-underline hover:underline underline-offset-4'
                    }
                  }
                ]
              ]
            }
          }}
        />
      </Prose>

      {author.bio && (
        <aside className="mt-14 border border-surface p-6" aria-labelledby="author-bio-heading">
          <span id="author-bio-heading" className="font-mono text-[12px] tracking-[0.1em] leading-[2] uppercase text-muted">
            About the author
          </span>
          <p className="mt-2 text-[16px] leading-[1.5] tracking-[-0.025em] text-foreground">
            {author.name}
          </p>
          <p className="mt-1 text-[14px] leading-[1.43] tracking-[0.1px] text-muted">
            {author.bio}
          </p>
        </aside>
      )}

      <hr className="my-14 border-surface" />

      <div className="bg-canvas border border-surface p-6">
        <span className="font-mono text-[12px] tracking-[0.1em] leading-[2] uppercase text-muted">{SITE_NAME}</span>
        <p className="mt-2 text-[20px] leading-[1.4] tracking-[-0.025em] text-foreground">
          Rate every live game by entertainment. Chaos, energy, drama.
        </p>
        <p className="mt-3 text-[14px] leading-[1.43] tracking-[0.1px] text-muted">
          Free on iOS and Android. Built by {COMPANY_NAME}.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-[14px] tracking-[-0.025em] text-foreground transition-colors hover:border-white/50 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(0,230,118,0.55)]"
        >
          See the app
        </Link>
      </div>
    </article>
  );
}
