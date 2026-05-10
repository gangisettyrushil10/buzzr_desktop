import Link from 'next/link';
import type { Post } from '@/src/lib/blog';
import { formatPublishedDate } from '@/src/lib/blog';
import { Badge } from '@/components/ui/Badge';

export function PostCard({ post }: { post: Post; priority?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-canvas border border-surface p-4 transition-colors hover:border-white/25"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 font-mono text-[12px] tracking-[0.1em] leading-[2] text-muted">
          {post.tags[0] && (
            <span className="uppercase">{post.tags[0]}</span>
          )}
          {post.tags[0] && <span aria-hidden>·</span>}
          <span className="uppercase">{formatPublishedDate(post.publishedAt)}</span>
          <span aria-hidden>·</span>
          <span className="uppercase">{post.readingTime} MIN</span>
        </div>
        <h3 className="text-[20px] leading-[1.4] tracking-[-0.025em] text-foreground transition-colors group-hover:text-muted">
          {post.title}
        </h3>
        <p className="text-[14px] leading-[1.43] tracking-[0.1px] text-muted line-clamp-3">
          {post.description}
        </p>
        <span className="mt-2 inline-flex items-center gap-1 text-[14px] tracking-[-0.025em] text-foreground transition-transform group-hover:translate-x-0.5">
          Read
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
