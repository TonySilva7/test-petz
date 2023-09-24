import * as TYPE from '@/@types';
type IItemGeneration = {
  name: string;
  url: string;
};
type IGeneration = IItemGeneration & {
  statusRequest: TYPE.IStatusRequest;
  statusCode: number;
  highestGeneration: IItemGeneration & {
    genInNumber: number;
    pokemonName: string;
  };
};

type IPayload = {
  name: string;
};

export type { IGeneration, IPayload };
