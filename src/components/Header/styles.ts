import styled, { css } from 'styled-components';

export const HeaderWrapper = styled.header`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.large};
    text-align: center;
  `}

  a {
    color: ${({ theme }) => theme.colors.white};
  }
`;
