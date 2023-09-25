import { IMainStyles, IStylesProps } from '@/@types';
import { ComponentWrapperProps } from '@/@types/styles';
import { Medias } from '@/styles/medias';
import { handleToCSS } from '@/styles/utils';
import styled from 'styled-components';

export const ContainerWrapper = styled.div<ComponentWrapperProps<'div'>>`
  ${({ $styleProps }) => $styleProps?.m && handleToCSS($styleProps?.m)};

  ${Medias.desktop} {
    ${({ $styleProps }) =>
      $styleProps?.d
        ? handleToCSS($styleProps?.d)
        : $styleProps?.m && handleToCSS($styleProps?.m)};
  }
`;

export type { IMainStyles, IStylesProps };
