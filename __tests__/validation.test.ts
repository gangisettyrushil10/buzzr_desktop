import { supportRequestSchema } from '@/src/lib/validation';

describe('supportRequestSchema', () => {
  it('accepts a valid payload', () => {
    const result = supportRequestSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'This is a valid support message with enough detail.',
      website: ''
    });

    expect(result.success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const result = supportRequestSchema.safeParse({
      name: 'Jane Doe',
      email: 'invalid-email',
      message: 'This is still long enough to be valid.',
      website: ''
    });

    expect(result.success).toBe(false);
  });

  it('rejects an empty message', () => {
    const result = supportRequestSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'short',
      website: ''
    });

    expect(result.success).toBe(false);
  });
});

