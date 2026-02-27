import { z } from 'zod';

export const supportRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Email is invalid')
    .max(254, 'Email is too long'),
  message: z
    .string()
    .trim()
    .min(10, 'Message is too short')
    .max(2000, 'Message is too long'),
  // Honeypot field - should be empty for real users
  website: z.string().optional().default('')
});

export type SupportRequestInput = z.infer<typeof supportRequestSchema>;
