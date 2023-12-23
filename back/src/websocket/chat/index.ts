import { io } from '../../http/app';
import { handleConnection } from './handlers/Connected';
import { handleDisconnection } from './handlers/Disconnected';
import { handleGetChats } from './handlers/GetChats';
import { handleGetOnlineUsers } from './handlers/GetOnlineUsers';
import { handleMessage } from './handlers/Message';
import { handleReadMessages } from './handlers/ReadMessages';
import { handleStartChatUsers } from './handlers/StartChat';

interface IUser {
	_id: string;
	name: string;
}

const users: Record<string, string> = {};
const onlineUsers: Record<string, { _id: string; name: string }> = {};
const unreadMessages: Record<string, number> = {};

io.on('connection', socket => {
	socket.on('connected', data =>
		handleConnection({ data, socket, users, onlineUsers })
	);

	socket.on('disconnect', () =>
		handleDisconnection({
			socket,
			onlineUsers,
		})
	);

	socket.on('getOnlineUsers', () => handleGetOnlineUsers({ onlineUsers }));
	socket.on('getChats', data =>
		handleGetChats({
			socket,
			onlineUsers,
			users,
			unreadMessages,
			user_id: data.user_id,
		})
	);

	socket.on(
		'start_chat',
		async (data: any) =>
			await handleStartChatUsers({
				socket,
				creator_id: data.creator_id,
				user_id: data.user_id,
			})
	);

	socket.on('message', data =>
		handleMessage({ socket, users, onlineUsers, unreadMessages, ...data })
	);

	socket.on('readMessages', data =>
		handleReadMessages({
			from: data.from,
			to: data.to,
			socket,
			unreadMessages,
		})
	);
});
