import { isValidObjectId } from 'mongoose';
import { ChatsRepository } from '../repositories/ChatsRepository';

export class FindChatsByUserIdService {
	async execute(user_id: string) {
		if (!isValidObjectId(user_id)) return [];

		const chatsRepository = new ChatsRepository();

		const chats = await chatsRepository.findByUserId(user_id);

		return chats;
	}
}
