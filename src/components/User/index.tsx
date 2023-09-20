import { ComponentProps } from 'react';
import * as F from '@/@redux/features';
import * as S from '@/@redux/store';

type ViewUserProps = ComponentProps<'div'>;

function ViewUser({ ...props }: ViewUserProps) {
  const { user } = S.useAppSelector(F.USER.selectUsers);
  const dispatch = S.useAppDispatch();
  return (
    <main {...props}>
      <h1>Hello {user.name}</h1>
      <button
        data-testid="button-user"
        onClick={() => dispatch(F.USER.resetUsers())}
      >
        Clique-me
      </button>
    </main>
  );
}

export { ViewUser, type ViewUserProps };
