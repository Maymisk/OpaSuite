import { Request, Response } from 'express';
import { FindChatsByUserIdService } from '../services/FindChatsByUserIdService';

export class FindChatsByUserIdController {
	async handle(request: Request, response: Response): Promise<Response> {
		const user_id = request.user.id;

		const findChatsByUserIdService = new FindChatsByUserIdService();
		const chats = await findChatsByUserIdService.execute(user_id);

		return response.json(chats);
	}
}
