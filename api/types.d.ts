import { Model, Schema } from 'mongoose';

export interface IUserFields {
	email: string;
	password: string;
	role: string;
	token: string;
	displayName: string;
	googleID?: string;
	avatar?: string;
}

export interface IUserMethods {
	checkPassword(password: string): Promise<boolean>;
	generateToken(): void;
}

export type IUserModel = Model<IUserFields, unknown, IUserMethods>;

export interface ITrackHistoryFields {
	user: Schema.Types.ObjectId;
	track: Schema.Types.ObjectId;
	datetime: Date;
}

export type ITrackHistoryModel = Model<ITrackHistoryFields, unknown, unknown>;

export interface ITrackFields {
	title: string;
	album: Schema.Types.ObjectId;
	numberInAlbum: number;
	url?: string;
	duration: string;
	isPublished: boolean;
	creator: Schema.Types.ObjectId;
}

export type ITrackModel = Model<ITrackFields, unknown, unknown>;

export interface IArtistFields {
	name: string;
	photo?: string;
	info?: string;
	isPublished: boolean;
	creator: Schema.Types.ObjectId;
}

export type IArtistModel = Model<IArtistFields, unknown, unknown>;

export interface IAlbumsFields {
	title: string;
	year: number;
	artist: Schema.Types.ObjectId;
	image?: string;
	isPublished: boolean;
	creator: Schema.Types.ObjectId;
}

export type IAlbumsModel = Model<IAlbumsFields, unknown, unknown>;
