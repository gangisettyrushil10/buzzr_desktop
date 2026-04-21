import type { Metadata } from 'next';
import { SITE_NAME } from '@/src/lib/constants';
import { getAllPosts } from '@/src/lib/blog';
import { PostCard } from '@/components/blog/PostCard';

export const metadata: Metadata = {
  title: `Blog · ${SITE_NAME}`,
  description:
    'Essays and reporting on the state of sports fandom: esports, betting fatigue, second-screen culture, and how fans actually watch today.',
  openGraph: {
    title: `${SITE_NAME} · Blog`,
    description:
      'Essays and reporting on the state of sports fandom: esports, betting fatigue, second-screen culture, and how fans actually watch today.'
  }
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section
      aria-labelledby="blog-title"
      className="mx-auto w-full max-w-[1200px] px-6 pt-24 pb-28 md:pt-32 md:pb-32"
    >
      <header className="mb-14 max-w-[52ch]">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-buzzr-accent">
          Blog
        </p>
        <h1
          id="blog-title"
          className="font-display text-[clamp(40px,6vw,72px)] font-light leading-[0.95] tracking-[-0.035em] text-foreground"
        >
          The state of fandom.
        </h1>
        <p className="mt-5 text-base font-light leading-relaxed text-mutedForeground md:text-lg">
          Dispatches from inside the sports-media shift. What fans actually watch, how they rate it,
          and why the box score stopped being the point.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-sm text-mutedForeground">No posts yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} priority={i < 3} />
          ))}
        </div>
      )}
    </section>
  );
}
