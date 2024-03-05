import { Router } from 'express';
import mongoose, { Types } from 'mongoose';
import Artist from '../models/artistsSchema';
import { imagesUpload } from '../multer';
import auth from '../middleware/auth';
import permit from '../middleware/permit';

const artistsRouter = Router();

artistsRouter.get('/', async (req, res, next) => {
	try {
		const result = await Artist.find();

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
	async (req, res, next) => {
		try {
			const artist = new Artist({
				name: req.body.name,
				photo: req.file ? `images/${req.file.filename}` : '',
				info: req.body.info,
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

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
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
});

export default artistsRouter;
