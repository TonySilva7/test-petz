import * as TYPE from '@/@types';
type IGeneration = TYPE.IResult;

type IGenerationState = IGeneration & {
  statusRequest: TYPE.IStatusRequest;
  statusCode: number;

  highestGeneration: IGeneration & {
    genInNumber: number;
    pokemonName: string;
  };
};

type IPayload = {
  name: string;
};

export type { IGenerationState, IPayload };
