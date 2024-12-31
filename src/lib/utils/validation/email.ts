import { z } from 'zod';

const emailSchema = z.string().email();

export function isValidEmail(email: string): boolean {
  const result = emailSchema.safeParse(email);
  return result.success;
}