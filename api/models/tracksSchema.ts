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
	duration: {
		type: String,
		required: true,
	},
});

const Track = model<ITrackFields, ITrackModel>('tracks', tracksSchema);

export default Track;
