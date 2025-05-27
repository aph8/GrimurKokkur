// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ContactSchema } from '@/lib/contactSchema';
import { sendContactEmail } from '@/lib/mail';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  // 1) Parse JSON
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  // 2) Validate with Zod
  const result = ContactSchema.safeParse(data);
  if (!result.success) {
    // Flatten Zod errors into { field: [messages], _errors: [...] }
    const errors = result.error.flatten();
    return NextResponse.json({ errors }, { status: 422 });
  }

  const { name, email, message } = result.data;

  // 3) Send email
  try {
    await sendContactEmail({ name, email, message });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    console.error('❌ sendContactEmail failed:', err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
