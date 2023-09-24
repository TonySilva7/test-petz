import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { pokemonSlice } from '../features/pokemons';
import { ProfileSlice } from '../features/profile';
import stylesSlice from '../features/styles';

const rootReducer = combineReducers({
  [ProfileSlice.name]: ProfileSlice.reducer,
  [pokemonSlice.name]: pokemonSlice.reducer,
  stylesReducer: stylesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  });
}
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});

export * from '../test-util';
export * from './hooks';
