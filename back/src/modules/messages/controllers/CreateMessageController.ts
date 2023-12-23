import { Request, Response } from 'express';
import { CreateMessageService } from '../services/CreateMessageService';

export class CreateMessageController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { sender_id, text, chat_id } = request.body;

		const createMessageService = new CreateMessageService();

		const message = await createMessageService.execute({
			chat_id,
			sender_id,
			text,
		});

		return response.status(201).json(message);
	}
}
