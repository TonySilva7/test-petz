import { ComponentProps } from 'react';
import { HomePageWrapper } from './styles';
import { Text } from '@/components/Text';
import { useTheme } from 'styled-components';

type HomePageProps = ComponentProps<'div'>;

function HomePage({ ...props }: HomePageProps) {
  const theme = useTheme();
  return (
    <HomePageWrapper {...props}>
      <Text
        fontSize={3.2}
        fontWeight={700}
        $textAlign="right"
        color={theme.colors.secondary}
        data-testid="home-page-title"
      >
        Cuidamos bem do seu pokémon,
        <br /> para ele cuidar bem de você
      </Text>
    </HomePageWrapper>
  );
}

export { HomePage, type HomePageProps };
