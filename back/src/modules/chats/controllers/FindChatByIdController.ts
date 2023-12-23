import { Request, Response } from 'express';
import { FindChatByIdService } from '../services/FindChatByIdService';

export class FindChatByIdController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { chat_id } = request.body;

		const findChatByIdService = new FindChatByIdService();
		const chat = await findChatByIdService.execute(chat_id);

		return response.json(chat);
	}
}
