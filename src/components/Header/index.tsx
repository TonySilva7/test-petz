import { ComponentProps } from 'react';
import { HeaderBottom } from './HeaderBottom';
import { HeaderTop } from './HeaderTop';
import { HeaderWrapper } from './styles';

type HeaderProps = ComponentProps<'div'>;

function Header({ ...props }: HeaderProps) {
  return (
    <HeaderWrapper {...props}>
      <HeaderTop />
      <HeaderBottom />
    </HeaderWrapper>
  );
}

export { Header, type HeaderProps };
