import { Medias } from '@/styles/medias';
import styled from 'styled-components';

export type TextWrapperProps = {
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  width?: string;
  $textAlign?: 'left' | 'center' | 'right' | 'justify';
};

export const TextWrapper = styled.h1<TextWrapperProps>`
  font-size: ${({ fontSize }) => fontSize || 2.4}rem;
  font-weight: ${({ fontWeight }) => fontWeight || 600};
  color: ${({ theme, color }) => color || theme.colors.lightBlack};
  text-align: ${({ $textAlign }) => $textAlign || 'left'};

  ${Medias.mobile} {
    text-align: ${({ $textAlign }) => $textAlign || 'center'};
  }
`;
