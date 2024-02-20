import { createSlice } from '@reduxjs/toolkit';
import {getArtists} from './artistsThunks.ts';
import {RootState} from '../../app/store.ts';
import type {IArtist, IMyError} from '../../types';

interface IArtistsState {
  artists: IArtist[];
  isLoading: boolean;
  errorMessage: IMyError | null;
}

const initialState: IArtistsState = {
  artists: [],
  isLoading: false,
  errorMessage: null,
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getArtists.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    }).addCase(getArtists.fulfilled, (state, {payload: artists}) => {
      state.isLoading = false;
      state.artists = artists;
    }).addCase(getArtists.rejected, (state, {payload: error}) => {
      state.isLoading = false;
      state.errorMessage = error || null;
    });
  }
});

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectIsLoading = (state: RootState) => state.artists.isLoading;
export const selectErrorMessage = (state: RootState) => state.artists.errorMessage;

export const artistsReducer = artistsSlice.reducer;
