import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createArtist, getArtists } from './artistsThunks.ts';
import { RootState } from '../../app/store.ts';
import type { IArtist, IMyError, ValidationError } from '../../types';

interface IArtistsState {
  artists: IArtist[];
  isLoading: boolean;
  errorMessage: IMyError | null;
  currentArtist: IArtist | null;
  isCreateLoading: boolean;
  createError: ValidationError | null;
}

const initialState: IArtistsState = {
  artists: [],
  isLoading: false,
  errorMessage: null,
  currentArtist: null,
  isCreateLoading: false,
  createError: null,
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    getArtist: (state, {payload: id}: PayloadAction<string>) => {
      const index = state.artists.findIndex((item) => item._id === id);
      if (index >= 0) {
        state.currentArtist = state.artists[index];
      } else {
        state.currentArtist = null;
      }
    },
  },
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

    builder.addCase(createArtist.pending, (state) => {
      state.isCreateLoading = true;
      state.createError = null;
    }).addCase(createArtist.fulfilled, (state) => {
      state.isCreateLoading = false;
    }).addCase(createArtist.rejected, (state, {payload: error}) => {
      state.isCreateLoading = false;
      state.createError = error || null;
    });
  }
});

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectIsLoading = (state: RootState) => state.artists.isLoading;
export const selectErrorMessage = (state: RootState) => state.artists.errorMessage;
export const selectCurrentArtist = (state: RootState) => state.artists.currentArtist;
export const selectIsCreateLoading = (state: RootState) => state.artists.isCreateLoading;
export const selectCreateError = (state: RootState) => state.artists.createError;

export const artistsReducer = artistsSlice.reducer;

export const {getArtist} = artistsSlice.actions;
