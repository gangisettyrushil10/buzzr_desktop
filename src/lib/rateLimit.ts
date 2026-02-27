import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let ratelimit: Ratelimit | null = null;

function getRatelimit() {
  if (ratelimit !== null) return ratelimit;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    // Rate limiting is disabled if Upstash is not configured.
    ratelimit = null;
    return ratelimit;
  }

  const redis = new Redis({ url, token });
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '10 m'),
    analytics: true
  });

  return ratelimit;
}

export async function checkRateLimit(identifier: string) {
  const limiter = getRatelimit();
  if (!limiter) {
    return { success: true };
  }

  const result = await limiter.limit(identifier);
  return { success: result.success, limit: result.limit, remaining: result.remaining };
}

