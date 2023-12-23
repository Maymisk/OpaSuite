import { compare } from 'bcrypt';
import { AppError } from '../../../http/errors/AppError';
import { UsersRepository } from '../../users/repositories/UsersRepository';
import { UserTokensRepository } from '../repositories/UserTokensRepository';
import { sign } from 'jsonwebtoken';
import { addDays } from 'date-fns';
import auth from '../../../config/auth';
import { UserMapper } from '../../users/mappers/UserMapper';

interface IAuthenticateUserServiceProps {
	email: string;
	password: string;
}

interface IUser {
	_id: string;
	name: string;
	email: string;
}

interface IReturnObject {
	user: IUser;
	token: string;
	refresh_token: string;
}

export class AuthenticateUserService {
	async execute({
		email,
		password,
	}: IAuthenticateUserServiceProps): Promise<IReturnObject> {
		const usersRepository = new UsersRepository(),
			userTokensRepository = new UserTokensRepository();

		const userExists = await usersRepository.findByEmail(email);
		if (!userExists)
			throw new AppError('Email or password incorrect.', 400);

		const passwordsMatch = await compare(password, userExists.password);
		if (!passwordsMatch)
			throw new AppError('Email or password incorrect.', 400);

		const hasRefreshToken = await userTokensRepository.findByUserId(
			userExists._id
		);
		if (hasRefreshToken)
			await userTokensRepository.deleteByRefreshToken(
				hasRefreshToken.refresh_token
			);

		const token = sign({ email }, auth.jwt_secret as string, {
			subject: userExists.id,
			expiresIn: auth.jwt_expiresIn,
		});

		const refresh_token = sign(
			{ email },
			auth.refreshJWT_secret as string,
			{
				subject: userExists.id,
				expiresIn: auth.refreshJWT_expiresIn,
			}
		);

		const expiration_date = addDays(
			new Date(),
			auth.refreshJWT_expiresDays
		).toISOString();

		await userTokensRepository.create({
			user_id: userExists.id,
			refresh_token,
			expiration_date,
		});

		return {
			user: UserMapper.toDTO(userExists) as IUser,
			token,
			refresh_token,
		};
	}
}
