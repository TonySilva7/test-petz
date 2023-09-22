import styled from 'styled-components';

export const RootWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  min-width: 26.5rem;
`;

export const LegendWrapper = styled.label`
  display: flex;
  font-size: 1.2rem;
  font-weight: 700;
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
