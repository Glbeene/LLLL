import type { Database } from './database'

export type { Database }

// Table row types
export type Post = Database['public']['Tables']['posts']['Row']
export type Message = Database['public']['Tables']['messages']['Row']
export type Subscriber = Database['public']['Tables']['subscribers']['Row']

// Insert types
export type NewPost = Database['public']['Tables']['posts']['Insert']
export type NewMessage = Database['public']['Tables']['messages']['Insert']
export type NewSubscriber = Database['public']['Tables']['subscribers']['Insert']