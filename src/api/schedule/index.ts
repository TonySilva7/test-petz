import { AxiosResponse } from 'axios';

import { apiLocalHttp, apiPokemonHttp } from '../config';

type IParamGeneration = {
  name: string;
};

const schedule = {
  getDate: async () => {
    const response: AxiosResponse = await apiLocalHttp.get(`/date`);

    return response;
  },

  getTime: async () => {
    const response: AxiosResponse = await apiLocalHttp.post('/time');

    return response;
  },

  getPokemons: async () => {
    const response: AxiosResponse =
      await apiPokemonHttp.get(`/pokemon?limit=300`);

    return response;
  },

  getRegion: async () => {
    const response: AxiosResponse = await apiPokemonHttp.get(`/region`);

    return response;
  },

  getCity: async () => {
    const response: AxiosResponse = await apiPokemonHttp.get(`/location`);

    return response;
  },

  getGenerationByName: async ({ name }: IParamGeneration) => {
    const response: AxiosResponse = await apiPokemonHttp.get(
      `/pokemon-species/${name}`,
    );

    return response;
  },
};

export { schedule };
