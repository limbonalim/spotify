import { Router } from 'express';
import mongoose, { Types } from 'mongoose';
import { imagesUpload } from '../multer';
import Album from '../models/albumsSchema';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import { Roles } from '../models/usersSchema';
import check from '../middleware/check';

const albumsRouter = Router();

albumsRouter.get('/', check, async (req: RequestWithUser, res, next) => {
	try {
		const user = req.user;
		if (req.query.artist) {
			let artistId: Types.ObjectId;
			let result;
			try {
				artistId = new Types.ObjectId(req.query.artist as string);
			} catch {
				return res.status(404).send({ message: 'Wrong ObjectId!' });
			}

			if (user) {
				result = await Album.find(
					{ artist: artistId, isPublished: true },
					null,
					{
						sort: { year: -1 },
					},
				);
				const userPosts = await Album.find(
					{ artist: artistId, creator: user._id, isPublished: false },
					null,
					{
						sort: { year: -1 },
					},
				);

				result = [...result, ...userPosts].sort((a, b) => b.year - a.year);
			} else {
				result = await Album.find(
					{ artist: artistId, isPublished: true },
					null,
					{
						sort: { year: -1 },
					},
				);
			}

			return res.send(result);
		}
	} catch (e) {
		next(e);
	}
});

albumsRouter.get('/:id', async (req, res, next) => {
	try {
		let _id: Types.ObjectId;
		try {
			_id = new Types.ObjectId(req.params.id);
		} catch {
			return res.status(404).send({ message: 'Wrong ObjectId!' });
		}

		const result = await Album.findById(_id).populate(
			'artist',
			'name info photo',
		);
		res.send(result);
	} catch (e) {
		next(e);
	}
});

albumsRouter.post(
	'/',
	auth,
	imagesUpload.single('image'),
	async (req: RequestWithUser, res, next) => {
		const user = req.user;

		try {
			const album = new Album({
				title: req.body.title,
				year: parseInt(req.body.year),
				artist: req.body.artist,
				image: req.file ? `images/${req.file.filename}` : '',
				creator: user?._id,
			});

			await album.save();
			return res.status(201).send(album);
		} catch (e) {
			if (e instanceof mongoose.Error.ValidationError) {
				return res.status(422).send(e);
			}
			next(e);
		}
	},
);

albumsRouter.delete(
	'/:id',
	auth,
	permit(Roles.admin),
	async (req, res, next) => {
		try {
			let albumId;
			try {
				albumId = new Types.ObjectId(req.params.id as string);
			} catch {
				return res.status(404).send({ message: 'Wrong album ObjectId!' });
			}

			const album = await Album.findOneAndDelete(albumId);

			return res.send({ message: 'Success', artist: album });
		} catch (e) {
			next(e);
		}
	},
);

albumsRouter.patch(
	'/:id/togglePublished',
	auth,
	permit(Roles.admin),
	async (req, res, next) => {
		try {
			let albumId;
			try {
				albumId = new Types.ObjectId(req.params.id as string);
			} catch {
				return res.status(404).send({ message: 'Wrong album ObjectId!' });
			}

			const oldData = await Album.findById(albumId);
			if (!oldData) {
				return res.status(404).send({ message: 'Not found!' });
			}

			await Album.findByIdAndUpdate(albumId, {
				isPublished: !oldData.isPublished,
			});

			return res.send({ message: 'Success' });
		} catch (e) {
			next(e);
		}
	},
);

export default albumsRouter;
