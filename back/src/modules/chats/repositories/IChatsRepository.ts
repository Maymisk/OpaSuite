import { Chat } from './Chat';

export interface ICreateChatDTO {
	users: string[];
}

export interface IChatsRepository {
	create(data: ICreateChatDTO): Promise<Chat>;
	findByChatId(chat_id: string): Promise<Chat | null>;
	findByUsers(users: string[]): Promise<Chat | null>;
	findByUserId(user_id: string): Promise<Chat[]>;
}
