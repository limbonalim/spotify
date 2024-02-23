export interface IArtist {
  _id: string;
  name: string;
  photo?: string;
  info?: string;
}

export interface IMyError {
  message: string;
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
  token: string;
}