import mongoose, { Document, Schema } from 'mongoose';

type UserToken = Document & {
	user_id: string;
	refresh_token: string;
	expiration_date: Date;
};

const schema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
	},
	refresh_token: String,
	expiration_date: String,
});

const UserToken = mongoose.model<UserToken>('UserTokens', schema);

export { UserToken };
