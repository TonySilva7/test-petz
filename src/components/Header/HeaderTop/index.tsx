import { STYLES } from '@/@redux/features';
import * as S from '@/@redux/store';
import { Button } from '@/components/Button';
import { PokeBall } from '@/components/PokeBall';
import { ComponentProps } from 'react';
import { HeaderTopWrapper } from './styles';
import { ButtonWrapperProps } from '@/components/Button/styles';
import { ButtonLink } from '@/components/ButtonLink';
import { useRouter } from 'next/router';

type HeaderTopProps = ComponentProps<'div'>;

const primaryButton: ButtonWrapperProps['$styleProps'] = {
  height: { m: 6.1, d: 6.1 },
  width: { m: 25.9, d: 25.9 },
  size: { m: 1.8, d: 2 },
  fWeight: { m: 600, d: 600 },
  isPrimary: true,
};

function HeaderTop({ ...props }: HeaderTopProps) {
  const { isLoadingHome } = S.useAppSelector(STYLES.selectStyles);
  const router = useRouter();
  const handleNavigate = () => {
    router.push('/');
  };

  return (
    <HeaderTopWrapper aria-label="header parte um" {...props}>
      <div>
        <Button
          iconPrefix={PokeBall}
          $styleProps={{ ...primaryButton, isLoading: isLoadingHome }}
          onClick={handleNavigate}
        >
          <p>Centro Pokémon</p>
        </Button>
      </div>
      <nav>
        <ButtonLink
          href="/about"
          $styleProps={{
            isTransparent: true,
            width: {
              m: 11,
              d: 11,
            },
            fWeight: {
              m: 400,
              d: 400,
            },
          }}
        >
          <p>Quem Somos</p>
        </ButtonLink>

        <ButtonLink href="/schedule">
          <p>Agendar Consulta</p>
        </ButtonLink>
      </nav>
    </HeaderTopWrapper>
  );
}

export { HeaderTop, type HeaderTopProps };
