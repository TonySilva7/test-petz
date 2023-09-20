import * as Model from '@/domain';
import { IStatusRequest } from '../api';

type IUserState = {
  user: Model.IUser;
  status: IStatusRequest;
};

export type { IUserState };
