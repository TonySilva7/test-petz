import { Medias } from '@/styles/medias';
import { ComponentProps } from 'react';
import styled, { css } from 'styled-components';

export type ButtonWrapperProps = ComponentProps<'button'> & {
  $styleProps?: {
    isPrimary?: boolean;
    isLoading?: boolean;
    isTransparent?: boolean;
    height?: {
      m: number;
      d: number;
    };
    width?: {
      m: number;
      d: number;
    };
    size?: {
      m: number;
      d: number;
    };
    fWeight?: {
      m: number;
      d: number;
    };
  };
};

const styleBuilder = (styles: ButtonWrapperProps['$styleProps']) => {
  if (styles?.isPrimary) {
    return css`
      ${Medias.mobile} {
        height: 6.1rem;
        width: ${styles?.isLoading ? 25.9 : 6.1}rem;
        justify-content: center;
        font-weight: ${styles?.fWeight?.d || 700};
        justify-content: flex-start;
        padding: 0 1.2rem;
      }

      ${Medias.desktop} {
        height: 6.1rem;
        width: ${styles?.isLoading ? 25.9 : 6.1}rem;
        justify-content: center;
        font-weight: ${styles?.fWeight?.d || 700};
        justify-content: flex-start;
        padding: 0 1.2rem;
      }

      &:hover {
        width: 25.9rem;
        padding: 0 1.2rem;
        & > span {
          &:last-child {
            justify-content: center;
            width: 100%;
            font-size: 1.6rem;
          }
          &:first-child {
            transform: rotate(180deg);
          }
        }
      }

      & > span {
        transition: all 0.3s ease-in-out 0.1s;
        display: flex;

        &:first-child {
          justify-self: center;
          transform: ${styles?.isLoading ? 'rotate(180deg)' : 'rotate(0deg)'};
        }

        &:last-child {
          transform-origin: 50% 0;
          width: ${styles?.isLoading ? 100 : 0}%;
          font-size: ${styles?.isLoading ? 1.6 : 0}rem;
          justify-content: ${styles?.isLoading ? 'center' : 'flex-end'};
        }
      }
    `;
  }

  return css`
    transition: transform 0.2s ease-in-out;
    ${Medias.mobile} {
      height: ${styles?.height?.m || 4.2}rem;
      width: ${styles?.width?.m || 17.2}rem;
      font-size: ${styles?.size?.m || 1.6}rem;
      font-weight: ${styles?.fWeight?.m || 700};
    }

    ${Medias.desktop} {
      height: ${styles?.height?.d || 4.2}rem;
      width: ${styles?.width?.d || 17.2}rem;
      font-size: ${styles?.size?.d || 1.4}rem;
      font-weight: ${styles?.fWeight?.d || 700};
    }

    &:hover {
      transform: scale(1.05);
    }

    & > span {
      display: flex;
      &:first-child {
        display: flex;
        justify-content: flex-start;
      }
      &:last-child {
        display: flex;
        justify-content: center;
        width: 100%;
      }
    }
  `;
};

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
  display: flex;
  align-items: center;
  background-color: ${({ theme, $styleProps }) =>
    $styleProps?.isTransparent ? 'transparent' : theme.colors.primary.dark};
  color: ${({ theme, $styleProps }) =>
    $styleProps?.isTransparent ? theme.colors.lightBlack : theme.colors.white};
  border-radius: 20rem;
  transition: all 0.2s ease-in-out;
  /* padding: 0 1.6rem; */

  ${({ $styleProps }) => styleBuilder($styleProps)}
`;
