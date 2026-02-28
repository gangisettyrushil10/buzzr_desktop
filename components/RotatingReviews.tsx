'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ReviewItem } from '@/src/lib/homeContent';
import { Button } from '@/components/ui/button';

type RotatingReviewsProps = {
  reviews: ReviewItem[];
};

const ROTATION_INTERVAL_MS = 7000;

export function RotatingReviews({ reviews }: RotatingReviewsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reviews.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, ROTATION_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [reviews.length]);

  const sideReviews = useMemo(() => {
    if (reviews.length <= 1) return [];

    const first = (activeIndex + 1) % reviews.length;
    const second = (activeIndex + 2) % reviews.length;

    return [reviews[first], reviews[second]].filter(Boolean);
  }, [activeIndex, reviews]);

  if (reviews.length === 0) return null;

  const activeReview = reviews[activeIndex];

  return (
    <div className="mx-auto max-w-3xl">
      <blockquote className="text-center">
        <p className="text-lg leading-relaxed text-foreground md:text-xl">
          &ldquo;{activeReview.quote}&rdquo;
        </p>
        <footer className="mt-3 text-xs text-mutedForeground">
          {activeReview.game} - {activeReview.rating}
        </footer>
      </blockquote>

      <div className="mt-4 flex items-center justify-center gap-2">
        {reviews.map((review, index) => (
          <button
            key={`${review.game}-${index}`}
            type="button"
            aria-label={`Show review ${index + 1}`}
            aria-pressed={activeIndex === index}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              activeIndex === index ? 'bg-buzzr-accent' : 'bg-buzzr-accent/40'
            }`}
          />
        ))}
      </div>

      {sideReviews.length > 0 && (
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {sideReviews.map((review, index) => (
            <blockquote key={`${review.game}-${index}`} className="border-l-2 border-buzzr-accent/40 pl-4">
              <p className="text-sm leading-relaxed text-foreground">&ldquo;{review.quote}&rdquo;</p>
              <footer className="mt-2 text-[11px] text-mutedForeground">
                {review.game} - {review.rating}
              </footer>
            </blockquote>
          ))}
        </div>
      )}

      {reviews.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => setActiveIndex((current) => (current - 1 + reviews.length) % reviews.length)}
          >
            Previous
          </Button>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => setActiveIndex((current) => (current + 1) % reviews.length)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
