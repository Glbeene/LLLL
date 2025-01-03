import { handleContactSubmission } from '../transactions/contact';
import type { MessageInput } from '../../types/messages';

export async function createMessage(input: MessageInput): Promise<string> {
  return handleContactSubmission(input);
}