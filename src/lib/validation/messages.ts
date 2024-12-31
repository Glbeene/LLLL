import { z } from 'zod';

export const messageSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .trim(),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email cannot exceed 255 characters')
    .trim(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message cannot exceed 2000 characters')
    .trim()
});

export type MessageValidation = z.infer<typeof messageSchema>;

export function validateMessage(data: unknown) {
  return messageSchema.safeParse(data);
}