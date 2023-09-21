import { ComponentProps } from 'react';
import { HomePageWrapper } from './styles';

type HomePageProps = ComponentProps<'div'>;

function HomePage({ ...props }: HomePageProps) {
  return (
    <HomePageWrapper {...props}>
      <p>
        Cuidamos bem do seu pokémon,
        <br /> para ele cuidar bem de você
      </p>
    </HomePageWrapper>
  );
}

export { HomePage, type HomePageProps };
