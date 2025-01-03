import { supabase } from '../client';
import type { Database } from '../types/database';

type Subscriber = Database['public']['Tables']['subscribers']['Row'];

export async function checkExistingSubscriber(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('subscribers')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (error) {
    console.error('Error checking subscriber:', error);
    return false;
  }

  return !!data;
}

export async function addSubscriber(email: string): Promise<string | null> {
  const exists = await checkExistingSubscriber(email);
  if (exists) return null;

  const { data, error } = await supabase
    .from('subscribers')
    .insert([{ email }])
    .select('id')
    .single();

  if (error) {
    console.error('Error adding subscriber:', error);
    throw new Error('Failed to add subscriber');
  }

  return data?.id || null;
}