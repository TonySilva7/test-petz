import { RootState } from '@/@redux/store';
import * as T from '@/@types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: T.IStateStyles = {
  isLoadingHome: false,
  titlesHeader: {
    title: '',
    subTitle: '',
  },
};

export const userSlice = createSlice({
  name: 'styles',
  initialState,

  reducers: {
    shrinkHomeButton: (
      state,
      action: PayloadAction<T.IStateStyles['isLoadingHome']>,
    ) => {
      state.isLoadingHome = action.payload;
    },

    setTitleHeader: (
      state,
      action: PayloadAction<T.IStateStyles['titlesHeader']>,
    ) => {
      state.titlesHeader.title = action.payload.title;
      state.titlesHeader.subTitle = action.payload.subTitle;
    },
  },
});

export const { shrinkHomeButton, setTitleHeader } = userSlice.actions;

export const selectStyles = (state: RootState): T.IStateStyles =>
  state.stylesReducer;

export default userSlice.reducer;
