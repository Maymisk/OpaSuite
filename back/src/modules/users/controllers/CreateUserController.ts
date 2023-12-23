import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

export class CreateUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { name, email, password, socket_id } = request.body;

		const createUserService = new CreateUserService();

		const user = await createUserService.execute({
			name,
			email,
			password,
			socket_id,
		});

		return response.status(201).json(user);
	}
}
