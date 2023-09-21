import styled, { css } from 'styled-components';

export const HeaderWrapper = styled.header`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.large};
    text-align: center;

    position: sticky;
    top: -11rem;
  `}
`;
