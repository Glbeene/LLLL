import { PostgrestError } from '@supabase/supabase-js'

export class SupabaseError extends Error {
  constructor(message: string, public readonly originalError?: PostgrestError) {
    super(message)
    this.name = 'SupabaseError'
  }
}

export function handleSupabaseError(error: unknown): never {
  if (error instanceof SupabaseError) {
    throw error
  }

  const message = error instanceof Error ? error.message : 'An unknown error occurred'
  throw new SupabaseError(message)
}