import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import artistsRouter from './router/artists';

const app = express();
const port = 8000;

app.use(json());
app.use(cors());

app.use('/artists', artistsRouter);


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