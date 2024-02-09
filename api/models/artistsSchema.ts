import {Schema, model} from 'mongoose';

const artistsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photo: String,
  info: String,
});

const Artist = model('artists', artistsSchema);

export default Artist;