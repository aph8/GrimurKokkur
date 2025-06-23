// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/mail';
import { ContactSchema } from '@/lib/contactSchema';
import { createHmac } from 'crypto';

const TS_SECRET = process.env.TS_TOKEN_SECRET!;
const MIN_AGE = 3_000;
const MAX_AGE = 3_600_000;

/**
 * Handles contact form submissions with bot protection and validation.
 */
export async function POST(request: Request) {
  const body = await request.json();

  if (body.website?.trim()) {
    return NextResponse.json({ error: 'Bot detected' }, { status: 400 });
  }

  if (!body.ts || !body.tsSignature) {
    return NextResponse.json({ error: 'Missing timestamp token' }, { status: 400 });
  }
  const expected = createHmac('sha256', TS_SECRET).update(body.ts).digest('hex');
  if (expected !== body.tsSignature) {
    return NextResponse.json({ error: 'Invalid timestamp signature' }, { status: 400 });
  }
  const age = Date.now() - parseInt(body.ts, 10);
  if (age < MIN_AGE || age > MAX_AGE) {
    return NextResponse.json({ error: 'Timestamp token expired or too fresh' }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.format() }, { status: 422 });
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
