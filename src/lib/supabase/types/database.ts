export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          date: string
          excerpt: string
          content: string
          slug: string
          created_at: string
        }
        Insert: {
          title: string
          date: string
          excerpt: string
          content: string
          slug: string
        }
        Update: Partial<Database['public']['Tables']['posts']['Insert']>
      }
      messages: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          created_at: string
        }
        Insert: {
          name: string
          email: string
          message: string
        }
        Update: Partial<Database['public']['Tables']['messages']['Insert']>
      }
      subscribers: {
        Row: {
          id: string
          email: string
          subscribed_at: string
        }
        Insert: {
          email: string
        }
        Update: Partial<Database['public']['Tables']['subscribers']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}