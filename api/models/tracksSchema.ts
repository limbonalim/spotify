import { Schema, model, Types } from 'mongoose';
import Album from './albumsSchema';
import type { ITrackFields, ITrackModel } from '../types';

const tracksSchema = new Schema<ITrackFields, ITrackModel, unknown>({
	title: {
		type: String,
		required: true,
	},
	album: {
		type: Schema.Types.ObjectId,
		ref: 'albums',
		required: true,
		validate: {
			validator: async (value: Types.ObjectId) => {
				const album = await Album.findById(value);
				return Boolean(album);
			},
			message: 'Album does not exist!',
		},
	},
	numberInAlbum: {
		type: Number,
		required: true,
	},
	url: String,
	duration: {
		type: String,
		required: true,
	},
	isPublished: {
		type: Boolean,
		required: true,
		default: false,
	}
});

const Track = model<ITrackFields, ITrackModel>('tracks', tracksSchema);

export default Track;
