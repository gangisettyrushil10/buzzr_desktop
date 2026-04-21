import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/src/lib/blog';
import { formatPublishedDate } from '@/src/lib/blog';

export function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glass-1 glass-hover group block overflow-hidden rounded-xl transition-all duration-200"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-buzzr-surface">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-[11px] font-light tracking-wide text-mutedForeground">
          {post.tags[0] && (
            <span className="uppercase tracking-[0.18em] text-buzzr-accent">{post.tags[0]}</span>
          )}
          {post.tags[0] && <span aria-hidden>·</span>}
          <span>{formatPublishedDate(post.publishedAt)}</span>
          <span aria-hidden>·</span>
          <span>{post.readingTime} min read</span>
        </div>
        <h3 className="font-display text-[22px] font-light leading-[1.2] tracking-[-0.02em] text-foreground group-hover:text-buzzr-accent">
          {post.title}
        </h3>
        <p className="text-sm font-light leading-relaxed text-mutedForeground line-clamp-3">
          {post.description}
        </p>
      </div>
    </Link>
  );
}
