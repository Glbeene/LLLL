import { createMessage } from '../supabase/queries/messages';
import type { ContactFormData } from '../types/contact';

export async function submitContactForm(data: ContactFormData): Promise<string> {
  try {
    return await createMessage({
      name: data.name,
      email: data.email,
      message: data.message
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw new Error('Failed to submit contact form');
  }
}