
export interface User {
  id: number;
  name: string;
  avatarUrl: string;
  isBot?: boolean;
}

export interface Message {
  id: number;
  text: string;
  timestamp: string;
  senderId: number;
}

export interface Chat {
  id: number;
  user: User;
  messages: Message[];
}
