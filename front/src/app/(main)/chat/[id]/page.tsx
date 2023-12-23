import { MessageForm } from '@/components/Chat/MessageForm';
import { MessagesList } from '@/components/Chat/MessagesList';
import { UserCard } from '@/components/Chat/UserCard';

interface IChatProps {
	params: {
		id: string;
	};
}

export default async function Chat({ params: { id } }: IChatProps) {
	return (
		<main className="w-full p-6 flex flex-col">
			<MessagesList user_id={id} />

			<MessageForm to={id} />
		</main>
	);
}

/*
READ ME
*/
