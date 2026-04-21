import Link from 'next/link';
import { getAllPosts } from '@/src/lib/blog';
import { PostCard } from '@/components/blog/PostCard';

/**
 * Homepage blog teaser. Shows the 3 most-recent posts with a "View all" CTA
 * to /blog. Posts come from the file-based CMS at content/blog/.
 */
export function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      aria-labelledby="latest-title"
      className="relative mx-auto w-full max-w-[1200px] px-6 py-28 md:py-36 scroll-mt-24"
    >
      <div
        aria-hidden
        className="accent-glow-soft pointer-events-none absolute -top-12 -left-16 h-[320px] w-[440px] rounded-full opacity-70"
      />
      <header className="relative mb-12 flex flex-wrap items-end justify-between gap-6">
        <h2
          id="latest-title"
          className="max-w-[22ch] font-display text-[clamp(32px,5vw,56px)] font-light leading-[0.98] tracking-[-0.035em] text-foreground"
        >
          From the blog.
        </h2>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-light text-mutedForeground transition-colors hover:text-foreground"
        >
          View all
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <div className="mt-10 flex justify-center md:hidden">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-light text-foreground transition-all hover:border-buzzr-accent/40 hover:bg-white/[0.04]"
        >
          View all posts
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
