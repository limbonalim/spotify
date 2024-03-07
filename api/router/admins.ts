import { Router } from 'express';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { Roles } from '../models/usersSchema';
import Artist from '../models/artistsSchema';
import Album from '../models/albumsSchema';
import Track from '../models/tracksSchema';

const adminsRouter = Router();

adminsRouter.get('/', auth, permit(Roles.admin), async (req, res, next) => {
	try {
		const artists = await Artist.find({ isPublished: false });
		const albums = await Album.find({ isPublished: false });
		const tracks = await Track.find({ isPublished: false });

		return res.send({ artists, albums, tracks });
	} catch (e) {
		next(e);
	}
});

export default adminsRouter;
