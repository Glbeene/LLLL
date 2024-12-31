import { supabase } from '../supabase/client';
import type { MessageInput } from '../types/messages';
import { validateMessage } from '../validation/messages';

export async function createMessage(input: MessageInput): Promise<string> {
  // Validate input
  const validation = validateMessage(input);
  if (!validation.success) {
    throw new Error(validation.error.errors[0].message);
  }

  // Insert into Supabase
  const { data, error } = await supabase
    .from('messages')
    .insert([input])
    .select('id')
    .single();

  if (error) {
    console.error('Supabase error:', error);
    throw new Error('Failed to send message. Please try again.');
  }

  if (!data) {
    throw new Error('No response from server');
  }

  return data.id;
}