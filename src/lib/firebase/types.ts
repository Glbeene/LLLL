export interface BlogPost {
  id?: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  slug: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: Date;
}