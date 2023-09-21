import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ComponentProps } from 'react';
import { HeaderBottomWrapper } from './styles';
import { useRouter } from 'next/router';
import * as S from '@/@redux/store';
import { STYLES } from '@/@redux/features';

type HeaderBottomProps = ComponentProps<'div'>;

function HeaderBottom({ ...props }: HeaderBottomProps) {
  const router = useRouter();
  const { titlesHeader } = S.useAppSelector(STYLES.selectStyles);

  if (router.pathname === '/') {
    return <></>;
  }

  return (
    <HeaderBottomWrapper {...props}>
      <Breadcrumbs />
      <h1>{titlesHeader.title}</h1>
      <p>{titlesHeader.subTitle}</p>
    </HeaderBottomWrapper>
  );
}

export { HeaderBottom, type HeaderBottomProps };
