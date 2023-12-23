import { User } from './User';

export interface ICreateUserDTO {
	name: string;
	email: string;
	password: string;
	socket_id: string;
}

export interface IUsersRepository {
	create(data: ICreateUserDTO): Promise<User>;
	findByEmail(email: string): Promise<User | null>;
	findBySocketId(socket_id: string): Promise<User | null>;
	findById(id: string): Promise<User | null>;
}
