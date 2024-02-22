import { Router } from 'express';
import mongoose, { Types } from 'mongoose';
import Track from '../models/tracksSchema';
import Album from '../models/albumsSchema';

const tracksRouter = Router();

tracksRouter.get('/', async (req, res, next) => {
	try {
		if (req.query.album) {
			let albumId: Types.ObjectId;
			try {
				albumId = new Types.ObjectId(req.query.album as string);
			} catch {
				return res.status(404).send({ error: 'Wrong album ObjectId!' });
			}

			const result = await Track.find({ album: albumId });

			if (!result[0]) {
				return res.status(404).send({ error: 'Not found' });
			}
			return res.send(result);
		} else if (req.query.artist) {
			let artistId: Types.ObjectId;
			try {
				artistId = new Types.ObjectId(req.query.artist as string);
			} catch {
				return res.status(404).send({ error: 'Wrong artist ObjectId!' });
			}
			const albums = await Album.find({ artist: artistId }, null, {
				sort: { numberInAlbum: 1 },
			});

			if (albums) {
				const test = albums.map((item) => item._id);
				return Promise.all(
					test.map(async (item) => {
						return Promise.resolve(Track.find({ album: item }));
					}),
				).then((data) => {
					data.forEach((item) => [...item]);
					return res.send(data);
				});
			}

			return res.status(404).send({ error: 'Not found!' });
		} else {
			const result = await Track.find();

			if (!result[0]) {
				return res.status(404).send({ error: 'Not found' });
			}
			return res.send(result);
		}
	} catch (e) {
		next(e);
	}
});

tracksRouter.post('/', async (req, res, next) => {
	try {
		const track = new Track({
			title: req.body.title,
			album: req.body.album,
			numberInAlbum: parseInt(req.body.numberInAlbum),
			duration: req.body.duration,
		});
		await track.save();

		return res.status(201).send(track);
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return res.status(422).send(e);
		}
		next(e);
	}
});

export default tracksRouter;
