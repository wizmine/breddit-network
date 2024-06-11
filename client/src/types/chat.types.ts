export interface IChatResponse {
  firstUser: string;
  secondUser: string;
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface IMessage {
  id: string;
  content: string;
  senderName: string;
  senderId: string;
  chatId: string;
  createdAt: number;
}

export interface IChat {
  id: string;
  participants: IUser[];
  messages: IMessage[];
}
