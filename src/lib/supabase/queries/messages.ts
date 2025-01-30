import { supabase } from '../client';
import type { Database } from '../types/database';

type Message = Database['public']['Tables']['messages']['Insert'];

export async function createMessage(message: Message): Promise<string> {
  const { data, error } = await supabase
    .from('messages')
    .insert([message])
    .select('id')
    .single();

  if (error) throw error;
  if (!data) throw new Error('No data returned from insert');
  
  return data.id;
}