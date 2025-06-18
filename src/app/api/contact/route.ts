// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/mail';
import { ContactSchema } from '@/lib/contactSchema';
import crypto from 'crypto';

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET!;
const TS_SECRET = process.env.TS_TOKEN_SECRET!;
const MIN_AGE = 3000; // ≥ 3 seconds
const MAX_AGE = 1000 * 60 * 60; // ≤ 1 hour

export async function POST(request: Request) {
  const body = await request.json();

  // 1) honeypot
  if (body.website?.trim()) {
    return NextResponse.json({ error: 'Bot detected' }, { status: 400 });
  }

  // 2) timestamp token
  if (!body.ts || !body.tsSignature) {
    return NextResponse.json({ error: 'Missing timestamp token' }, { status: 400 });
  }
  // verify HMAC
  const sig = crypto.createHmac('sha256', TS_SECRET).update(body.ts).digest('hex');
  if (sig !== body.tsSignature) {
    return NextResponse.json({ error: 'Invalid timestamp signature' }, { status: 400 });
  }
  const age = Date.now() - parseInt(body.ts, 10);
  if (age < MIN_AGE || age > MAX_AGE) {
    return NextResponse.json({ error: 'Timestamp token expired or too fresh' }, { status: 400 });
  }

  // 3) reCAPTCHA
  const rec = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${encodeURIComponent(RECAPTCHA_SECRET)}&response=${encodeURIComponent(body.token)}`,
  });
  const recJson = await rec.json();
  if (!recJson.success || recJson.score < 0.5) {
    return NextResponse.json({ error: 'Failed CAPTCHA verification' }, { status: 400 });
  }

  // 4) validate main inputs
  const result = ContactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.format() }, { status: 422 });
  }

  // 5) send
  try {
    await sendContactEmail(result.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
