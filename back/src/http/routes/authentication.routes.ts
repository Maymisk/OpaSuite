import { Router } from 'express';
import { AuthenticateUserController } from '../../modules/authentication/controllers/AuthenticateUserController';
import { RefreshTokenController } from '../../modules/authentication/controllers/RefreshTokenController';

const authenticationRouter = Router();

const authenticateUserController = new AuthenticateUserController();
authenticationRouter.post('/authenticate', authenticateUserController.handle);

const refreshTokenController = new RefreshTokenController();
authenticationRouter.post('/refresh', refreshTokenController.handle);

export { authenticationRouter };
