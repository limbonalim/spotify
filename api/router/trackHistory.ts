import { Router } from 'express';
import mongoose, { Types } from 'mongoose';
import TrackHistory from '../models/trackHistorySchema';
import auth, { RequestWithUser } from '../middleware/auth';

const trackHistoryRouter = Router();

trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
	try {
		const user = req.user;
		let trackId: Types.ObjectId;

		try {
			trackId = new Types.ObjectId(req.body.track as string);
		} catch {
			return res.status(404).send({ message: 'Wrong track ObjectId!' });
		}

		const trackHistoryRecord = new TrackHistory({
			user: user?._id,
			track: trackId,
			datetime: new Date(),
		});

		await trackHistoryRecord.save();
		return res.send(trackHistoryRecord);
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return res.status(422).send(e);
		}
		next(e);
	}
});

trackHistoryRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
	try {
		const user = req.user;

		const result = await TrackHistory.find({ user: user?._id }, null, {
			sort: { datetime: 'desc' },
		})
			.populate({
				path: 'track',
				populate: {
					path: 'album',
					populate: {
						path: 'artist',
						select: 'name',
					},
				},
			})
			.exec();

		if (!result[0]) {
			return res.status(404).send({ message: 'Not found' });
		}

		res.send(result);
	} catch (e) {
		next(e);
	}
});

export default trackHistoryRouter;
