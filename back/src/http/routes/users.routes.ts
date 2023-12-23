import { Router } from 'express';
import { CreateUserController } from '../../modules/users/controllers/CreateUserController';
import { FindUserByIdController } from '../../modules/users/controllers/FindUserByIdController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const createUserController = new CreateUserController();
usersRouter.post('/', createUserController.handle);

const findUserByIdController = new FindUserByIdController();
usersRouter.get('/', ensureAuthenticated, findUserByIdController.handle);

export { usersRouter };
