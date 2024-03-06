import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi.ts';
import type { IArtist, IArtistFormState, IMyError, ValidationError } from '../../types';

export const getArtists = createAsyncThunk<IArtist[], void, { rejectValue: IMyError }>(
  'artists/getArtists',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosApi.get<IArtist[]>('/artists');

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const createArtist = createAsyncThunk<void, IArtistFormState, { rejectValue: ValidationError }>(
  'artists/createArtist',
  async (data, {rejectWithValue}) => {
    try {
      const responseData = new FormData();
      responseData.append('name', data.name);
      if (data.info) responseData.append('info', data.info);
      if (data.photo) responseData.append('photo', data.photo);

      await axiosApi.post('/artists', responseData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      if (isAxiosError(e) && e.response && e.response.status === 401) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);