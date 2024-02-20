import { Router } from 'express';
import mongoose, { Types } from 'mongoose';
import { imagesUpload } from '../multer';
import Album from '../models/albumsSchema';

const albumsRouter = Router();

albumsRouter.get('/', async (req, res, next) => {
	try {
		if (req.query.artist) {
			let artistId: Types.ObjectId;
			try {
				artistId = new Types.ObjectId(req.query.artist as string);
			} catch {
				return res.status(404).send({ error: 'Wrong ObjectId!' });
			}

			const result = await Album.find({ artist: artistId });
			return res.send(result);
		}

		const result = await Album.find();
		return res.send(result);
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
			return res.status(404).send({ error: 'Wrong ObjectId!' });
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

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
	try {
		const album = new Album({
			title: req.body.title,
			year: parseInt(req.body.year),
			artist: req.body.artist,
			image: req.file ? `images/${req.file.filename}` : '',
		});

		await album.save();
		return res.status(201).send(album);
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return res.status(422).send(e);
		}
		next(e);
	}
});

export default albumsRouter;
