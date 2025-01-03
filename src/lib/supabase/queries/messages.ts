import { supabase } from '../client';
import type { MessageInput } from '../../types/messages';

export async function createMessage(input: MessageInput): Promise<string> {
  // Use the database function that handles both message and subscriber
  const { data, error } = await supabase
    .rpc('handle_message_and_subscriber', {
      p_name: input.name,
      p_email: input.email, 
      p_message: input.message
    });

  if (error) {
    console.error('Error creating message:', error);
    throw new Error('Failed to send message');
  }

  return data;
}