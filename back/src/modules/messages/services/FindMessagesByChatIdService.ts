import { isValidObjectId } from 'mongoose';
import { AppError } from '../../../http/errors/AppError';
import { ChatsRepository } from '../../chats/repositories/ChatsRepository';
import { MessagesRepository } from '../repositories/MessagesRepository';

export class FindMessagesByChatIdService {
	async execute(chat_id: string) {
		if (!isValidObjectId(chat_id))
			throw new AppError("Chat doesn't exist", 400);

		const messagesRepository = new MessagesRepository(),
			chatsRepository = new ChatsRepository();

		const chatExists = await chatsRepository.findByChatId(chat_id);

		if (!chatExists) throw new AppError("Chat doesn't exist", 400);

		const messages = await messagesRepository.findByChatId(chat_id);

		return messages;
	}
}
