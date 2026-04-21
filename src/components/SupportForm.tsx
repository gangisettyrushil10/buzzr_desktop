'use client';

import { FormEvent, useState } from 'react';
import { SUPPORT_EMAIL } from '@/src/lib/constants';
import { supportRequestSchema } from '@/src/lib/validation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type FormStatus =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string };

export function SupportForm() {
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ type: 'submitting' });

    const formData = new FormData(event.currentTarget);

    const data = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
      website: String(formData.get('website') ?? '')
    };

    const parseResult = supportRequestSchema.safeParse(data);
    if (!parseResult.success) {
      setStatus({
        type: 'error',
        message: 'Please check your name, email, and message.'
      });
      return;
    }

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const errorMessage =
          body?.error ??
          'Something went wrong sending your message. Please try again.';
        setStatus({ type: 'error', message: errorMessage });
        return;
      }

      setStatus({
        type: 'success',
        message: 'Thanks. Your message has been sent.'
      });
      event.currentTarget.reset();
    } catch {
      setStatus({
        type: 'error',
        message:
          'Network error while sending your message. Please try again in a moment.'
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-describedby="support-form-description"
      className="flex max-w-md flex-col gap-4"
    >
      <p
        id="support-form-description"
        className="text-sm text-mutedForeground"
      >
        Fill out this form and we&apos;ll get back to you at{' '}
        <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
          {SUPPORT_EMAIL}
        </a>
        .
      </p>

      {/* Honeypot field */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        <span>Name</span>
        <Input
          name="name"
          type="text"
          required
          autoComplete="name"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span>Email</span>
        <Input
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span>How can we help?</span>
        <Textarea
          name="message"
          required
          rows={5}
        />
      </label>

      <Button
        type="submit"
        disabled={status.type === 'submitting'}
      >
        {status.type === 'submitting' ? 'Sending…' : 'Send message'}
      </Button>

      <div
        role="status"
        aria-live="polite"
        className="min-h-[1.25rem] text-sm"
      >
        {status.type === 'error' && (
          <span className="text-red-300">{status.message}</span>
        )}
        {status.type === 'success' && (
          <span className="text-emerald-300">{status.message}</span>
        )}
      </div>
    </form>
  );
}
