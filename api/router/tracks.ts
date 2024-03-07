import { Router } from 'express';
import mongoose, { Types } from 'mongoose';
import Track from '../models/tracksSchema';
import Album from '../models/albumsSchema';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { Roles } from '../models/usersSchema';
import check, { RequestWithUser } from '../middleware/check';

const tracksRouter = Router();

tracksRouter.get('/', check, async (req: RequestWithUser, res, next) => {
	try {
		const user = req.user;

		if (req.query.album) {
			let albumId: Types.ObjectId;
			let result;
			try {
				albumId = new Types.ObjectId(req.query.album as string);
			} catch {
				return res.status(404).send({ message: 'Wrong album ObjectId!' });
			}

			if (user) {
				result = await Track.find({ album: albumId, isPublished: true }, null, {
					sort: { numberInAlbum: 1 },
				});

				const userPosts = await Track.find(
					{ album: albumId, creator: user._id, isPublished: false },
					null,
					{
						sort: { numberInAlbum: 1 },
					},
				);

				result = [...result, ...userPosts].sort(
					(a, b) => b.numberInAlbum - a.numberInAlbum,
				);
			} else {
				result = await Track.find({ album: albumId, isPublished: true }, null, {
					sort: { numberInAlbum: 1 },
				});
			}

			if (!result[0]) {
				return res.status(404).send({ message: 'Not found' });
			}
			return res.send(result);
		} else if (req.query.artist) {
			let artistId: Types.ObjectId;
			try {
				artistId = new Types.ObjectId(req.query.artist as string);
			} catch {
				return res.status(404).send({ message: 'Wrong artist ObjectId!' });
			}
			const albums = await Album.find({ artist: artistId, isPublished: true });

			if (albums) {
				const albumIdArr = albums.map((item) => item._id);
				return Promise.all(
					albumIdArr.map(async (item) => {
						return Promise.resolve(
							Track.find({ album: item, isPublished: true }),
						);
					}),
				).then((data) => {
					data.forEach((item) => [...item]);
					return res.send(data);
				});
			}

			return res.status(404).send({ message: 'Not found!' });
		}
	} catch (e) {
		next(e);
	}
});

tracksRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
	try {
		const user = req.user;
		let numberInAlbum = 1;
		const tracksInAlbum = await Track.find({ album: req.body.album });

		if (tracksInAlbum.length > 0) {
			numberInAlbum = tracksInAlbum.length + 1;
		}

		const track = new Track({
			title: req.body.title,
			album: req.body.album,
			numberInAlbum,
			url: req.body.url,
			duration: req.body.duration,
			creator: user?._id,
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

tracksRouter.delete(
	'/:id',
	auth,
	permit(Roles.admin),
	async (req, res, next) => {
		try {
			let trackId: Types.ObjectId;
			try {
				trackId = new Types.ObjectId(req.params.id as string);
			} catch {
				return res.status(404).send({ message: 'Wrong track ObjectId!' });
			}

			const track = await Track.findOneAndDelete(trackId);
			return res.send({ message: 'Success', track });
		} catch (e) {
			next(e);
		}
	},
);

tracksRouter.patch(
	'/:id/togglePublished',
	auth,
	permit(Roles.admin),
	async (req, res, next) => {
		try {
			let trackId;
			try {
				trackId = new Types.ObjectId(req.params.id as string);
			} catch {
				return res.status(404).send({ message: 'Wrong track ObjectId!' });
			}

			const oldData = await Track.findById(trackId);
			if (!oldData) {
				return res.status(404).send({ message: 'Not found!' });
			}

			await Track.findByIdAndUpdate(trackId, {
				isPublished: !oldData.isPublished,
			});

			return res.send({ message: 'Success' });
		} catch (e) {
			next(e);
		}
	},
);

export default tracksRouter;
