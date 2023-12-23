import { sign, verify } from 'jsonwebtoken';
import { UserTokensRepository } from '../repositories/UserTokensRepository';
import auth from '../../../config/auth';
import { AppError } from '../../../http/errors/AppError';
import { addDays } from 'date-fns';

interface IPayload {
	sub: string;
	email: string;
}

export class RefreshTokenService {
	async execute(refresh_token: string) {
		try {
			const { sub, email } = verify(
				refresh_token,
				auth.refreshJWT_secret as string
			) as IPayload;

			const userTokensRepository = new UserTokensRepository();

			const tokenExists = await userTokensRepository.findByRefreshToken(
				refresh_token
			);

			if (!tokenExists) throw new AppError('Invalid refresh token', 400);

			await userTokensRepository.deleteByRefreshToken(refresh_token);

			const token = sign({ email }, auth.jwt_secret as string, {
				subject: sub,
				expiresIn: auth.jwt_expiresIn,
			});

			const newRefreshToken = sign(
				{ email },
				auth.refreshJWT_secret as string,
				{
					subject: sub,
					expiresIn: auth.refreshJWT_expiresIn,
				}
			);

			const expiration_date = addDays(
				new Date(),
				auth.refreshJWT_expiresDays
			).toISOString();

			await userTokensRepository.create({
				user_id: sub,
				refresh_token: newRefreshToken,
				expiration_date,
			});

			return {
				refresh_token: newRefreshToken,
				token,
			};
		} catch (err) {
			throw new AppError('Invalid refresh token.', 400);
		}
	}
}
