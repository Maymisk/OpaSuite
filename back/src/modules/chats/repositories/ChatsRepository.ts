import { Chat } from './Chat';
import { IChatsRepository, ICreateChatDTO } from './IChatsRepository';

export class ChatsRepository implements IChatsRepository {
	async create({ users }: ICreateChatDTO): Promise<Chat> {
		const chat = await Chat.create({ users_id: users });

		await chat.save();

		return chat;
	}

	async findByChatId(chat_id: string): Promise<Chat | null> {
		const chat = await Chat.findById(chat_id)
			.populate('users_id', '_id name email socket_id')
			.exec();

		return chat;
	}

	async findByUsers(users: string[]): Promise<Chat | null> {
		const chat = await Chat.findOne({
			users_id: {
				$all: users,
			},
		})
			.populate('users_id', '_id name')
			.exec();

		return chat;
	}

	async findByUserId(user_id: string): Promise<Chat[]> {
		const chats = await Chat.find({
			users_id: {
				$in: [user_id],
			},
		})
			.populate('users_id', '_id name')
			.exec();

		return chats;
	}
}
