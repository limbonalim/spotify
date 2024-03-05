import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi.ts';
import type { IMyError, ValidationError, ITrackHistory } from '../../types';

export const createNewRecord = createAsyncThunk<void, string, {
  rejectValue: IMyError | ValidationError
}>(
  'tracksHistory/createNewRecord',
  async (track, {rejectWithValue}) => {
    try {
      await axiosApi.post('/track_history', {track});

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

export const getTrackHistory = createAsyncThunk<ITrackHistory[], void, { rejectValue: IMyError }>(
  'tracksHistory/getTrackHistory',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosApi.get('/track_history');

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);