import { Medias } from '@/styles/medias';
import { ComponentProps } from 'react';
import styled from 'styled-components';

type IMainStyles = {
  display?: 'flex' | 'inline-flex' | 'block' | 'inline-block' | 'none';
  'flex-direction'?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  'align-items'?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  'justify-content'?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  wrap?: 'wrap' | 'nowrap';
  gap?: string;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  color?: string;
  background?: string;
};

export type IStylesProps = {
  m?: IMainStyles;
  d?: IMainStyles;
};

export type ContainerWrapperProps = ComponentProps<'div'> & {
  $styleProps?: IStylesProps;
};

const handleToCSS = (styles: IMainStyles) => {
  const entries = Object.entries(styles);
  const listStyles = entries.map(([key, value]) => `${key}: ${value};`);
  return listStyles;
};

export const ContainerWrapper = styled.div<ContainerWrapperProps>`
  ${Medias.mobile} {
    ${({ $styleProps }) => $styleProps?.m && handleToCSS($styleProps?.m)};
  }

  ${Medias.desktop} {
    ${({ $styleProps }) => $styleProps?.d && handleToCSS($styleProps?.d)};
  }
`;