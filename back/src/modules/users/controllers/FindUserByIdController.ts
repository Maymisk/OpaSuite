import { Request, Response } from 'express';
import { FindUserByIdService } from '../services/FindUserByIdService';

export class FindUserByIdController {
	async handle(request: Request, response: Response): Promise<Response> {
		const id = request.body.user_id
			? request.body.user_id
			: request.user.id;

		const findUserByIdService = new FindUserByIdService();

		const user = await findUserByIdService.execute(id);

		return response.json(user);
	}
}
