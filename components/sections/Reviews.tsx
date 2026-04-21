import { APP_STORE_URL } from '@/src/lib/constants';

/**
 * Reviews — App Store ratings + real user reviews, rendered in a clean
 * two-column grid with a summary rail on the left. Pulled verbatim from the
 * live App Store listing so nothing is fabricated.
 */

type Review = {
  title: string;
  body: string;
  author: string;
  age: string;
  stars: 1 | 2 | 3 | 4 | 5;
};

const SUMMARY = {
  rating: 5.0,
  count: 4,
  // App Store-style histogram (5★ → 1★ bar lengths as 0-1)
  histogram: [1, 0, 0, 0, 0] as const
};

const REVIEWS: Review[] = [
  {
    title: 'The Watch Party feature carried March Madness for me',
    body:
      "Got 9 friends in a party for the Final Four, live reactions popping off, everyone's brackets on one screen. This replaced our groupchat. Only complaint is I wish I could pin someone's reactions so I could see my buddy's meltdown in real time without scrolling. Otherwise perfect, we're doing the whole NBA playoffs here now.",
    author: 'Sid Sain',
    age: '2d ago',
    stars: 5
  },
  {
    title: 'finally an app that treats WTA like it matters',
    body:
      "Been waiting years for something that covers women's tennis without burying it. Buzzr actually has WTA swipes with headshots and set scores and everything. Only knocking a star because the tennis deep links occasionally open to a blank screen and I have to back out and tap again. Fix that and it's a 5.",
    author: 'sarveshsea',
    age: '2d ago',
    stars: 5
  },
  {
    title: 'okay the swipe thing is actually addictive',
    body:
      "I downloaded this to rate one game and ended up swiping for 45 minutes. Didn't even realize. The background glows different colors depending on which team's card is up which sounds dumb but it's kind of beautiful? Right to love a take, left to skip, and every once in a while it throws a random person at you to follow. Followed like 8 people already. My screen time is cooked.",
    author: 'a.sar11',
    age: '2d ago',
    stars: 5
  },
  {
    title: 'Amazing',
    body: 'This is a cool place to look out for games and rate with my friends.',
    author: 'jinwhys',
    age: '2d ago',
    stars: 5
  }
];

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="relative mx-auto w-full max-w-[1200px] px-6 py-28 md:py-36 scroll-mt-24"
    >
      <div
        aria-hidden
        className="accent-glow-soft pointer-events-none absolute -top-12 -left-20 h-[320px] w-[440px] rounded-full opacity-70"
      />
      <header className="relative mb-12 grid gap-8 md:grid-cols-[1fr_1.6fr] md:items-end md:gap-16">
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-buzzr-accent">
            Ratings &amp; Reviews
          </p>
          <h2
            id="reviews-title"
            className="font-display text-[clamp(32px,5vw,56px)] font-light leading-[0.98] tracking-[-0.035em] text-foreground"
          >
            5.0 on the App Store.
          </h2>
        </div>

        <RatingSummary />
      </header>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {REVIEWS.map((r) => (
          <ReviewCard key={r.author} review={r} />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center">
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-buzzr-accent/40 hover:bg-white/[0.06]"
        >
          Read all reviews on the App Store
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}

function RatingSummary() {
  return (
    <div className="flex items-center gap-8">
      <div>
        <div className="font-display text-[64px] font-light leading-none tracking-[-0.04em] text-foreground tabular-nums">
          {SUMMARY.rating.toFixed(1)}
        </div>
        <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-mutedForeground">
          out of 5
        </div>
      </div>

      <div className="flex-1">
        <ul className="space-y-1.5">
          {SUMMARY.histogram.map((pct, i) => (
            <li key={i} className="flex items-center gap-2">
              <StarRow count={5 - i} muted size={9} />
              <div className="relative h-1 flex-1 overflow-hidden rounded-pill bg-white/[0.05]">
                <div
                  className="absolute inset-y-0 left-0 rounded-pill bg-white/60"
                  style={{ width: `${Math.max(pct * 100, 2)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-2 text-right font-mono text-[11px] tabular-nums text-mutedForeground">
          {SUMMARY.count} Ratings
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-colors hover:border-white/[0.12]">
      <header className="mb-2 flex items-start justify-between gap-4">
        <h3 className="text-[15px] font-semibold leading-tight text-foreground">
          {review.title}
        </h3>
        <div className="shrink-0 text-right">
          <div className="font-mono text-[10px] uppercase tracking-wider text-mutedForeground">
            {review.age}
          </div>
          <div className="text-[12px] text-mutedForeground">{review.author}</div>
        </div>
      </header>

      <StarRow count={review.stars} size={12} className="mb-3" />

      <p className="text-[13px] leading-relaxed text-mutedForeground">{review.body}</p>
    </article>
  );
}

function StarRow({
  count,
  muted = false,
  size = 12,
  className = ''
}: {
  count: number;
  muted?: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${count} out of 5 stars`}
      className={`inline-flex gap-0.5 ${className}`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} filled={i <= count} muted={muted} size={size} />
      ))}
    </div>
  );
}

function Star({ filled, muted, size }: { filled: boolean; muted: boolean; size: number }) {
  const color = muted ? 'rgba(255,255,255,0.22)' : filled ? '#ffb800' : 'rgba(255,255,255,0.14)';
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden>
      <path
        d="M8 1.5l1.8 4.15 4.45.42-3.37 2.98 1 4.45L8 11.2l-3.88 2.3 1-4.45L1.75 6.07l4.45-.42L8 1.5z"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}
