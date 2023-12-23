import { Request, Response } from 'express';
import { FindMessagesByChatIdService } from '../services/FindMessagesByChatIdService';

export class FindMessagesByChatIdController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { chat_id } = request.body;

		const findMessagesByChatIdService = new FindMessagesByChatIdService();

		const user = await findMessagesByChatIdService.execute(chat_id);

		return response.status(201).json(user);
	}
}
