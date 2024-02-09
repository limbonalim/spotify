import {Router} from 'express';
import mongoose, {Types} from 'mongoose';
import Track from '../models/tracksSchema';
import {ITrackPostData} from '../types';


const tracksRouter = Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    let result;
    if (req.query.album) {
      let albumId: Types.ObjectId;
      try {
        albumId = new Types.ObjectId(req.query.album as string);
      } catch {
        return res.status(404).send({error: 'Wrong ObjectId!'});
      }

      result = await Track.find({album: albumId});
    } else {
      result = await Track.find();
    }

    if (!result[0]) {
      return res.status(404).send({error: 'Not found'});
    }
    return res.send(result);
  } catch (e) {
    next(e)
  }
});

tracksRouter.post('/', async (req, res, next) => {
  try {
    const postData: ITrackPostData = {
      title: req.body.title,
      album: req.body.album,
      duration: req.body.duration,
    };
     const track = new Track(postData);
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