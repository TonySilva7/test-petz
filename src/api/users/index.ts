import { AxiosResponse } from 'axios';

import { http } from '../config';

type IPayload = {
  name: string;
};

const users = {
  getUserByName: async ({ name }: IPayload) => {
    const response: AxiosResponse = await http.get(`/users/${name}`);

    return response;
  },
};

export { users };
