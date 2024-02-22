import {createAsyncThunk} from '@reduxjs/toolkit';
import {isAxiosError} from 'axios';
import axiosApi from '../../axiosApi.ts';
import {IMyError, ITrack, ValidationError} from '../../types';

export const getTracks = createAsyncThunk<ITrack[], string, {rejectValue: IMyError | ValidationError}>(
  'tracks/getTracks',
  async (albumId, {rejectWithValue}) => {
    try {
      const response = await axiosApi.get<ITrack[]>(`/tracks?album=${albumId}`);

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);