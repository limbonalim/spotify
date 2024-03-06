import {createAsyncThunk} from '@reduxjs/toolkit';
import {isAxiosError} from 'axios';
import axiosApi from '../../axiosApi.ts';
import { IMyError, ITrack, ValidationError } from '../../types';
import { ITrackFormState } from './TrackForm.tsx';

export const getTracks = createAsyncThunk<ITrack[], string, {rejectValue: IMyError}>(
  'tracks/getTracks',
  async (albumId, {rejectWithValue}) => {
    try {
      const response = await axiosApi.get<ITrack[]>(`/tracks?album=${albumId}`);

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const createTrack = createAsyncThunk<void, ITrackFormState, {rejectValue: ValidationError}>(
  'tracks/createTrack',
  async (data, {rejectWithValue}) => {
    try {
      await axiosApi.post('/tracks', data);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);