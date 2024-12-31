export interface MessageInput {
  name: string;
  email: string;
  message: string;
}

export interface Message extends MessageInput {
  id: string;
  created_at: string;
}