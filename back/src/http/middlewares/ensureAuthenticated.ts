import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import auth from '../../config/auth';
import { RefreshTokenService } from '../../modules/authentication/services/RefreshTokenService';

interface IPayload {
	sub: string;
}

export async function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void> {
	const authHeader = request.headers.authorization as string;
	const [, token] = authHeader.split(' ');

	try {
		const { sub } = verify(token, auth.jwt_secret as string) as IPayload;
		// Sub is the user id

		request.user = {
			id: sub,
		};

		next();
	} catch {
		const refreshHeaders = request.headers['x-refresh-token'] as string;
		const [, refresh_token] = refreshHeaders.split(' ');

		if (!refresh_token) throw new AppError('Invalid Token.', 401);

		const refreshTokenService = new RefreshTokenService();
		const { token, refresh_token: newRefreshToken } =
			await refreshTokenService.execute(refresh_token);

		const { sub } = verify(token, auth.jwt_secret as string) as IPayload;

		request.headers.authorization = `Bearer ${token}`;
		request.headers['x-refresh-token'] = `Bearer ${newRefreshToken}`;
		request.user = { id: sub };

		next();
	}
}
