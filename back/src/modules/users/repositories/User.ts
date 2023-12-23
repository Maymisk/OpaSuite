import moongose, { Document, Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';

type User = Document & {
	name: string;
	email: string;
	password: string;
	socket_id: string;
};

const schema = new Schema({
	name: String,
	email: String,
	password: String,
	socket_id: String,
});

const User = moongose.model<User>('Users', schema);

export { User };
