import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import {
  deleteAlbum,
  deleteArtist,
  deleteTrack,
  getAdminData,
  publicateAlbum,
  publicateArtist, publicateTrack
} from './adminsThunks.ts';
import { IAlbum, IArtist, IMyError, ITrack } from '../../types';


interface IAdminsState {
  current: string | null
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
  isLoading: boolean;
  error: string | null;
  isPublicateArtistLoading: boolean;
  isPublicateAlbumLoading: boolean;
  isPublicateTrackLoading: boolean;
  isDeleteArtistLoading: boolean;
  isDeleteAlbumLoading: boolean;
  isDeleteTrackLoading: boolean;
  publicateArtistError: IMyError | null;
  publicateAlbumError: IMyError | null;
  publicateTrackError: IMyError | null;
  deleteArtistError: IMyError | null;
  deleteAlbumError: IMyError | null;
  deleteTrackError: IMyError | null;

}

const initialState: IAdminsState = {
  current: null,
  artists: [],
  albums: [],
  tracks: [],
  isLoading: false,
  error: null,
  isPublicateArtistLoading: false,
  isPublicateAlbumLoading: false,
  isPublicateTrackLoading: false,
  isDeleteArtistLoading: false,
  isDeleteAlbumLoading: false,
  isDeleteTrackLoading: false,
  publicateArtistError: null,
  publicateAlbumError: null,
  publicateTrackError: null,
  deleteArtistError: null,
  deleteAlbumError: null,
  deleteTrackError: null,
};

const adminsSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    getCurrent: (state, {payload: item}) => {
      state.current = item;
    },
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(getAdminData.pending, (state) => {
      state.isLoading = true;
      state.artists = [];
      state.albums = [];
      state.tracks = [];
    }).addCase(getAdminData.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.artists = payload?.artists || [];
      state.albums = payload?.albums || [];
      state.tracks = payload?.tracks || [];
    }).addCase(getAdminData.rejected, (state,{error}) => {
      state.isLoading = false;
      state.error = error.message || null;
    });

    builder.addCase(publicateArtist.pending, (state) => {
      state.isPublicateArtistLoading = true;
      state.publicateArtistError = null;
    }).addCase(publicateArtist.fulfilled, (state) => {
      state.isPublicateArtistLoading = false;
    }).addCase(publicateArtist.rejected, (state, {payload: error}) => {
      state.isPublicateArtistLoading = false;
      state.publicateArtistError = error || null;
    });

    builder.addCase(deleteArtist.pending, (state) => {
      state.isDeleteArtistLoading = false;
      state.deleteArtistError = null;
    }).addCase(deleteArtist.fulfilled, (state) => {
      state.isDeleteArtistLoading = false;
    }).addCase(deleteArtist.rejected, (state, {payload: error}) => {
      state.isDeleteArtistLoading = false;
      state.deleteArtistError = error || null;
    });

    builder.addCase(publicateAlbum.pending, (state) => {
      state.isDeleteAlbumLoading = false;
      state.deleteAlbumError = null;
    }).addCase(publicateAlbum.fulfilled, (state) => {
      state.isDeleteAlbumLoading = false;
    }).addCase(publicateAlbum.rejected, (state, {payload: error}) => {
      state.isDeleteAlbumLoading = false;
      state.deleteAlbumError = error || null;
    });

    builder.addCase(deleteAlbum.pending, (state) => {
      state.isDeleteAlbumLoading = false;
      state.deleteAlbumError = null;
    }).addCase(deleteAlbum.fulfilled, (state) => {
      state.isDeleteAlbumLoading = false;
    }).addCase(deleteAlbum.rejected, (state, {payload: error}) => {
      state.isDeleteAlbumLoading = false;
      state.deleteAlbumError = error || null;
    });

    builder.addCase(publicateTrack.pending, (state) => {
      state.isDeleteTrackLoading = false;
      state.deleteTrackError = null;
    }).addCase(publicateTrack.fulfilled, (state) => {
      state.isDeleteArtistLoading = false;
    }).addCase(publicateTrack.rejected, (state, {payload: error}) => {
      state.isDeleteTrackLoading = false;
      state.deleteTrackError = error || null;
    });

    builder.addCase(deleteTrack.pending, (state) => {
      state.isDeleteTrackLoading = false;
      state.deleteTrackError = null;
    }).addCase(deleteTrack.fulfilled, (state) => {
      state.isDeleteTrackLoading = false;
    }).addCase(deleteTrack.rejected, (state, {payload: error}) => {
      state.isDeleteTrackLoading = false;
      state.deleteTrackError = error || null;
    });
  }
});

export const selectArtists = (state: RootState) => state.admins.artists;
export const selectCurrent = (state: RootState) => state.admins.current;
export const selectAlbums = (state: RootState) => state.admins.albums;
export const selectTracks = (state: RootState) => state.admins.tracks;
export const selectIsLoading = (state: RootState) => state.admins.isLoading;
export const selectError = (state: RootState) => state.admins.error;

export const selectIsPublicateArtistLoading = (state: RootState) => state.admins.isPublicateArtistLoading;
export const selectIsDeleteArtistLoading = (state: RootState) => state.admins.isDeleteArtistLoading;
export const selectPublicateArtistError = (state: RootState) => state.admins.publicateArtistError;
export const selectDeleteArtistError = (state: RootState) => state.admins.deleteArtistError;

export const selectIsPublicateAlbumLoading = (state: RootState) => state.admins.isPublicateAlbumLoading;
export const selectIsDeleteAlbumLoading = (state: RootState) => state.admins.isDeleteAlbumLoading;
export const selectPublicateAlbumError = (state: RootState) => state.admins.publicateAlbumError;
export const selectDeleteAlbumError = (state: RootState) => state.admins.deleteAlbumError;

export const selectIsPublicateTrackLoading = (state: RootState) => state.admins.isPublicateTrackLoading;
export const selectIsDeleteTrackLoading = (state: RootState) => state.admins.isDeleteTrackLoading;
export const selectPublicateTrackError = (state: RootState) => state.admins.publicateTrackError;
export const selectDeleteTrackError = (state: RootState) => state.admins.deleteTrackError;



export const {getCurrent, clearCurrent} = adminsSlice.actions;

export const adminsReducer = adminsSlice.reducer;