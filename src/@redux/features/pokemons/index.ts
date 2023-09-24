import { RootState } from '@/@redux/store';
import * as API from '@/api';
import * as DOMAIN from '@/domain';
import * as TYPE from '@/@types';
import {
  ActionReducerMapBuilder,
  AnyAction,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

const initialState: DOMAIN.IGeneration = DOMAIN.generation;

export const handleGetGenerationByName = createAsyncThunk(
  'pokemons/getGenerationByName',
  async (payload: DOMAIN.IPayload, { rejectWithValue }) => {
    try {
      const response: AxiosResponse =
        await API.schedule.getGenerationByName(payload);

      const generation: DOMAIN.IGeneration = response.data.generation;
      return {
        ...generation,
        highestGeneration: {
          ...generation.highestGeneration,
          pokemonName: payload.name,
        },
      };
    } catch (error) {
      const err = error as TYPE.IError;
      const status = err.response ? err.response.status : 0;
      return rejectWithValue({ message: err.message, statusCode: status });
    }
  },
);

export const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,

  reducers: {
    restePokemons: (state) => {
      state.name = '';
      state.url = '';
      state.statusRequest = 'idle';
      state.statusCode = 0;
    },
  },

  extraReducers: (builder: ActionReducerMapBuilder<DOMAIN.IGeneration>) => {
    builder
      .addCase(handleGetGenerationByName.pending, (state) => {
        state.statusRequest = 'pending';
      })
      .addCase(
        handleGetGenerationByName.fulfilled,
        (state, action: PayloadAction<DOMAIN.IGeneration>) => {
          const toNumber = {
            'generation-i': 1,
            'generation-ii': 2,
            'generation-iii': 3,
            'generation-iv': 4,
            'generation-v': 5,
            'generation-vi': 6,
            'generation-vii': 7,
            'generation-viii': 8,
            'generation-ix': 9,
          };

          const generationName = action.payload.name as keyof typeof toNumber;
          const currentGeneration = toNumber[generationName];
          const highestGeneration = state.highestGeneration.genInNumber;

          state.name = action.payload.name;
          state.url = action.payload.url;

          if (currentGeneration > highestGeneration) {
            state.highestGeneration.name = action.payload.name;
            state.highestGeneration.url = action.payload.url;
            state.highestGeneration.genInNumber = currentGeneration;
            state.highestGeneration.pokemonName =
              action.payload.highestGeneration.pokemonName;
          }
          state.statusRequest = 'success';
        },
      )
      .addCase(
        handleGetGenerationByName.rejected,
        (state, action: AnyAction) => {
          const data = action.payload as TYPE.IError;
          state.statusRequest = 'failed';
          state.statusCode = data.statusCode;
        },
      );
  },
});

export const { restePokemons } = pokemonSlice.actions;

export const selectPokemons = (state: RootState): DOMAIN.IGeneration =>
  state.pokemons;

export default pokemonSlice.reducer;
