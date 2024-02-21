import {createSlice} from '@reduxjs/toolkit';
import {getAlbums} from './albumsThunk.ts';
import {RootState} from '../../app/store.ts';
import type {IAlbum, IMyError} from '../../types';

interface AlbumState {
  albums: IAlbum[];
  isLoading: boolean;
  errorMessage: IMyError | undefined;
}

const initialState: AlbumState = {
  albums: [],
  isLoading: false,
  errorMessage: undefined,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
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

export const albumReducer = albumsSlice.reducer;