import { Socket } from 'socket.io';
import { io } from '../../../http/app';
import { CreateChatService } from '../../../modules/chats/services/CreateChatService';
import { FindChatByUsersService } from '../../../modules/chats/services/FindChatByUsersService';
import { FindMessagesByChatIdService } from '../../../modules/messages/services/FindMessagesByChatIdService';

interface IHandleStartChatProps {
	socket: Socket;
	creator_id: string;
	user_id: string;
}

export async function handleStartChatUsers({
	socket,
	creator_id,
	user_id,
}: IHandleStartChatProps) {
	const createChatService = new CreateChatService();
	const findChatByUsersService = new FindChatByUsersService();
	const findMessagesByChatIdService = new FindMessagesByChatIdService();

	const users = [creator_id, user_id];

	let chat = await findChatByUsersService.execute(users);

	if (!chat) chat = await createChatService.execute(users);

	const messages = await findMessagesByChatIdService.execute(chat.id);

	socket.emit('loadMessages', messages);
}
