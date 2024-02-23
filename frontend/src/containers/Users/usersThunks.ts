import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi.ts';
import { ILoginForm, IMyError, IRegisterForm, IUser, ValidationError } from '../../types';

export const register = createAsyncThunk<IUser, IRegisterForm, { rejectValue: ValidationError }>(
  'users/register',
  async (registerData, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<IUser>('/users', registerData);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const login = createAsyncThunk<IUser, ILoginForm, { rejectValue: IMyError }>(
  'users/login',
  async (loginData, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<IUser>('/users/sessions', loginData);

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);