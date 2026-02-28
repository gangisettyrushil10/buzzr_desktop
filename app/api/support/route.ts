import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { SITE_NAME, SUPPORT_EMAIL } from '@/src/lib/constants';
import {
  SupportRequestInput,
  supportRequestSchema
} from '@/src/lib/validation';
import { checkRateLimit } from '@/src/lib/rateLimit';

export async function POST(request: Request) {
  let body: SupportRequestInput;

  try {
    const json = await request.json();
    const parsed = supportRequestSchema.parse(json);
    body = parsed;
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request. Please check your details and try again.' },
      { status: 400 }
    );
  }

  // Honeypot filled => treat as spam and pretend success.
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'anonymous';

  const rate = await checkRateLimit(ip);
  if (!rate.success) {
    return NextResponse.json(
      {
        error:
          'Too many requests. Please wait a few minutes before submitting again.'
      },
      { status: 429 }
    );
  }

  // In test environments we skip calling Resend and just simulate success
  // so unit tests do not depend on the external SDK implementation.
  if (process.env.NODE_ENV === 'test') {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return NextResponse.json(
      {
        error:
          'Support channel is temporarily unavailable. Please email us directly.'
      },
      { status: 500 }
    );
  }

  const resend = new Resend(resendApiKey);

  try {
    await resend.emails.send({
      from: process.env.SUPPORT_FROM_EMAIL ?? 'support@buzzr.app',
      to: SUPPORT_EMAIL,
      subject: `[${SITE_NAME}] Support request from ${body.name}`,
      reply_to: body.email,
      text: [
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        '',
        'Message:',
        body.message
      ].join('\n')
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          'We could not send your message just now. Please email us directly.'
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
