import { isValidObjectId } from 'mongoose';
import { AppError } from '../../../http/errors/AppError';
import { ChatsRepository } from '../../chats/repositories/ChatsRepository';
import { UsersRepository } from '../../users/repositories/UsersRepository';
import { ICreateMessageDTO } from '../repositories/IMessagesRespository';
import { MessagesRepository } from '../repositories/MessagesRepository';

export class CreateMessageService {
	async execute({ sender_id, chat_id, text }: ICreateMessageDTO) {
		if (!isValidObjectId(sender_id))
			throw new AppError("Sender doesn't exist", 400);
		if (!isValidObjectId(chat_id))
			throw new AppError("Chat doesn't exist", 400);
		if (text.length === 0)
			throw new AppError("You can't send an empty message", 400);

		const usersRepository = new UsersRepository(),
			messagesRepository = new MessagesRepository(),
			chatsRepository = new ChatsRepository();

		const senderExists = await usersRepository.findById(sender_id);

		if (!senderExists) throw new AppError("Sender doesn't exist", 400);

		const chatExists = await chatsRepository.findByChatId(chat_id);

		if (!chatExists) throw new AppError("Chat doesn't exist", 400);

		const message = await messagesRepository.create({
			sender_id,
			chat_id,
			text,
		});

		return message;
	}
}
