import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IMyError, ITrack} from '../../types';
import {getTracks} from './tracksThunks.ts';
import { RootState } from '../../app/store.ts';


interface TracksState {
  tracks: ITrack[];
  isLoading: boolean;
  errorMessage: IMyError | undefined;
  currentTrack: string | null;
}

const initialState: TracksState = {
  tracks: [],
  isLoading: false,
  errorMessage: undefined,
  currentTrack: null,
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    getCurrentTrack: (state, {payload: url}: PayloadAction<string>) => {
      state.currentTrack = url;
    },
    clearCurrentTrack: (state) => {
      state.currentTrack = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(getTracks.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = undefined;
    }).addCase(getTracks.fulfilled, (state, {payload: tracks}) => {
      state.isLoading = false;
      state.tracks = tracks;
    }).addCase(getTracks.rejected, (state, {payload: error}) => {
      state.isLoading = false;
      state.errorMessage = error;
    });
  }
});

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectIsLoading = (state: RootState) => state.tracks.isLoading;
export const selectErrorMessage = (state: RootState) => state.tracks.errorMessage;
export const selectCurrentTrack = (state: RootState) => state.tracks.currentTrack;

export const tracksReducer = tracksSlice.reducer;

export const {getCurrentTrack, clearCurrentTrack} = tracksSlice.actions;