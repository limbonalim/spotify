import {Schema, model, HydratedDocument} from 'mongoose';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import type { IUserFields, IUserMethods, IUserModel } from '../types';

const SALT_WORK_FACTOR = 10;

const usersSchema = new Schema<IUserFields, IUserModel, IUserMethods>({
	username: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: async function (this: HydratedDocument<IUserFields>,username: string): Promise<boolean> {
				if (!this.isModified('username')) return true;
				const user: HydratedDocument<IUserFields> | null = await User.findOne({username});
				return !user;
			},
			message: 'This user is already registered!',
		}
	},
	password: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
});

usersSchema.methods.checkPassword = function (password: string) {
	return bcrypt.compare(password, this.password);
};

usersSchema.methods.generateToken = function () {
	this.token = randomUUID();
};

usersSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
	this.password = await bcrypt.hash(this.password, salt);

	next();
});

usersSchema.set('toJSON', {
	transform: (_doc, ret) => {
		delete ret.password;
		return ret;
	},
});

const User = model<IUserFields, IUserModel>('users', usersSchema);

export default User;
