import mongoose, { Document, Schema } from 'mongoose';

type Message = Document & {
	sender_id: string;
	text: string;
	chat_id: string;
	created_at: Date;
};

const schema = new Schema({
	sender_id: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
	},
	text: String,
	chat_id: {
		type: Schema.Types.ObjectId,
		ref: 'Chats',
	},
	created_at: {
		type: Schema.Types.Date,
		default: Date.now,
	},
});

const Message = mongoose.model<Message>('Messages', schema);

export { Message };
