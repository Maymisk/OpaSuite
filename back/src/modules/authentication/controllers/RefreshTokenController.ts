import { Request, Response } from 'express';
import { RefreshTokenService } from '../services/RefreshTokenService';

export class RefreshTokenController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { refresh_token } = request.body;

		const refreshTokenService = new RefreshTokenService();
		const tokens = await refreshTokenService.execute(refresh_token);

		return response.json(tokens);
	}
}
