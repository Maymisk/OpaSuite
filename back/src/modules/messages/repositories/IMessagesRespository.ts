import { Message } from './Message';

export interface ICreateMessageDTO {
	sender_id: string;
	text: string;
	chat_id: string;
}

export interface IMessagesRepository {
	create(data: ICreateMessageDTO): Promise<Message>;
	findByChatId(chat_id: string): Promise<Message[]>;
}
