import { STYLES } from '@/@redux/features';
import * as S from '@/@redux/store';
import * as Button from '@/components/Button';
import { ButtonLink } from '@/components/ButtonLink';
import { Container } from '@/components/Container';
import { IconPokeBall } from '@/components/IconPokeBall';
import { Text } from '@/components/Text';
import { theme } from '@/styles/theme';
import { useRouter } from 'next/router';
import { ComponentProps } from 'react';
import { mainContainerStyle } from './styles';

type HeaderTopProps = ComponentProps<'div'>;

function HeaderTop({ ...props }: HeaderTopProps) {
  const { isLoadingHome } = S.useAppSelector(STYLES.selectStyles);
  const dispatch = S.useAppDispatch();
  const router = useRouter();
  const handleNavigate = () => {
    router.push('/');
  };

  return (
    <Container
      aria-label="header parte um"
      $styleProps={{
        d: { padding: '0 5rem' },
        m: { ...mainContainerStyle },
      }}
      {...props}
    >
      <Button.Root
        data-testid="main-home-button"
        $styleProps={{
          m: {
            display: 'flex',
            height: '6.1rem',
            width: isLoadingHome ? '25.9rem' : '6.1rem',
            'border-radius': '20rem',
            'align-items': 'center',
            padding: '1.2rem',
            gap: '0 2rem',

            'font-size': isLoadingHome ? '2rem' : '0',
            'font-weight': 600,
            color: theme.colors.secondary,
            background: theme.colors.primary.dark,
            transition: 'all 0.3s ease-in-out',
            'overflow-x': 'hidden',
          },
        }}
        onClick={handleNavigate}
        onMouseEnter={() => dispatch(STYLES.shrinkHomeButton(true))}
        onMouseLeave={() => dispatch(STYLES.shrinkHomeButton(false))}
      >
        <Button.Prefix
          $isLoading={isLoadingHome}
          $styleProps={{
            m: {
              display: 'flex',
              'border-radius': '20rem',
            },
          }}
        >
          <IconPokeBall />
        </Button.Prefix>
        Centro Pokémon
      </Button.Root>

      <Container
        $styleProps={{
          d: { display: 'flex', gap: '1.5rem' },
          m: { display: isLoadingHome ? 'none' : 'flex' },
        }}
      >
        <ButtonLink
          href="/about"
          $styleProps={{
            isTransparent: true,
            width: {
              m: 11,
              d: 11,
            },
          }}
        >
          <Text as="p" fontWeight={400} fontSize={1.4}>
            Quem Somos
          </Text>
        </ButtonLink>

        <ButtonLink href="/schedule">
          <Text
            as="p"
            fontWeight={700}
            fontSize={1.4}
            color={theme.colors.secondary}
          >
            Agendar Consulta
          </Text>
        </ButtonLink>
      </Container>
    </Container>
  );
}

export { HeaderTop, type HeaderTopProps };
