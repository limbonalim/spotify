import { Router } from 'express';
import mongoose, { Types } from 'mongoose';
import User from '../models/usersSchema';
import TrackHistory from '../models/trackHistorySchema';

const trackHistoryRouter = Router();

trackHistoryRouter.post('/', async (req, res, next) => {
	try {
		const headerValue = req.get('Authorization');

		const [_bearer, token] = headerValue ? headerValue.split(' ') : '';

		let trackId: Types.ObjectId;

		if (!token) {
			return res.status(401).send({ error: 'No token present' });
		}
		const user = await User.findOne({ token });

		if (!user) {
			return res.status(401).send({ error: 'Wrong token' });
		}

		try {
			trackId = new Types.ObjectId(req.body.track as string);
		} catch {
			return res.status(404).send({ error: 'Wrong track ObjectId!' });
		}

		const trackHistoryRecord = new TrackHistory({
			user: user._id,
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

export default trackHistoryRouter;
