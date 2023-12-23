import { Socket } from 'socket.io';
import { io } from '../../../http/app';
import { FindChatByUsersService } from '../../../modules/chats/services/FindChatByUsersService';
import { CreateMessageService } from '../../../modules/messages/services/CreateMessageService';

interface IHandleMessageProps {
	socket: Socket;
	users: Record<string, string>;
	onlineUsers: Record<string, { _id: string; name: string }>;
	from: string;
	to: string;
	text: string;
	unreadMessages: Record<string, number>;
}

export async function handleMessage({
	socket,
	users,
	onlineUsers,
	unreadMessages,
	from,
	to,
	text,
}: IHandleMessageProps) {
	const toSocketId = users[to];
	const user = onlineUsers[socket.id];
	const key = `${from}_${to}`;

	if (!unreadMessages[key]) unreadMessages[key] = 1;
	else unreadMessages[key]++;

	if (toSocketId) {
		const createMessageService = new CreateMessageService();
		const findChatByUsersService = new FindChatByUsersService();

		const chat = await findChatByUsersService.execute([from, to]);

		if (!chat) return;

		const toUser = chat.users_id.find(value => value.id != user._id);

		const message = await createMessageService.execute({
			sender_id: from,
			text,
			chat_id: chat?.id,
		});

		io.to(toSocketId).emit('message', {
			_id: message.id,
			sender_id: { name: user.name, _id: from },
			text,
			created_at: message.created_at,
		});
		io.to(toSocketId).emit('messageNotification', {
			_id: user._id,
			name: user.name,
			text,
			unreadMessages: unreadMessages[key],
		});
		socket.emit('updateMessages', {
			_id: message.id,
			text: message.text,
			created_at: message.created_at,
			sender_id: {
				name: user.name,
			},
		});
		socket.emit('updateChats', {
			_id: to,
			name: toUser?.name,
			online: !!onlineUsers[toSocketId],
			unreadMessages: 0,
		});
	}
}
