import { PokeBall } from '@/components/PokeBall';
import { ComponentProps } from 'react';

type HeaderTopProps = ComponentProps<'div'>;

function HeaderTop({ ...props }: HeaderTopProps) {
  return (
    <div {...props}>
      <PokeBall /> <h1>Quem Somos</h1> <button>Agendar Consulta</button>
    </div>
  );
}

export { HeaderTop, type HeaderTopProps };
