import { Router } from 'express';
import { chatsRouter } from './chats.routes';
import { messagesRouter } from './messages.routes';
import { usersRouter } from './users.routes';
import { authenticationRouter } from './authentication.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/users', authenticationRouter);
router.use('/messages', messagesRouter);
router.use('/chats', chatsRouter);

export { router };
