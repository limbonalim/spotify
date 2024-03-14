import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config';
import artistsRouter from './router/artists';
import albumsRouter from './router/albums';
import tracksRouter from './router/tracks';
import usersRouter from './router/users';
import trackHistoryRouter from './router/trackHistory';
import adminsRouter from './router/admins';

const app = express();

app.use(json());
app.use(express.static('public'));
app.use(cors());

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/track_history', trackHistoryRouter);
app.use('/admins', adminsRouter);

const run = async () => {
	await mongoose.connect(config.mongoose);

	app.listen(config.port, () => {
		console.log(`Server started on ${config.port} port!`);
	});

	process.on('exit', () => {
		mongoose.disconnect();
	});
};

void run();
