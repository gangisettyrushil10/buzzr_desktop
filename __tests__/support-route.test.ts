/** @jest-environment node */
/**
 * Unit tests for the /api/support route handler.
 * Uses Jest to mock rate limiting and Resend.
 */
import { NextResponse } from 'next/server';

jest.mock('@/src/lib/rateLimit', () => ({
  checkRateLimit: jest.fn()
}));

jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn().mockResolvedValue({ id: 'mock-email-id' })
      }
    }))
  };
});

import { checkRateLimit } from '@/src/lib/rateLimit';
import { POST } from '@/app/api/support/route';

const mockedCheckRateLimit = checkRateLimit as jest.Mock;

describe('/api/support POST', () => {
  const basePayload = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    message: 'This is a valid support message that is long enough.',
    website: ''
  };

  beforeEach(() => {
    jest.resetAllMocks();
    process.env.RESEND_API_KEY = 'test-resend-key';
  });

  it('returns 200 on valid request', async () => {
    mockedCheckRateLimit.mockResolvedValue({ success: true });

    const req = new Request('http://localhost/api/support', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': '127.0.0.1'
      },
      body: JSON.stringify(basePayload)
    });

    const res = (await POST(req)) as NextResponse;
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ ok: true });
  });

  it('returns 400 on invalid email', async () => {
    mockedCheckRateLimit.mockResolvedValue({ success: true });

    const req = new Request('http://localhost/api/support', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...basePayload,
        email: 'not-an-email'
      })
    });

    const res = (await POST(req)) as NextResponse;
    expect(res.status).toBe(400);
  });

  it('treats filled honeypot as spam and still returns 200', async () => {
    mockedCheckRateLimit.mockResolvedValue({ success: true });

    const req = new Request('http://localhost/api/support', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...basePayload,
        website: 'bot-filled-field'
      })
    });

    const res = (await POST(req)) as NextResponse;
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ ok: true });
    expect(mockedCheckRateLimit).not.toHaveBeenCalled();
  });

  it('returns 429 when rate limit exceeded', async () => {
    mockedCheckRateLimit.mockResolvedValue({ success: false });

    const req = new Request('http://localhost/api/support', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(basePayload)
    });

    const res = (await POST(req)) as NextResponse;
    expect(res.status).toBe(429);
    const json = await res.json();
    expect(json.error).toMatch(/Too many requests/i);
  });
});

