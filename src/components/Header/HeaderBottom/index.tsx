import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ComponentProps } from 'react';
import { HeaderBottomWrapper } from './styles';
import { useRouter } from 'next/router';

type HeaderBottomProps = ComponentProps<'div'>;

function HeaderBottom({ ...props }: HeaderBottomProps) {
  const router = useRouter();

  if (router.pathname === '/') {
    return <></>;
  }

  return (
    <HeaderBottomWrapper {...props}>
      <Breadcrumbs />
      <h1>Agendar Consulta</h1>
      <p>A maior rede de tratamento pokémon</p>
    </HeaderBottomWrapper>
  );
}

export { HeaderBottom, type HeaderBottomProps };
