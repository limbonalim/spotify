import { createSlice } from '@reduxjs/toolkit';
import { createNewRecord, getTrackHistory } from './tracksHistoryThunks.ts';
import { RootState } from '../../app/store.ts';
import type { IMyError, ValidationError, ITrackHistory } from '../../types';

interface ITracksHistoryState {
  trackHistory: ITrackHistory[];
  isLoading: boolean;
  recordErrorMessage: IMyError | ValidationError | null;
  getErrorMessage: IMyError | null;
}

const initialState: ITracksHistoryState = {
  trackHistory: [],
  isLoading: false,
  recordErrorMessage: null,
  getErrorMessage: null,
};

const tracksHistorySlice = createSlice({
  name: 'tracksHistory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createNewRecord.pending, (state) => {
      state.recordErrorMessage = null;
    }).addCase(createNewRecord.rejected, (state, {payload: error}) => {
      state.recordErrorMessage = error || null;
    });

    builder.addCase(getTrackHistory.pending, (state) => {
      state.isLoading = true;
      state.trackHistory = [];
      state.getErrorMessage = null;
    }).addCase(getTrackHistory.fulfilled, (state, {payload: trackHistory}) => {
      state.isLoading = false;
      state.trackHistory = trackHistory;
    }).addCase(getTrackHistory.rejected, (state, {payload: error}) => {
      state.isLoading = false;
      state.getErrorMessage = error || null;
    });
  }
});

export const selectTrackHistory = (state: RootState) => state.trackHistory.trackHistory;
export const selectIsLoading = (state: RootState) => state.trackHistory.isLoading;
export const selectRecordErrorMessage = (state: RootState) => state.trackHistory.recordErrorMessage;
export const selectGetErrorMessage = (state: RootState) => state.trackHistory.getErrorMessage;

export const tracksHistoryReducers = tracksHistorySlice.reducer;