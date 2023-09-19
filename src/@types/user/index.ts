type IUser = {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
};

type IUserState = {
  status: 'idle' | 'pending' | 'success' | 'error';
  user: IUser;
};

export type { IUser, IUserState };
