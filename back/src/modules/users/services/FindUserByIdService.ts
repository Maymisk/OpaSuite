import { UserMapper } from '../mappers/UserMapper';
import { UsersRepository } from '../repositories/UsersRepository';

export class FindUserByIdService {
	async execute(id: string) {
		const repository = new UsersRepository();

		const user = await repository.findById(id);

		return UserMapper.toDTO(user);
	}
}
