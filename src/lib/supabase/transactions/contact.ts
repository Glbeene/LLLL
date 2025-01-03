import { supabase } from '../client';
import type { MessageInput } from '../../types/messages';

export async function handleContactSubmission(input: MessageInput): Promise<string> {
  // Start a Supabase transaction
  const { data, error } = await supabase
    .from('messages')
    .insert([{
      name: input.name,
      email: input.email,
      message: input.message
    }])
    .select('id')
    .single();

  if (error) {
    console.error('Error creating message:', error);
    throw new Error('Failed to send message');
  }

  // Try to add subscriber
  await supabase
    .from('subscribers')
    .insert([{ email: input.email }])
    .select()
    .single()
    .then(({ error }) => {
      if (error && error.code !== '23505') { // Ignore duplicate key errors
        console.error('Error adding subscriber:', error);
      }
    });

  return data.id;
}