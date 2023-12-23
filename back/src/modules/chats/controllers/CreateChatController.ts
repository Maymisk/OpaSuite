import { Request, Response } from 'express';
import { CreateChatService } from '../services/CreateChatService';

export class CreateChatController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { users } = request.body;

		const createChatService = new CreateChatService();
		const chat = await createChatService.execute(users);

		return response.status(201).json(chat);
	}
}
