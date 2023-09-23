import styled from 'styled-components';

export type DividerWrapperProps = {
  width?: string;
  height?: string;
  margin?: string;
  backgroundColor?: string;
};

export const DividerWrapper = styled.hr<DividerWrapperProps>`
  display: flex;
  border: none;
  border-radius: 20rem;
  margin: ${({ margin }) => margin || '0'};
  height: ${({ height }) => height || '1px'};
  width: ${({ width }) => width || '100%'};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.colors.gray.light};
`;
