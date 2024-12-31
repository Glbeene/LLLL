import { getAllPosts, getPostBySlug } from '../supabase/queries/posts'
import type { Post } from '../supabase/types'

export async function getAllBlogPosts(): Promise<Post[]> {
  try {
    return await getAllPosts()
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await getPostBySlug(slug)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}