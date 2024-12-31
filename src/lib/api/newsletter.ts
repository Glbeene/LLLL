import { addSubscriber } from '../supabase/queries/subscribers';

export async function subscribeToNewsletter(email: string): Promise<string | null> {
  try {
    return await addSubscriber(email);
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw new Error('Failed to subscribe to newsletter. Please try again later.');
  }
}