import { Socket } from 'socket.io';
import { io } from '../../../http/app';

interface IHandleConnectionProps {
	data: any;
	socket: Socket;
	users: Record<string, string>;
	onlineUsers: Record<string, { _id: string; name: string }>;
}

export function handleConnection({
	data: { _id, name },
	socket,
	users,
	onlineUsers,
}: IHandleConnectionProps) {
	users[_id] = socket.id;
	onlineUsers[socket.id] = { _id, name };

	console.log(users, onlineUsers, 'CONNOECTION HERE');

	setTimeout(() => {
		io.emit('onlineUsers', {
			onlineUsers: Array.from(Object.values(onlineUsers)),
		});
		socket.broadcast.emit('user_connected', { _id, name });
	}, 3000);
}
