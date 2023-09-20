import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ComponentProps } from 'react';
import { HeaderBottomWrapper } from './styles';

type HeaderBottomProps = ComponentProps<'div'>;

function HeaderBottom({ ...props }: HeaderBottomProps) {
  return (
    <HeaderBottomWrapper {...props}>
      <Breadcrumbs />
      <h1>Agendar Consulta sdf</h1>
      <p>A maior rede de tratamento pokémon</p>
    </HeaderBottomWrapper>
  );
}

export { HeaderBottom, type HeaderBottomProps };
