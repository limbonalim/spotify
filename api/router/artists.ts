import { Router } from 'express';
import mongoose, { Types } from 'mongoose';
import Artist from '../models/artistsSchema';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import User, { Roles } from '../models/usersSchema';
import check from '../middleware/check';

const artistsRouter = Router();

artistsRouter.get('/', check, async (req: RequestWithUser, res, next) => {
	try {
		const user = req.user;
		let result;

		if (user) {
			result = await Artist.find({ isPublished: true });
			const userPosts = await Artist.find({
				creator: user._id,
				isPublished: false,
			});
			result = [...userPosts, ...result];
		} else {
			result = await Artist.find({ isPublished: true });
		}

		if (!result[0]) {
			return res.status(404).send({ message: 'Not found' });
		}
		return res.send(result);
	} catch (e) {
		next(e);
	}
});

artistsRouter.post(
	'/',
	auth,
	imagesUpload.single('photo'),
	async (req: RequestWithUser, res, next) => {
		const user = req.user;

		try {
			const artist = new Artist({
				name: req.body.name,
				photo: req.file ? `images/${req.file.filename}` : '',
				info: req.body.info,
				creator: user?._id,
			});

			await artist.save();
			return res.status(201).send(artist);
		} catch (e) {
			if (e instanceof mongoose.Error.ValidationError) {
				return res.status(422).send(e);
			}
			next(e);
		}
	},
);

artistsRouter.delete(
	'/:id',
	auth,
	permit(Roles.admin),
	async (req, res, next) => {
		try {
			let artistId;
			try {
				artistId = new Types.ObjectId(req.params.id as string);
			} catch {
				return res.status(404).send({ message: 'Wrong artist ObjectId!' });
			}

			const artist = await Artist.findOneAndDelete(artistId);

			return res.send({ message: 'Success', artist });
		} catch (e) {
			next(e);
		}
	},
);

artistsRouter.patch(
	'/:id/togglePublished',
	auth,
	permit(Roles.admin),
	async (req, res, next) => {
		try {
			let artistId;
			try {
				artistId = new Types.ObjectId(req.params.id as string);
			} catch {
				return res.status(404).send({ message: 'Wrong artist ObjectId!' });
			}

			const oldData = await Artist.findById(artistId);
			if (!oldData) {
				return res.status(404).send({ message: 'Not found!' });
			}

			await Artist.findByIdAndUpdate(artistId, {
				isPublished: !oldData.isPublished,
			});

			return res.send({ message: 'Success' });
		} catch (e) {
			next(e);
		}
	},
);

export default artistsRouter;
