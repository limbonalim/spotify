import { Router } from 'express';
import mongoose from 'mongoose';
import User from '../models/usersSchema';

const usersRouter = Router();

usersRouter.post('/', async (req, res, next) => {
	try {
		if (req.body.username && req.body.password) {
			const user = new User({
				username: req.body.username,
				password: req.body.password,
			});
			user.generateToken();
			await user.save();
			return res.send(user);
		}

		return res
			.status(400)
			.send({ message: 'username and password should be in request' });
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return res.status(422).send(e);
		}

		next(e);
	}
});

usersRouter.post('/sessions', async (req, res, next) => {
	try {
		if (req.body.username && req.body.password) {
			const user = await User.findOne({ username: req.body.username });

			if (!user) {
				return res
					.status(422)
					.send({ message: 'Username and/or password not found!' });
			}
			const isMatch = await user.checkPassword(req.body.password);

			if (!isMatch) {
				return res
					.status(422)
					.send({ message: 'Username and/or password not found!' });
			}

			user.generateToken();
			await user.save();

			return res.send(user);
		}

		return res
			.status(400)
			.send({ message: 'username and password should be in request' });
	} catch (e) {
		next(e);
	}
});

usersRouter.delete('/sessions', async (req, res, next) => {
	try {
		const headerValue = req.get('Authorization');
		const success = { message: 'Success' };

		if (!headerValue) return res.send(success);

		const [_bearer, token] = headerValue ? headerValue.split(' ') : '';

		if (!token) return res.send(success);

		const user = await User.findOne({ token });

		if (!user) return res.send(success);

		user.generateToken();

		user.save();
		return res.send(success);
	} catch (e) {
		next(e);
	}
});

export default usersRouter;
