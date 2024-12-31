import { supabase } from './client'
import { SupabaseError } from './error'

export async function testSupabaseConnection(): Promise<{ success: boolean; message: string }> {
  try {
    const { error } = await supabase.from('posts').select('count').single()
    
    if (error) {
      throw new SupabaseError(`Connection failed: ${error.message}`, error)
    }
    
    return {
      success: true,
      message: 'Successfully connected to Supabase'
    }
  } catch (error) {
    console.error('Supabase connection test failed:', error)
    return {
      success: false,
      message: error instanceof SupabaseError 
        ? error.message 
        : 'Failed to connect to Supabase'
    }
  }
}