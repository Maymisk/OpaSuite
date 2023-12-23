import { UserToken } from './UserToken';

export interface ICreateUserTokenDTO {
	user_id: string;
	refresh_token: string;
	expiration_date: string;
}

export interface IUserTokensRepository {
	create(data: ICreateUserTokenDTO): Promise<UserToken>;
	findByRefreshToken(refresh_token: string): Promise<UserToken | null>;
	findByUserId(user_id: string): Promise<UserToken | null>;
	deleteByRefreshToken(refresh_token: string): Promise<void>;
}
