import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { createAlbum, getAlbums } from './albumsThunks.ts';
import {RootState} from '../../app/store.ts';
import type { IAlbum, IMyError, ValidationError } from '../../types';

interface AlbumState {
  albums: IAlbum[];
  currentAlbum: IAlbum | null;
  isLoading: boolean;
  errorMessage: IMyError | undefined;
  isCreateLoading: boolean;
  createError: ValidationError | null
}

const initialState: AlbumState = {
  albums: [],
  currentAlbum: null,
  isLoading: false,
  errorMessage: undefined,
  isCreateLoading: false,
  createError: null,
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

    builder.addCase(createAlbum.pending, (state) => {
      state.isCreateLoading = true;
      state.createError = null;
    }).addCase(createAlbum.fulfilled, (state) => {
      state.isCreateLoading = false;
    }).addCase(createAlbum.rejected, (state, {payload: error}) => {
      state.isCreateLoading = false;
      state.createError = error || null;
    });
  }
});

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectIsLoading = (state: RootState) => state.albums.isLoading;
export const selectCurrentAlbum = (state: RootState) => state.albums.currentAlbum;
export const selectErrorMessage = (state: RootState) => state.albums.errorMessage;
export const selectIsCreateLoading = (state: RootState) => state.albums.isCreateLoading;
export const selectCreateError = (state: RootState) => state.albums.createError;

export const albumReducer = albumsSlice.reducer;

export const {getCurrentAlbum} = albumsSlice.actions;