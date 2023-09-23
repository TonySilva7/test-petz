import { RootState } from '@/@redux/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    name: '',
    idade: 0,
  },
  reducers: {
    setProfileData: (state, action) => {
      state.name = action.payload;
    },
    setAge: (state, action: PayloadAction<{ age: number }>) => {
      state.idade = action.payload.age;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      if ('payload' in action) {
        const { profile } = action.payload as RootState;
        return {
          ...state,
          ...profile,
        };
      }
      return state;
    });
  },
});
export const { setProfileData, setAge } = ProfileSlice.actions;
export const selectProfile = (state: RootState) => state.profile;
export default ProfileSlice.reducer;
