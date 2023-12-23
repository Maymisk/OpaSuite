import { Router } from 'express';
import { CreateChatController } from '../../modules/chats/controllers/CreateChatController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { FindChatByIdController } from '../../modules/chats/controllers/FindChatByIdController';
import { FindChatsByUserIdController } from '../../modules/chats/controllers/FindChatsByUserIdController';

const chatsRouter = Router();

const createChatController = new CreateChatController();
chatsRouter.post('/', ensureAuthenticated, createChatController.handle);

const findChatByIdController = new FindChatByIdController();
chatsRouter.get('/', ensureAuthenticated, findChatByIdController.handle);

const findChatsByUserIdController = new FindChatsByUserIdController();
chatsRouter.get(
	'/user',
	ensureAuthenticated,
	findChatsByUserIdController.handle
);

export { chatsRouter };
