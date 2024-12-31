export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  slug: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  subscribed_at: string;
}