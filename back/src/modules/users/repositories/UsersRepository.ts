import mongoose from 'mongoose';
import { ICreateUserDTO, IUsersRepository } from './IUsersRepository';
import { User } from './User';

export class UsersRepository implements IUsersRepository {
	async create({
		name,
		email,
		password,
		socket_id,
	}: ICreateUserDTO): Promise<User> {
		const user = await User.create({ name, email, password, socket_id });

		await user.save();

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await User.findOne({ email }).exec();

		return user;
	}

	async findBySocketId(socket_id: string): Promise<User | null> {
		const user = await User.findOne({ socket_id }).exec();

		return user;
	}

	async findById(user_id: string): Promise<User | null> {
		const user = await User.findById(user_id).exec();

		return user;
	}
}
