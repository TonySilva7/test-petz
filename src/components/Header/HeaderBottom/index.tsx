import { STYLES } from '@/@redux/features';
import * as S from '@/@redux/store';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Container } from '@/components/Container';
import { Text } from '@/components/Text';
import { theme } from '@/styles/theme';
import { useRouter } from 'next/router';
import { ComponentProps } from 'react';

type HeaderBottomProps = ComponentProps<'div'>;

function HeaderBottom({ ...props }: HeaderBottomProps) {
  const router = useRouter();
  const { titlesHeader } = S.useAppSelector(STYLES.selectStyles);

  if (router.pathname === '/') {
    return <></>;
  }

  return (
    <Container
      {...props}
      $styleProps={{
        m: {
          display: 'flex',
          background: theme.colors.primary.dark,
          color: theme.colors.white,
          height: '16rem',
          padding: '3rem 5rem 0 5rem',
          'flex-direction': 'column',
          gap: '1.5rem',
          'justify-content': 'flex-start',
          'align-items': 'flex-start',
        },
        d: {
          height: '18.7rem',
        },
      }}
    >
      <Breadcrumbs />
      <Text fontSize={3.2} fontWeight={700} color={theme.colors.secondary}>
        {titlesHeader.title}
      </Text>

      <Text
        as="p"
        fontSize={1.4}
        fontWeight={400}
        color={theme.colors.secondary}
      >
        {titlesHeader.subTitle}
      </Text>
    </Container>
  );
}

export { HeaderBottom, type HeaderBottomProps };
