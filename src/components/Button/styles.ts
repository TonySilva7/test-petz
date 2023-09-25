/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentWrapperProps } from '@/@types/styles';
import { Medias } from '@/styles/medias';
import { handleToCSS } from '@/styles/utils';
import styled, { css, keyframes } from 'styled-components';

export type PrefixWrapperProps = ComponentWrapperProps<'i'> & {
  $isLoading?: boolean;
};

export const rotate = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
`;

export const ButtonWrapper = styled.button<ComponentWrapperProps<'button'>>`
  ${({ $styleProps }) => $styleProps?.m && handleToCSS($styleProps?.m)};

  ${Medias.desktop} {
    ${({ $styleProps }) =>
      $styleProps?.d
        ? handleToCSS($styleProps?.d)
        : $styleProps?.m && handleToCSS($styleProps?.m)};
  }
  &:hover {
    transform: scale(1.01);
    transition: all 0.2s ease-in-out;
  }
`;

export const PrefixWrapper = styled.i<PrefixWrapperProps>`
  ${({ $styleProps }) => $styleProps?.m && handleToCSS($styleProps?.m)};

  ${Medias.desktop} {
    ${({ $styleProps }) =>
      $styleProps?.d
        ? handleToCSS($styleProps?.d)
        : $styleProps?.m && handleToCSS($styleProps?.m)};
  }

  animation: ${({ $isLoading }) =>
    $isLoading
      ? css`
          ${rotate} 0.7s ease-in-out alternate
        `
      : 'none'};
`;
