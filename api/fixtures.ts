import mongoose from 'mongoose';
import config from './config';
import Artist from './models/artistsSchema';
import Album from './models/albumsSchema';
import Track from './models/tracksSchema';
import TrackHistory from './models/trackHistorySchema';
import User, { Roles } from './models/usersSchema';

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

	const models = [TrackHistory, Album, Artist, Track, User];

	for (const model of models) {
		await dropCollection(db, model.collection.collectionName);
	}

	const [admin, user] = await User.create(
		{
			email: 'Admin',
			password: '123321',
			displayName: 'SuperAdmin',
			token: crypto.randomUUID(),
			role: Roles.admin,
		},
		{
			email: 'User',
			password: '123321',
			displayName: 'SuperUser',
			token: crypto.randomUUID(),
			role: Roles.user,
		},
	);

	const [artistOne, artistTwo, artistThree] = await Artist.create(
		{
			name: 'MiyaGi',
			photo: 'fixtures/fixturesArtistOne.webp',
			info: 'Miyagi & Andy Panda (также Эндшпиль) — российский хип-хоп дуэт из города Владикавказ.',
			isPublished: true,
			creator: admin,
		},
		{
			name: 'Rammstein',
			photo: 'fixtures/fixturesArtistTwo.jpeg',
			info: 'Rammstein — немецкая метал-группа, образованная в январе 1994 года в Берлине.',
			isPublished: true,
			creator: admin,
		},
		{
			name: 'Linkin Park',
			photo: 'fixtures/ArtistThree.webp',
			info: 'Linkin Park — американская рок-группа, основанная в 1996 году под названием Xero и исполняющая музыку преимущественно в стилях альтернативный метал, ню-метал и рэп-метал, альтернативный рок, электроник-рок, поп и поп-рок.',
			isPublished: false,
			creator: user,
		},
	);

	const [
		albumOneArtistOne,
		albumTwoArtistOne,
		albumOneArtistTwo,
		albumTwoArtistTwo,
		albumOneArtistThree,
	] = await Album.create(
		{
			title: 'Yamakasi',
			year: 2020,
			artist: artistOne,
			image: 'fixtures/AlbumOneArtistOne.jpeg',
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Buster Keaton',
			year: 2019,
			artist: artistOne,
			image: 'fixtures/AlbumTwoA2.jpeg',
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Mutter',
			year: 2001,
			artist: artistTwo,
			image: 'fixtures/Album1Artist2.jpeg',
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Zeit',
			year: 2022,
			artist: artistTwo,
			image: 'fixtures/Album2Artist2.jpeg',
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Meteora',
			year: 2003,
			artist: artistThree,
			image: 'fixtures/Album1Artist3.jpeg',
			isPublished: false,
			creator: user,
		},
	);

	await Track.create(
		{
			title: 'Atlant',
			album: albumOneArtistOne,
			duration: '03:07',
			url: 'https://www.youtube.com/watch?v=uzomp5p16zY&ab_channel=Hajime',
			numberInAlbum: 1,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Utopia',
			album: albumOneArtistOne,
			duration: '03:29',
			url: 'https://www.youtube.com/watch?v=ZReLVZVirLE&ab_channel=Hajime',
			numberInAlbum: 2,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Психопатия',
			album: albumOneArtistOne,
			duration: '03:29',
			url: 'https://www.youtube.com/watch?v=D2FKjZMV3wI&ab_channel=Hajime',
			numberInAlbum: 3,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Там ревели горы',
			album: albumOneArtistOne,
			duration: '02:57',
			url: 'https://www.youtube.com/watch?v=MzI_CIYSsfQ&ab_channel=Hajime',
			numberInAlbum: 4,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Tantra',
			album: albumOneArtistOne,
			duration: '04:16',
			url: 'https://www.youtube.com/watch?v=j5wVGQQ5e5A&ab_channel=Hajime',
			numberInAlbum: 5,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Capitan',
			album: albumTwoArtistOne,
			duration: '03:35',
			url: 'https://www.youtube.com/watch?v=UJ3COIHd954&ab_channel=Hajime',
			numberInAlbum: 1,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Sorry',
			album: albumTwoArtistOne,
			duration: '03:15',
			url: 'https://www.youtube.com/watch?v=ZCrqb5PY0Gc&ab_channel=Hajime',
			numberInAlbum: 2,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Bismarck',
			album: albumTwoArtistOne,
			duration: '03:39',
			url: 'https://www.youtube.com/watch?v=DKjkVFl2i3A&ab_channel=Hajime',
			numberInAlbum: 3,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Try',
			album: albumTwoArtistOne,
			duration: '04:29',
			url: 'https://www.youtube.com/watch?v=zIrZGTMHlFg&ab_channel=Hajime',
			numberInAlbum: 4,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Корабли',
			album: albumTwoArtistOne,
			duration: '02:52',
			url: 'https://www.youtube.com/watch?v=56gB-rro5rQ&ab_channel=Hajime',
			numberInAlbum: 5,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Feuer frei!',
			album: albumOneArtistTwo,
			duration: '03:11',
			url: 'https://www.youtube.com/watch?v=ZkW-K5RQdzo&ab_channel=RammsteinOfficial',
			numberInAlbum: 1,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Sonne',
			album: albumOneArtistTwo,
			duration: '04:33',
			url: 'https://www.youtube.com/watch?v=StZcUAPRRac&ab_channel=RammsteinOfficial',
			numberInAlbum: 2,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Ich will',
			album: albumOneArtistTwo,
			duration: '03:37',
			url: 'https://www.youtube.com/watch?v=EOnSh3QlpbQ&ab_channel=RammsteinOfficial',
			numberInAlbum: 3,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Mutter',
			album: albumOneArtistTwo,
			duration: '04:29',
			url: 'https://www.youtube.com/watch?v=gNdnVVHfseA&ab_channel=RammsteinOfficial',
			numberInAlbum: 4,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Zwitter',
			album: albumOneArtistTwo,
			duration: '04:18',
			url: 'https://www.youtube.com/watch?v=p2YyD4-alCY&ab_channel=Morgoth',
			numberInAlbum: 5,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Zeit',
			album: albumTwoArtistTwo,
			duration: '06:20',
			url: 'https://www.youtube.com/watch?v=EbHGS_bVkXY&ab_channel=RammsteinOfficial',
			numberInAlbum: 1,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Angst',
			album: albumTwoArtistTwo,
			duration: '05:45',
			url: 'https://www.youtube.com/watch?v=ONj9cvHCado&ab_channel=RammsteinOfficial',
			numberInAlbum: 2,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Ok',
			album: albumTwoArtistTwo,
			duration: '04:18',
			url: 'https://www.youtube.com/watch?v=KCdZ_W-pZxM&ab_channel=KlopiPlay',
			numberInAlbum: 3,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Zick Zack',
			album: albumTwoArtistTwo,
			duration: '04:35',
			url: 'https://www.youtube.com/watch?v=hBTNyJ33LWI&ab_channel=RammsteinOfficial',
			numberInAlbum: 4,
			isPublished: true,
			creator: admin,
		},
		{
			title: 'Armee der Tristen',
			album: albumTwoArtistTwo,
			duration: '03:26',
			url: 'https://www.youtube.com/watch?v=3MW7bGnV-RM&ab_channel=KlopiPlay',
			numberInAlbum: 5,
			isPublished: true,
			creator: admin,
		},
		{
			title: "don't stay",
			album: albumOneArtistThree,
			duration: '03:08',
			url: 'https://www.youtube.com/watch?v=oWfGOVWrueo',
			numberInAlbum: 1,
			isPublished: false,
			creator: user,
		},
		{
			title: 'easier to run',
			album: albumOneArtistThree,
			duration: '03:26',
			url: 'https://www.youtube.com/watch?v=U5zdmjVeQzE',
			numberInAlbum: 2,
			isPublished: false,
			creator: user,
		},
		{
			title: 'Numb',
			album: albumOneArtistThree,
			duration: '03:08',
			url: 'https://www.youtube.com/watch?v=kXYiU_JCYtU',
			numberInAlbum: 3,
			isPublished: false,
			creator: user,
		},
	);

	await db.close();
};

void run();
