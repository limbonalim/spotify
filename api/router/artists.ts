import { Router } from 'express';
import mongoose from 'mongoose';
import Artist from '../models/artistsSchema';
import { imagesUpload } from '../multer';

const artistsRouter = Router();

artistsRouter.get('/', async (req, res, next) => {
	try {
		const result = await Artist.find();

		if (!result[0]) {
			return res.status(404).send({ error: 'Not found' });
		}
		return res.send(result);
	} catch (e) {
		next(e);
	}
});

artistsRouter.post(
	'/',
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

export default artistsRouter;
