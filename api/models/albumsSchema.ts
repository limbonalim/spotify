import { Schema, model, Types } from 'mongoose';
import Artist from './artistsSchema';
import type { IAlbumsFields, IAlbumsModel } from '../types';
import User from './usersSchema';

const albumsSchema = new Schema<IAlbumsFields, IAlbumsModel, unknown>({
	title: {
		type: String,
		required: true,
	},
	year: {
		type: Number,
		required: true,
	},
	artist: {
		type: Schema.Types.ObjectId,
		ref: 'artists',
		required: true,
		validate: {
			validator: async (value: Types.ObjectId) => {
				const artist = await Artist.findById(value);
				return Boolean(artist);
			},
			message: 'Artist does not exist!',
		},
	},
	image: String,
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

const Album = model<IAlbumsFields, IAlbumsModel>('albums', albumsSchema);

export default Album;
