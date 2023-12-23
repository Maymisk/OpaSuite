'use client';

import { useAuth } from '@/contexts/auth/AuthContext';
import { api } from '@/services/api';
import { useEffect, useState } from 'react';
import { Chat } from './Chat';

interface IChat {
	_id: string;
	name: string;
	online: boolean;
	unreadMessages: number;
}

interface IChatListProps {
	chats: IChat[];
}

export function ChatsList({ chats }: IChatListProps) {
	return (
		<ul>
			{chats?.map(chat => (
				<Chat key={chat._id} {...chat} />
			))}
		</ul>
	);
}
