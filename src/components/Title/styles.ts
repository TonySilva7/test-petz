import styled from 'styled-components';

export type TitleWrapperProps = {
  color?: string;
  fontSize?: number;
  fontWeight?: number;
};

export const TitleWrapper = styled.h1<TitleWrapperProps>`
  font-size: ${({ fontSize }) => fontSize || 2.4}rem;
  font-weight: ${({ fontWeight }) => fontWeight || 600};
  color: ${({ theme, color }) => color || theme.colors.lightBlack};
`;
