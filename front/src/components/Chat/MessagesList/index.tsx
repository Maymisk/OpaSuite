'use client';

import { useSocket } from '@/contexts/websockets/ChatContext';
import { MessageItem } from './MessageItem';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth/AuthContext';
import { LoadingIcon } from '@/components/global/LoadingIcon';
import { usePathname } from 'next/navigation';

interface IMessagesListProps {
	user_id: string;
}

interface IMessage {
	_id: string;
	text: string;
	sender_id: {
		_id: string;
		name: string;
	};
	created_at: string;
}

export function MessagesList({ user_id }: IMessagesListProps) {
	const { socket } = useSocket();
	const { user } = useAuth();
	const [messages, setMessages] = useState<IMessage[]>([]);
	const path = usePathname();

	useEffect(() => {
		socket.on('loadMessages', messages => setMessages(messages));
		socket.on('message', (data: IMessage) => {
			setMessages(prev => {
				const filtered = prev.filter(
					message => message._id != data._id
				);
				return [...filtered, data];
			});
		});
		socket.on('updateMessages', (data: IMessage) => {
			setMessages(prev => {
				const filtered = prev.filter(
					message => message._id != data._id
				);
				return [...filtered, data];
			});
		});
	}, []);

	useEffect(() => {
		if (user) {
			socket.emit('start_chat', { creator_id: user._id, user_id });
			socket.emit('readMessages', { from: user_id, to: user._id });
		}
	}, [user]);

	return (
		<ul className="h-full flex flex-col gap-4 mt-6">
			{messages.map(message => (
				<MessageItem
					key={message._id}
					name={message.sender_id.name}
					text={message.text}
					created_at={message.created_at}
				/>
			))}
		</ul>
	);
}
