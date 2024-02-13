import {Schema, model} from 'mongoose';
import {IArtistFields, IArtistModel} from "../types";

const artistsSchema = new Schema<IArtistFields, IArtistModel, {}>({
  name: {
    type: String,
    required: true,
  },
  photo: String,
  info: String,
});

const Artist = model<IArtistFields, IArtistModel>('artists', artistsSchema);

export default Artist;