import * as T from '@/@types';
import { RootState } from '@/@redux/store';
import * as M from '@/domain';
import { USER } from '@/api';
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

const initialState: T.IUserState = {
  user: M.user,
  status: 'idle',
};

export const handleGetUserByName = createAsyncThunk(
  'users/getByName',
  async (name: string, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await USER.users.getUserByName({
        name,
      });
      return response.data as T.IUserState;
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
    handleMeuTeste: (state, action: PayloadAction<{ name: string }>) => {
      state.status = 'idle';
      state.user.id = 0;
      state.user.name = action.payload.name;
      state.user.email = '';
      state.user.avatarUrl = '';
    },
  },

  extraReducers: (builder: ActionReducerMapBuilder<T.IUserState>) => {
    builder
      .addCase(handleGetUserByName.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        handleGetUserByName.fulfilled,
        (state, action: PayloadAction<T.IUserState>) => {
          state.status = 'success';
          state.user.id = action.payload.user.id;
          state.user.email = action.payload.user.email;
          state.user.name = action.payload.user.name;
          state.user.avatarUrl = action.payload.user.avatarUrl;
        },
      )
      .addCase(handleGetUserByName.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { resetUsers, handleMeuTeste } = userSlice.actions;

export const selectUsers = (state: RootState): T.IUserState =>
  state.userReducer;

export default userSlice.reducer;
