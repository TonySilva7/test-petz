import styled, { css } from 'styled-components';

export const HeaderBottomWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary.dark};
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.large};
  `}
`;
