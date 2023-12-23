import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

export class AuthenticateUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body;

		const authenticateUserService = new AuthenticateUserService();
		const tokensAndUser = await authenticateUserService.execute({
			email,
			password,
		});

		return response.status(200).json(tokensAndUser);
	}
}
