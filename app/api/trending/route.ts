import { NextResponse } from 'next/server';
import { buildTrendingSnapshot } from '@/src/lib/trending';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(buildTrendingSnapshot(), {
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}
