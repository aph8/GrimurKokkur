// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { ContactSchema, ContactInput } from '@/lib/contactSchema';
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
    // Safna öllum villum úr Zod-format()
    const formatted = result.error.format();
    return NextResponse.json({ errors: formatted }, { status: 422 });
  }

  const { name, email, message } = result.data as ContactInput;

  try {
    await sendContactEmail({ name, email, message });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error('❌ sendContactEmail failed:', err);
    const errorMessage = err?.message ?? 'Server error: Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
