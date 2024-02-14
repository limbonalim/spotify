import { Schema, model, Types } from 'mongoose';
import User from './usersSchema';
import Track from './tracksSchema';
import type { ITrackHistoryFields, ITrackHistoryModel } from '../types';

const trackHistorySchema = new Schema<
	ITrackHistoryFields,
	ITrackHistoryModel,
	unknown
>({
	user: {
		type: Types.ObjectId,
		ref: 'users',
		required: true,
		validate: {
			validator: async (value: Types.ObjectId) => {
				const user = await User.findById(value);
				return Boolean(user);
			},
			message: 'User is not found',
		},
	},
	track: {
		type: Types.ObjectId,
		ref: 'tracks',
		required: true,
		validate: {
			validator: async (value: Types.ObjectId) => {
				const track = await Track.findById(value);
				return Boolean(track);
			},
			message: 'Track is not found',
		},
	},
	datetime: {
		type: Date,
		default: () => new Date(),
	},
});

const TrackHistory = model<ITrackHistoryFields, ITrackHistoryModel>(
	'trackHistory',
	trackHistorySchema,
);
export default TrackHistory;
