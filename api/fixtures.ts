import mongoose from 'mongoose';
import config from './config';
import Artist from './models/artistsSchema';
import Album from './models/albumsSchema';
import Track from './models/tracksSchema';

const dropCollection = async (
	db: mongoose.Connection,
	collectionName: string,
) => {
	try {
		await db.dropCollection(collectionName);
	} catch (e) {
		console.log(`Collection ${collectionName} was missing, skipping drop`);
	}
};

const run = async () => {
	await mongoose.connect(config.mongoose);
	const db = mongoose.connection;

	const collections = [
		'trackhistories',
		'albums',
		'artists',
		'tracks',
		'users',
	];

	for (const collectionName of collections) {
		await dropCollection(db, collectionName);
	}

	const [aritstOne, artistTwo] = await Artist.create(
		{
			name: 'MiyaGi',
			photo: 'fixtures/fixturesArtistOne.webp',
			info: 'Miyagi & Andy Panda (также Эндшпиль) — российский хип-хоп дуэт из города Владикавказ.',
		},
		{
			name: 'Rammstein',
			photo: 'fixtures/fixturesArtistTwo.jpeg',
			info: 'Rammstein — немецкая метал-группа, образованная в январе 1994 года в Берлине.',
		},
	);

	const [
		albumOneArtistOne,
		albumTwoArtistOne,
		albumOneArtistTwo,
		albumTwoArtistTwo,
	] = await Album.create(
		{
			title: 'Yamakasi',
			year: 2020,
			artist: aritstOne,
			image: 'fixtures/AlbumOneArtistOne.jpeg',
		},
		{
			title: 'Buster Keaton',
			year: 2019,
			artist: aritstOne,
			image: 'fixtures/AlbumTwoA2.jpeg',
		},
		{
			title: 'Mutter',
			year: 2001,
			artist: artistTwo,
			image: 'fixtures/Album1Artist2.jpeg',
		},
		{
			title: 'Zeit',
			year: 2022,
			artist: artistTwo,
			image: 'fixtures/Album2Artist2.jpeg',
		},
	);

	await Track.create(
		{
			title: 'Atlant',
			album: albumOneArtistOne,
			duration: '03:07',
			numberInAlbum: 1,
		},
		{
			title: 'Utopia',
			album: albumOneArtistOne,
			duration: '03:29',
			numberInAlbum: 2,
		},
		{
			title: 'Психопатия',
			album: albumOneArtistOne,
			duration: '03:29',
			numberInAlbum: 3,
		},
		{
			title: 'Там ревели горы',
			album: albumOneArtistOne,
			duration: '02:57',
			numberInAlbum: 4,
		},
		{
			title: 'Tantra',
			album: albumOneArtistOne,
			duration: '04:16',
			numberInAlbum: 5,
		},
		{
			title: 'Capitan',
			album: albumTwoArtistOne,
			duration: '03:35',
			numberInAlbum: 1,
		},
		{
			title: 'Sorry',
			album: albumTwoArtistOne,
			duration: '03:15',
			numberInAlbum: 2,
		},
		{
			title: 'Bismarck',
			album: albumTwoArtistOne,
			duration: '03:39',
			numberInAlbum: 3,
		},
		{
			title: 'Try',
			album: albumTwoArtistOne,
			duration: '04:29',
			numberInAlbum: 4,
		},
		{
			title: 'Корабли',
			album: albumTwoArtistOne,
			duration: '02:52',
			numberInAlbum: 5,
		},
		{
			title: 'Feuer frei!',
			album: albumOneArtistTwo,
			duration: '03:11',
			numberInAlbum: 1,
		},
		{
			title: 'Sonne',
			album: albumOneArtistTwo,
			duration: '04:33',
			numberInAlbum: 2,
		},
		{
			title: 'Ich will',
			album: albumOneArtistTwo,
			duration: '03:37',
			numberInAlbum: 3,
		},
		{
			title: 'Mutter',
			album: albumOneArtistTwo,
			duration: '04:29',
			numberInAlbum: 4,
		},
		{
			title: 'Zwitter',
			album: albumOneArtistTwo,
			duration: '04:18',
			numberInAlbum: 5,
		},
		{
			title: 'Zeit',
			album: albumTwoArtistTwo,
			duration: '06:20',
			numberInAlbum: 1,
		},
		{
			title: 'Angst',
			album: albumTwoArtistTwo,
			duration: '05:45',
			numberInAlbum: 2,
		},
		{
			title: 'Ok',
			album: albumTwoArtistTwo,
			duration: '04:18',
			numberInAlbum: 3,
		},
		{
			title: 'Zick Zack',
			album: albumTwoArtistTwo,
			duration: '04:35',
			numberInAlbum: 4,
		},
		{
			title: 'Armee der Tristen',
			album: albumTwoArtistTwo,
			duration: '03:26',
			numberInAlbum: 5,
		},
	);

	await db.close();
};

void run();
