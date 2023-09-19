import * as T from '@/@types';
import { RootState } from '@/@redux/store';
import * as M from '@/model';
import { USER } from '@/services';
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

const initialState: T.IUserState = M.userModel;

export const handleGetUserByName = createAsyncThunk(
  'users/getByName',
  async (name: string, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await USER.users.getUserByName({
        name,
      });
      return response.data as T.IUser;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const userSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {
    resetUsers: (state) => {
      state.status = 'idle';
      state.user.id = 0;
      state.user.name = 'Tony';
      state.user.email = '';
      state.user.avatarUrl = '';
    },
  },

  extraReducers: (builder: ActionReducerMapBuilder<T.IUserState>) => {
    builder
      .addCase(handleGetUserByName.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(
        handleGetUserByName.fulfilled,
        (state, action: PayloadAction<T.IUser>) => {
          state.status = 'success';
          state.user.id = action.payload.id;
          state.user.email = action.payload.email;
          state.user.name = action.payload.name;
          state.user.avatarUrl = action.payload.avatarUrl;
        },
      )
      .addCase(handleGetUserByName.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { resetUsers } = userSlice.actions;

export const selectUsers = (state: RootState): T.IUserState =>
  state.userReducer;

export default userSlice.reducer;
