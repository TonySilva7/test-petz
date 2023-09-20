import { ComponentProps } from 'react';

type ViewUserProps = ComponentProps<'div'>;

function ViewUser({ ...props }: ViewUserProps) {
  return (
    <main {...props}>
      <h1>Hello</h1>
      <button data-testid="button-user">Clique-me</button>
    </main>
  );
}

export { ViewUser, type ViewUserProps };
