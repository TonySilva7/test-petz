import { ComponentProps } from 'react';

type HeaderProps = ComponentProps<'div'>;

function Header({ ...props }: HeaderProps) {
  return (
    <div {...props}>
      <h1> Hello Header</h1>
    </div>
  );
}

export { Header, type HeaderProps };
