import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAdminData, IMyError } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { isAxiosError } from 'axios';

export const getAdminData = createAsyncThunk<IAdminData>(
  'admins/getAdminData',
  async () => {
      const response = await axiosApi.get<IAdminData>('/admins');
      return response.data;
  }
);

export const deleteArtist = createAsyncThunk<void, string, {rejectValue: IMyError}>(
  'admins/deleteArtist',
  async (id, {rejectWithValue}) => {
    try {
      await axiosApi.delete(`/artists/${id}`);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const publicateArtist = createAsyncThunk<void, string, {rejectValue: IMyError}>(
  'admins/publicateArtist',
  async (id, {rejectWithValue}) => {
    try {
      await axiosApi.patch(`/artists/${id}/togglePublished`);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const deleteAlbum = createAsyncThunk<void, string, {rejectValue: IMyError}>(
  'admins/deleteAlbum',
  async (id, {rejectWithValue}) => {
    try {
      await axiosApi.delete(`/albums/${id}`);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const publicateAlbum = createAsyncThunk<void, string, {rejectValue: IMyError}>(
  'admins/publicateAlbum',
  async (id, {rejectWithValue}) => {
    try {
      await axiosApi.patch(`/albums/${id}/togglePublished`);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const deleteTrack = createAsyncThunk<void, string, {rejectValue: IMyError}>(
  'admins/deleteTrack',
  async (id, {rejectWithValue}) => {
    try {
      await axiosApi.delete(`/tracks/${id}`);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const publicateTrack = createAsyncThunk<void, string, {rejectValue: IMyError}>(
  'admins/publicateTrack',
  async (id, {rejectWithValue}) => {
    try {
      await axiosApi.patch(`/tracks/${id}/togglePublished`);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);