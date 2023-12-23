import { Router } from 'express';
import { CreateMessageController } from '../../modules/messages/controllers/CreateMessageController';
import { FindMessagesByChatIdController } from '../../modules/messages/controllers/FindMessagesByChatIdController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const messagesRouter = Router();

const createMessageController = new CreateMessageController();
messagesRouter.post('/', ensureAuthenticated, createMessageController.handle);

const findMessagesByChatIdController = new FindMessagesByChatIdController();
messagesRouter.get(
	'/',
	ensureAuthenticated,
	findMessagesByChatIdController.handle
);

export { messagesRouter };
