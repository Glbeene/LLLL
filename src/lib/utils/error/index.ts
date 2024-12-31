export class AppError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: unknown): never {
  if (error instanceof AppError) {
    throw error;
  }

  const message = error instanceof Error ? error.message : 'An unknown error occurred';
  throw new AppError(message);
}