export const FIREBASE_COLLECTIONS = {
  POSTS: 'posts',
  MESSAGES: 'messages',
  SUBSCRIBERS: 'subscribers'
} as const;

export const ERROR_MESSAGES = {
  FIREBASE_NOT_INITIALIZED: 'Firebase is not initialized. Please check your configuration.',
  INVALID_EMAIL: 'Please enter a valid email address',
  CONTACT_FORM_FAILED: 'Failed to submit contact form. Please try again later.',
  NEWSLETTER_FAILED: 'Failed to subscribe to newsletter. Please try again later.'
} as const;