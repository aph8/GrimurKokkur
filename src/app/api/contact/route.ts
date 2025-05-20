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
    const issue = result.error.issues[0];
    const field = issue.path.join('.') || 'unknown';
    return NextResponse.json(
      { error: `Field "${field}": ${issue.message}` },
      { status: 422 }
    );
  }

  const { name, email, message } = result.data as ContactInput;

  try {
    await sendContactEmail({ name, email, message });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    console.error('❌ sendContactEmail failed:', err);
    // expose the message to the client in dev mode
    const errorMessage =
      err && typeof err === 'object' && 'message' in err
        ? `Server error: ${(err as { message: string }).message}`
        : 'Server error: Unknown error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
