import { User } from '../repositories/User';

type UserResponse = {
	_id: string;
	name: string;
	email: string;
	socket_id: string;
} | null;

class UserMapper {
	static toDTO(data: User | null): UserResponse {
		if (!data) return null;

		const { id, email, name, socket_id } = data;
		const user = {
			_id: id,
			email,
			name,
			socket_id,
		};

		return user;
	}
}

export { UserMapper };
