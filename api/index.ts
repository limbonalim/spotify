import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import artistsRouter from './router/artists';
import albumsRouter from './router/albums';
import tracksRouter from './router/tracks';
import usersRouter from './router/users';
import trackHistoryRouter from './router/trackHistory';

const app = express();
const port = 8000;

app.use(json());
app.use(cors());

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/track_history', trackHistoryRouter);

const run = async () => {
  await mongoose.connect('mongodb://localhost/spotify');

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();