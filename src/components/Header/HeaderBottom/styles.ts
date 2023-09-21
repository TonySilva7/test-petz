import { Medias } from '@/styles/medias';
import { theme } from '@/styles/theme';
import styled, { css } from 'styled-components';

export const HeaderBottomWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    background-color: ${theme.colors.primary.dark};
    color: ${theme.colors.white};
    padding: 1.5rem 5rem;
    flex-direction: column;
    row-gap: 1.5rem;

    & > h1 {
      display: flex;
      justify-content: flex-start;
      font-size: 3.2rem;
      font-weight: 700;
    }
    & > p {
      font-size: 1.4rem;
      font-weight: 400;
      display: flex;
      justify-content: flex-start;
    }
  `}

  ${Medias.desktop} {
    font-size: ${theme.font.sizes.large};
    height: 18.7rem;
  }
`;
