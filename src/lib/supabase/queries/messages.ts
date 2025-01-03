import { supabase } from '../client';
import type { MessageInput } from '../../types/messages';
import { addSubscriber } from './subscribers';

export async function createMessage(input: MessageInput): Promise<string> {
  // Start a Supabase transaction
  const { data, error } = await supabase.rpc('handle_message_and_subscriber', {
    p_name: input.name,
    p_email: input.email,
    p_message: input.message
  });

  if (error) {
    console.error('Error creating message:', error);
    throw new Error('Failed to send message');
  }

  if (!data) {
    throw new Error('No data returned from insert');
  }

  // Also try to add to subscribers if not already subscribed
  try {
    await addSubscriber(input.email);
  } catch (err) {
    // Log but don't fail the message submission if subscriber add fails
    console.warn('Failed to add subscriber:', err);
  }

  return data;
}