import { isValidObjectId } from 'mongoose';
import { ChatsRepository } from '../repositories/ChatsRepository';
import { AppError } from '../../../http/errors/AppError';

export class FindChatByUsersService {
	async execute(users: string[]) {
		users.forEach(user => {
			if (!isValidObjectId(user))
				throw new AppError('Some of the users dont exist', 400);
		});

		const chatsRepository = new ChatsRepository();

		const chat = await chatsRepository.findByUsers(users);

		return chat;
	}
}
