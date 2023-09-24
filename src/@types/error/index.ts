type IError = {
  message: string;
  statusCode: number;
  response?: {
    status: number;
  };
};

export type { IError };
