import styled from 'styled-components';
import { ContainerWrapper } from '../Container/styles';

export type LegendWrapperProps = {
  width?: string;
};

export const RootWrapper = styled(ContainerWrapper)``;

export const LegendWrapper = styled.label<LegendWrapperProps>`
  display: flex;
  font-size: 1.2rem;
  font-weight: 700;
  width: ${({ width }) => width || '100%'};
`;

export const ErrorsWrapper = styled.ul`
  display: flex;
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: 500;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  flex-wrap: wrap;

  & > li {
    padding: 0.3rem 0.7rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.primary.light};
  }
`;
