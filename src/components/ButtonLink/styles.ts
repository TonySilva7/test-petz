import { Medias } from '@/styles/medias';
import Link from 'next/link';
import styled from 'styled-components';

export type ButtonLinkWrapperProps = {
  $styleProps?: {
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

export const ButtonLinkWrapper = styled(Link)<ButtonLinkWrapperProps>`
  display: flex;
  border-radius: 20rem;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  background-color: ${({ theme }) => theme.colors.primary.dark};
  background-color: ${({ theme, $styleProps }) =>
    $styleProps?.isTransparent ? 'transparent' : theme.colors.primary.dark};
  color: ${({ theme, $styleProps }) =>
    $styleProps?.isTransparent ? theme.colors.lightBlack : theme.colors.white};

  ${Medias.mobile} {
    font-size: ${({ $styleProps }) => $styleProps?.size?.m || 1.6}rem;
    font-weight: ${({ $styleProps }) => $styleProps?.fWeight?.m || 700};
    height: ${({ $styleProps }) => $styleProps?.height?.m || 4.2}rem;
    width: ${({ $styleProps }) => $styleProps?.width?.m || 17.2}rem;
  }
  ${Medias.desktop} {
    font-size: ${({ $styleProps }) => $styleProps?.size?.d || 1.6}rem;
    font-weight: ${({ $styleProps }) => $styleProps?.fWeight?.d || 700};
    height: ${({ $styleProps }) => $styleProps?.height?.d || 4.2}rem;
    width: ${({ $styleProps }) => $styleProps?.width?.d || 17.2}rem;
  }

  &:hover {
    transform: scale(1.05);
  }
`;
