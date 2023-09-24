import { IGeneration, IPayload } from './protocol';

const generation: IGeneration = {
  name: '',
  url: '',
  highestGeneration: {
    name: '',
    url: '',
    genInNumber: 0,
    pokemonName: '',
  },
  statusRequest: 'idle',
  statusCode: 0,
};

export { generation, type IGeneration, type IPayload };
