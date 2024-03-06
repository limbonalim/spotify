import {createAsyncThunk} from '@reduxjs/toolkit';
import {isAxiosError} from 'axios';
import axiosApi from '../../axiosApi.ts';
import { IAlbum, IAlbumFormState, IMyError, ValidationError } from '../../types';

export const getAlbums = createAsyncThunk<IAlbum[], string, {rejectValue: IMyError}>(
  'albums/getAlbums',
  async (artistId, {rejectWithValue}) => {
    try {
      const response = await axiosApi.get<IAlbum[]>(`/albums?artist=${artistId}`);

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const createAlbum = createAsyncThunk<void, IAlbumFormState, {rejectValue: ValidationError}>(
  'albums/createAlbum',
  async (data, {rejectWithValue}) => {
    try {
      const responseData = new FormData();
      responseData.append('title', data.title);
      responseData.append('year', data.year);
      responseData.append('artist', data.artist);
      if (data.image) responseData.append('image', data.image);
      await axiosApi.post('/albums', responseData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);