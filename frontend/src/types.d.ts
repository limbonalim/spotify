export interface IArtist {
  _id: string;
  name: string;
  photo?: string;
  info?: string;
}

export interface IMyError {
  error: string;
}

export interface IAlbum {
  _id: string;
  title: string;
  year: number;
  image?: string;
}

export interface ITrack {
  _id: string;
  title: string;
  album: string;
  numberInAlbum: number;
  duration: string;
}