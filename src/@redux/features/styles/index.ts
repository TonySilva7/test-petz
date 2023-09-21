import { RootState } from '@/@redux/store';
import * as T from '@/@types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: T.IStateStyles = {
  isLoadingHome: false,
};

export const userSlice = createSlice({
  name: 'styles',
  initialState,

  reducers: {
    shrinkHomeButton: (state, action: PayloadAction<T.IStateStyles>) => {
      state.isLoadingHome = action.payload.isLoadingHome;
    },
  },
});

export const { shrinkHomeButton } = userSlice.actions;

export const selectStyles = (state: RootState): T.IStateStyles =>
  state.stylesReducer;

export default userSlice.reducer;
