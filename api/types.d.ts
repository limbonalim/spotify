import {Model, Schema} from 'mongoose';

export interface IArtistPostData {
  name: string;
  photo: string | null;
  info: string;
}

export interface IAlbumPostData {
  title: string;
  year: string;
  artist: string;
  image: string | null;
}

export interface ITrackPostData {
  title: string;
  album: string;
  duration: string;
}

export interface IUserFields {
  username: string;
  password: string;
  token: string;
}

export interface IUserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type IUserModel = Model<IUserFields, {}, IUserMethods>;

export interface ITrackHistoryFields {
  user: string;
  track: string;
  datetime: Date;
}

export type ITrackHistoryModel = Model<ITrackHistoryFields, {}, {}>;

export interface ITrackFields {
  title: string;
  album: Schema.Types.ObjectId;
  duration: string;
}

export type ITrackModel = Model<ITrackFields, {}, {}>;

export interface IArtistFields {
  name: string;
  photo?: string;
  info?: string;
}

export type IArtistModel = Model<IArtistFields, {}, {}>;

export interface IAlbumsFields {
  title: string;
  year: string;
  artist: Schema.Types.ObjectId;
  image?: string;
}

export type IAlbumsModel = Model<IAlbumsFields, {}, {}>;