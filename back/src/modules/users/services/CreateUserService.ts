import { AppError } from '../../../http/errors/AppError';
import { UserMapper } from '../mappers/UserMapper';
import { ICreateUserDTO } from '../repositories/IUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import { hash } from 'bcrypt';

export class CreateUserService {
	async execute({ name, email, password, socket_id }: ICreateUserDTO) {
		const repository = new UsersRepository();

		const userExists = await repository.findByEmail(email);

		if (userExists)
			throw new AppError('An user with this email already exists.');

		const encrypted = await hash(password, 10);

		const user = await repository.create({
			name,
			email,
			password: encrypted,
			socket_id,
		});

		return UserMapper.toDTO(user);
	}
}
