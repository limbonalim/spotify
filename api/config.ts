import path from 'path';
import { config as envConfig } from 'dotenv';

envConfig();
const rootPath = __dirname;

const config = {
	rootPath,
	publicPath: path.join(rootPath, 'public'),
	mongoose: 'mongodb://localhost/spotify',
	google: {
		clientId: process.env['GOOGLE_CLIENT_ID'],
		clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
	},
};

export default config;
