import { Socket } from 'socket.io';
import { FindChatsByUserIdService } from '../../../modules/chats/services/FindChatsByUserIdService';

interface IHandleGetChatsProps {
	socket: Socket;
	onlineUsers: Record<string, { _id: string; name: string }>;
	unreadMessages: Record<string, number>;
	users: Record<string, string>;
	user_id: string;
}

export async function handleGetChats({
	socket,
	onlineUsers,
	users,
	unreadMessages,
	user_id,
}: IHandleGetChatsProps) {
	const findChatsByUserIdService = new FindChatsByUserIdService();
	const data = await findChatsByUserIdService.execute(user_id);

	const chatUsers = data.map(chat => chat.users_id);

	const chats: any[] = [];
	chatUsers.forEach(usersArray => {
		const relevantChatUser = usersArray.find(
			chatUser => chatUser._id != user_id
		);
		const key = `${relevantChatUser?.id}_${user_id}`;
		const messages = unreadMessages[key];
		const relevantUserSocketId = users[relevantChatUser?.id];

		chats.push({
			_id: relevantChatUser?.id,
			name: relevantChatUser?.name,
			online: !!onlineUsers[relevantUserSocketId],
			unreadMessages: messages ? messages : 0,
		});
	});
	console.log(chats, onlineUsers, 'CHATS UPON LOAD');
	socket.emit('loadChats', chats);
}
