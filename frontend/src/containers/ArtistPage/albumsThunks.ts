import {createAsyncThunk} from '@reduxjs/toolkit';
import {isAxiosError} from 'axios';
import axiosApi from '../../axiosApi.ts';
import {IAlbum, IMyError} from '../../types';

export const getAlbums = createAsyncThunk<IAlbum[], string, {rejectValue: IMyError}>(
  'albums/getAlbums',
  async (aritstId, {rejectWithValue}) => {
    try {
      const response = await axiosApi.get<IAlbum[]>(`/albums?artist=${aritstId}`);

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);