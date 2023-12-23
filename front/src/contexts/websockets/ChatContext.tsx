'use client';

import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import { useAuth } from '../auth/AuthContext';
import { io } from 'socket.io-client';

type SocketType = ReturnType<typeof io>;

interface IChatContextProviderProps {
	children: ReactNode;
}

interface IChatContextData {
	socket: SocketType;
}

const instance = io('http://localhost:3333');
const ChatContext = createContext<IChatContextData>({} as IChatContextData);
export function ChatContextProvider({ children }: IChatContextProviderProps) {
	const { user } = useAuth();
	const [socket] = useState<SocketType>(instance);

	useEffect(() => {
		socket.connect();

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		if (user) {
			socket.emit('connected', {
				_id: user._id,
				name: user.name,
			});
		}
	}, [user]);

	return (
		<ChatContext.Provider value={{ socket }}>
			{children}
		</ChatContext.Provider>
	);
}

export function useSocket() {
	return useContext(ChatContext);
}
