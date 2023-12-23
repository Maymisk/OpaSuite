import { Socket } from 'socket.io';
import { io } from '../../../http/app';

interface IHandleDisconnectionProps {
	socket: Socket;
	onlineUsers: Record<string, { _id: string; name: string }>;
}

export function handleDisconnection({
	socket,
	onlineUsers,
}: IHandleDisconnectionProps) {
	const user = onlineUsers[socket.id];
	delete onlineUsers[socket.id];

	io.emit('onlineUsers', {
		onlineUsers: Array.from(Object.values(onlineUsers)),
	});
	if (user) io.emit('userOffline', { user_id: user._id });
}
