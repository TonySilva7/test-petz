import { IGenerationState, IPayload } from './protocol';

const generation: IGenerationState = {
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

export { generation, type IGenerationState, type IPayload };
