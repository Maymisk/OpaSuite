'use client';

import { useAuth } from '@/contexts/auth/AuthContext';
import { UserItem } from './UserItem';
import { useSocket } from '@/contexts/websockets/ChatContext';
import { useEffect, useState } from 'react';

interface IUser {
	_id: string;
	name: string;
}

export function OnlineUsers() {
	const { user } = useAuth();
	const { socket } = useSocket();
	const [onlineUsers, setOnlineUsers] = useState<IUser[] | null>(null);

	useEffect(() => {
		socket.on('onlineUsers', (data: any) =>
			setOnlineUsers(
				data.onlineUsers.filter(
					(onlineUser: any) => onlineUser._id != user?._id
				)
			)
		);
		socket.emit('getOnlineUsers');
	}, [user]);

	return (
		<ul className="flex flex-col gap-1 mt-4 py-4">
			{onlineUsers?.map(onlineUser => (
				<UserItem key={onlineUser._id} {...onlineUser} />
			))}
		</ul>
	);
}
