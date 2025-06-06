// src/app/api/contact/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { ContactSchema } from '@/lib/contactSchema';
import { sendContactEmail } from '@/lib/mail';

export const runtime = 'nodejs';
/**
 * Handles contact form submissions and sends an email using nodemailer.
 */

export async function POST(request: NextRequest) {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const result = ContactSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.flatten();
    return NextResponse.json({ errors }, { status: 422 });
  }

  const { name, email, message } = result.data;

  try {
    await sendContactEmail({ name, email, message });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    console.error('❌ sendContactEmail failed:', err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
