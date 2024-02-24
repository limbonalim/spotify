import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi.ts';
import type { IMyError, ITracksHistoryRecord, ValidationError, ITrackHistory } from '../../types';

export const createNewRecord = createAsyncThunk<void, ITracksHistoryRecord, {
  rejectValue: IMyError | ValidationError
}>(
  'tracksHistory/createNewRecord',
  async ({track, token}, {rejectWithValue}) => {
    try {
      await axiosApi.post('/track_history', {track}, {headers: {'Authorization': `Barer ${token}`}});

    } catch (e) {
      if (isAxiosError(e) && e.response) {
        switch (e.response.status) {
          case 401:
            return rejectWithValue(e);
          case 404:
            return rejectWithValue(e);
          case 422:
            return rejectWithValue(e);
        }
      }
      throw e;
    }
  }
);

export const getTrackHistory = createAsyncThunk<ITrackHistory[], string, { rejectValue: IMyError }>(
  'tracksHistory/getTrackHistory',
  async (token, {rejectWithValue}) => {
    try {
      const response = await axiosApi.get('/track_history', {headers: {'Authorization': `Barer ${token}`}});

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);