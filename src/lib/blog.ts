import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * File-based blog CMS.
 *
 * Posts live as `.mdx` files in `/content/blog/`. The filename (minus extension)
 * is the URL slug , so `content/blog/my-post.mdx` becomes `/blog/my-post`.
 *
 * Frontmatter shape (all fields required):
 *
 *   ---
 *   title:       "Post title"
 *   description: "One-sentence SEO description (≤160 chars)."
 *   publishedAt: "2026-04-20"          # ISO date
 *   readingTime: 7                      # minutes, integer
 *   author:      "Buzzr Editorial"
 *   tags:        ["Esports", "Industry"]
 *   cover:
 *     src:   "https://images.unsplash.com/photo-..."
 *     alt:   "Alt text describing the image"
 *     credit: "Photographer Name on Unsplash"
 *     creditUrl: "https://unsplash.com/@handle"
 *   ---
 *
 * Add a new post: drop a new `.mdx` file in `/content/blog/` with valid
 * frontmatter and MDX body. It shows up at `/blog` automatically.
 */

export type PostCover = {
  src: string;
  alt: string;
  credit?: string;
  creditUrl?: string;
};

export type PostFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  readingTime: number;
  author: string;
  tags: string[];
  cover: PostCover;
};

export type Post = PostFrontmatter & {
  slug: string;
  body: string;
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function readPostFile(slug: string): Post | null {
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, 'utf8');
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  return {
    slug,
    body: content,
    title: fm.title,
    description: fm.description,
    publishedAt: fm.publishedAt,
    readingTime: fm.readingTime,
    author: fm.author,
    tags: fm.tags ?? [],
    cover: fm.cover
  };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getAllPosts(): Post[] {
  return getAllPostSlugs()
    .map((slug) => readPostFile(slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  return readPostFile(slug);
}

/** Human-readable published date (e.g., "April 12, 2026"). */
export function formatPublishedDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
