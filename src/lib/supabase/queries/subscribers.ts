import { supabase } from '../client'
import type { Database } from '../types/database'

type Subscriber = Database['public']['Tables']['subscribers']['Insert']

export async function addSubscriber(email: string): Promise<string | null> {
  const { data: existing } = await supabase
    .from('subscribers')
    .select('id')
    .eq('email', email)
    .single()

  if (existing) return null

  const { data, error } = await supabase
    .from('subscribers')
    .insert([{ email }])
    .select('id')
    .single()

  if (error) throw error
  return data.id
}