import { Socket } from 'socket.io';

interface IHandleReadMessagesProps {
	socket: Socket;
	unreadMessages: Record<string, number>;
	from: string;
	to: string;
}

export function handleReadMessages({
	socket,
	unreadMessages,
	from,
	to,
}: IHandleReadMessagesProps) {
	const key = `${from}_${to}`;
	unreadMessages[key] = 0;

	socket.emit('readMessages', { from });
}
