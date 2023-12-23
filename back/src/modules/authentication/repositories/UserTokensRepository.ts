import {
	ICreateUserTokenDTO,
	IUserTokensRepository,
} from './IUserTokensRepository';
import { UserToken } from './UserToken';

export class UserTokensRepository implements IUserTokensRepository {
	async create({
		user_id,
		refresh_token,
		expiration_date,
	}: ICreateUserTokenDTO): Promise<UserToken> {
		const token = await UserToken.create({
			user_id,
			refresh_token,
			expiration_date,
		});

		await token.save();

		return token;
	}

	async findByRefreshToken(refresh_token: string): Promise<UserToken | null> {
		const token = await UserToken.findOne({ refresh_token });

		return token;
	}

	async findByUserId(user_id: string): Promise<UserToken | null> {
		const token = await UserToken.findOne({ user_id }).exec();

		return token;
	}

	async deleteByRefreshToken(refresh_token: string): Promise<void> {
		await UserToken.deleteOne({ refresh_token }).exec();
	}
}
