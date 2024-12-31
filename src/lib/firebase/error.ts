export class FirebaseError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = 'FirebaseError';
  }
}

export function handleFirebaseError(error: unknown): never {
  if (error instanceof FirebaseError) {
    throw error;
  }

  const message = error instanceof Error ? error.message : 'An unknown error occurred';
  throw new FirebaseError(message);
}