type IStatusRequest = 'idle' | 'pending' | 'success' | 'failed';
type IResult = {
  name: string;
  url: string;
};

type IApiPokemon<T extends IResult> = {
  count: number;
  next: string;
  previous: string | null;
  results: Array<T>;
};

export type { IStatusRequest, IResult, IApiPokemon };
