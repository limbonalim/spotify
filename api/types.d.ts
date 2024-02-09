
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