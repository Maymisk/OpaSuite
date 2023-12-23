'use client';

import { useSocket } from '@/contexts/websockets/ChatContext';
import { HomeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Toast } from '../global/Toast';
import { ChatsList } from './ChatsList';
import { useAuth } from '@/contexts/auth/AuthContext';
import { LogoutButton } from '../LogoutButton';
import { usePathname, useRouter } from 'next/navigation';

interface IOnlineUser {
	_id: string;
	name: string;
	text?: string;
}

interface IChat {
	_id: string;
	name: string;
	online: boolean;
	unreadMessages: number;
}

export function ChatsSidebar() {
	const { socket } = useSocket();

	const { user } = useAuth();
	const [chats, setChats] = useState<IChat[]>([]);
	const [onlineToastIsOpen, setOnlineToastIsOpen] = useState(false);
	const [messageToastIsOpen, setMessageToastIsOpen] = useState(false);
	const [onlineUser, setOnlineUser] = useState<IOnlineUser | null>(null);
	const path = usePathname();

	useEffect(() => {
		socket.on('loadChats', (data: IChat[]) => setChats(data));
		socket.on('updateChats', (data: IChat) =>
			setChats(prev => {
				const filtered = prev.filter(value => value._id != data._id);
				return [data, ...filtered];
			})
		);
		socket.on('user_connected', data => {
			setOnlineUser({ name: data.name, _id: data._id });
			setOnlineToastIsOpen(true);
			setChats(prev => {
				const updated = prev.map(chat => {
					if (chat._id === data._id) return { ...chat, online: true };
					return chat;
				});

				return updated;
			});
		});
		socket.on('messageNotification', (data: any) => {
			const { _id, name, text, unreadMessages } = data;
			const isChatting = path.includes(_id);

			const chat = {
				_id,
				name,
				online: true,
				unreadMessages: isChatting ? 0 : unreadMessages,
			};

			if (isChatting)
				socket.emit('readMessages', { from: _id, to: user?._id });

			setChats(prev => {
				const filtered = prev.filter(chat => chat._id != _id);
				return [chat, ...filtered];
			});
			setOnlineUser({ _id, name, text });
			setMessageToastIsOpen(true);
		});
		socket.on('readMessages', data =>
			setChats(prev =>
				prev.map(chat => {
					if (chat._id === data.from) chat.unreadMessages = 0;
					return chat;
				})
			)
		);
		socket.on('userOffline', data => {
			setChats(prev =>
				prev.map(chat => {
					if (chat._id === data.user_id) chat.online = false;
					return chat;
				})
			);
		});
	}, []);

	useEffect(() => {
		if (user) socket.emit('getChats', { user_id: user._id });
	}, [user]);

	return (
		<aside className="min-w-[13.5rem] flex flex-col gap-6 px-4 pb-2 pt-6 bg-gray600 rounded-sm">
			<Link
				href={'/'}
				className="flex items-center gap-4 text-gray100 font-bold hover:bg-gray400 hover:brightness-125 transition-all p-2 rounded-md"
			>
				<span>
					<HomeIcon width={24} height={24} />
				</span>

				<span>Home</span>
			</Link>

			<h4 className="uppercase text-xs font-bold text-gray100">
				Mensagens Diretas
			</h4>

			<ChatsList chats={chats} />

			<LogoutButton />

			<Toast
				open={onlineToastIsOpen}
				onOpenChange={setOnlineToastIsOpen}
				title={`${onlineUser?.name} está online!`}
				description="Vá trocar uma ideia."
				href={`/chat/${onlineUser?._id}`}
				color="bg-purple500"
			/>

			<Toast
				open={messageToastIsOpen}
				onOpenChange={setMessageToastIsOpen}
				title={`${onlineUser?.name} te enviou uma mensagem!`}
				description={onlineUser?.text || ''}
				href={`/chat/${onlineUser?._id}`}
				color="bg-purple500"
			/>
		</aside>
	);
}
