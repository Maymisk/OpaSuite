import { isValidObjectId } from 'mongoose';
import { AppError } from '../../../http/errors/AppError';
import { UsersRepository } from '../../users/repositories/UsersRepository';
import { ChatsRepository } from '../repositories/ChatsRepository';

export class CreateChatService {
	async execute(users: string[]) {
		if (users.length < 2)
			throw new AppError('Not enough users to create a chat', 400);

		const chatsRepository = new ChatsRepository(),
			usersRepository = new UsersRepository();

		const promises = users.map(id => {
			if (!isValidObjectId(id))
				throw new AppError(
					"Some of the users in the chat don't exist.",
					400
				);

			return usersRepository.findById(id);
		});
		const resolved = await Promise.all(promises);

		for (const promise of resolved)
			if (!promise)
				throw new AppError(
					"Some of the users in the chat don't exist.",
					400
				);

		if (users.length === 2) {
			const chatExists = await chatsRepository.findByUsers(users);
			if (chatExists) return chatExists;
		}

		const chat = await chatsRepository.create({ users });

		return chat;
	}
}
