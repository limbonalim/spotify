import { Schema, model } from 'mongoose';
import { IArtistFields, IArtistModel } from '../types';
import User from './usersSchema';

const artistsSchema = new Schema<IArtistFields, IArtistModel, unknown>({
	name: {
		type: String,
		required: true,
	},
	photo: String,
	info: String,
	isPublished: {
		type: Boolean,
		required: true,
		default: false,
	},
	creator: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'users',
		validate: {
			validator: async (userId: Schema.Types.ObjectId) => {
				const user = await User.findById(userId);
				return Boolean(user);
			},
			message: 'User is not found!',
		},
	},
});

const Artist = model<IArtistFields, IArtistModel>('artists', artistsSchema);

export default Artist;
