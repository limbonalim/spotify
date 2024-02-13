import {Schema, model, Types} from 'mongoose';
import Artist from './artistsSchema';
import type {IAlbumsFields, IAlbumsModel} from '../types';

const albumsSchema = new Schema<IAlbumsFields, IAlbumsModel, {}>({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'artists',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
      message: 'Artist does not exist!'
    }
  },
  image: String,
});

const Album = model<IAlbumsFields, IAlbumsModel>('albums', albumsSchema);

export default Album;