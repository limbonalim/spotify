export interface IArtist {
  _id: string;
  name: string;
  photo?: string;
  info?: string;
  isPublished: boolean;
}

export interface IMyError {
  message: string;
}

export interface IAlbum {
  _id: string;
  title: string;
  year: number;
  image?: string;
  isPublished: boolean;
}

export interface ITrack {
  _id: string;
  title: string;
  album: string;
  numberInAlbum: number;
  url?: string;
  duration: string;
  isPublished: boolean;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface IRegisterForm {
  username: string;
  password: string;
}

export interface ILoginForm {
  username: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  role: string;
  token: string;
}

export interface ITrackHistory {
  _id: string;
  track: ITrackMutation;
  datetime: string;
}

type IArtistMutation = Pick<IArtist, '_id', 'name'>;

interface IAlbumMutation extends IAlbum {
  artist: IArtistMutation;
}

interface ITrackMutation {
  _id: string;
  title: string;
  album: IAlbumMutation;
  numberInAlbum: number;
  url?: string;
  duration: string;
}

export interface IArtistFormState {
  name: string;
  info: string;
  photo: File | null;
}

export interface IAlbumFormState {
  title: string;
  year: string;
  artist: string;
  image: File | null;
}

export interface IAdminData {
  artists: IArtist[],
  albums: IAlbum[],
  tracks: ITrack[]
}