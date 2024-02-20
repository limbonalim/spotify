import {createAsyncThunk} from '@reduxjs/toolkit';
import {isAxiosError} from 'axios';
import axiosApi from '../../axiosApi.ts';
import type {IArtist, IMyError} from '../../types';

export const getArtists = createAsyncThunk<IArtist[], void, {rejectValue: IMyError}>(
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