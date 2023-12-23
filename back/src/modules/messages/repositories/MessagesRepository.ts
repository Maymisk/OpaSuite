import { ICreateMessageDTO, IMessagesRepository } from './IMessagesRespository';
import { Message } from './Message';

export class MessagesRepository implements IMessagesRepository {
	async create({
		sender_id,
		text,
		chat_id,
	}: ICreateMessageDTO): Promise<Message> {
		const message = await Message.create({
			sender_id,
			text,
			chat_id,
		});

		await message.save();

		return message;
	}

	async findByChatId(chat_id: string): Promise<Message[]> {
		const messages = await Message.find({
			chat_id,
		})
			.populate('sender_id', '_id name')
			.exec();

		return messages;
	}
}
