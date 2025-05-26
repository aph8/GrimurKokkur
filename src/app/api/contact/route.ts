// src/app/api/contact/route.ts

export const runtime    = 'nodejs';
export const revalidate = 60;

import { NextResponse } from 'next/server';
import { ContactSchema } from '@/lib/contactSchema';
import { sendContactEmail } from '@/lib/mail';

export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const result = ContactSchema.safeParse(data);
  if (!result.success) {
    // Extract all Zod errors in formatted form
    const formatted = result.error.format();
    return NextResponse.json({ errors: formatted }, { status: 422 });
  }

  // result.data is already typed by Zod
  const { name, email, message } = result.data;

  try {
    await sendContactEmail({ name, email, message });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    console.error('❌ sendContactEmail failed:', err);

    // Safely extract an error message
    let errorMessage = 'Server error: Unknown error';
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === 'string') {
      errorMessage = err;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
