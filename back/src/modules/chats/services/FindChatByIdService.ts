import { isValidObjectId } from 'mongoose';
import { ChatsRepository } from '../repositories/ChatsRepository';

export class FindChatByIdService {
	async execute(chat_id: string) {
		if (!isValidObjectId(chat_id)) return null;

		const chatsRepository = new ChatsRepository();

		const chat = await chatsRepository.findByChatId(chat_id);

		return chat;
	}
}
