'use client';

import { Input } from '@/components/global/Inputs/Input';
import { useAuth } from '@/contexts/auth/AuthContext';
import { useSocket } from '@/contexts/websockets/ChatContext';
import { FormEvent, useState } from 'react';

interface IMessageFormProps {
	to: string;
}

export function MessageForm({ to }: IMessageFormProps) {
	const [message, setMessage] = useState('');
	const { user } = useAuth();
	const { socket } = useSocket();

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		socket.emit('message', { from: user?._id, to, text: message });

		setMessage('');
	}

	return (
		<form
			onSubmit={event => handleSubmit(event)}
			className="w-full mt-auto flex gap-4"
		>
			<Input
				label=""
				type="text"
				placeholder="Conversar"
				value={message}
				onChange={event => setMessage(event.target.value)}
			/>

			<button
				type="submit"
				className="text-gray100 uppercase bg-purple500 p-4 rounded-md"
			>
				Enviar
			</button>
		</form>
	);
}
