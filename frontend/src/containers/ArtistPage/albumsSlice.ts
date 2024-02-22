import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getAlbums} from './albumsThunks.ts';
import {RootState} from '../../app/store.ts';
import type {IAlbum, IMyError} from '../../types';

interface AlbumState {
  albums: IAlbum[];
  currentAlbum: IAlbum | null;
  isLoading: boolean;
  errorMessage: IMyError | undefined;
}

const initialState: AlbumState = {
  albums: [],
  currentAlbum: null,
  isLoading: false,
  errorMessage: undefined,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    getCurrentAlbum: (state, {payload: id}: PayloadAction<string>) => {
      const index = state.albums.findIndex((item) => item._id === id);
      if (index >=0) {
        state.currentAlbum = state.albums[index];
      }
      else {
        state.currentAlbum = null;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getAlbums.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = undefined;
    }).addCase(getAlbums.fulfilled, (state, {payload: albums}) => {
      state.isLoading = false;
      state.albums = albums;
    }).addCase(getAlbums.rejected, (state, {payload: error}) => {
      state.isLoading = false;
      state.errorMessage = error;
    });
  }
});

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectIsLoading = (state: RootState) => state.albums.isLoading;
export const selectCurrentAlbum = (state: RootState) => state.albums.currentAlbum;

export const albumReducer = albumsSlice.reducer;

export const {getCurrentAlbum} = albumsSlice.actions;