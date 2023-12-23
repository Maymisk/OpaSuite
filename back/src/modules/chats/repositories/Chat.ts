import mongoose, { Document, Schema } from 'mongoose';
import { User } from '../../users/repositories/User';
import { v4 as uuid } from 'uuid';

type Chat = Document & {
	users_id: User[];
};

const schema = new Schema({
	users_id: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Users',
		},
	],
});

const Chat = mongoose.model<Chat>('Chats', schema);

export { Chat };
