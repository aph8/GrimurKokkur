// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 h'),
});

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/api/contact') {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const { success } = await limiter.limit(ip);
    if (!success) {
      return new NextResponse('Too many requests', { status: 429 });
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ['/api/contact'] };
