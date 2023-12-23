import { Socket } from 'socket.io';
import { io } from '../../../http/app';

interface IHandleGetOnlineUsersProps {
	onlineUsers: any;
}

export function handleGetOnlineUsers({
	onlineUsers,
}: IHandleGetOnlineUsersProps) {
	io.emit('onlineUsers', {
		onlineUsers: Array.from(Object.values(onlineUsers)),
	});
}
