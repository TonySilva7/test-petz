import styled from 'styled-components';

export const BreadCrumbWrapper = styled.nav`
  display: flex;
  column-gap: 0.5rem;
  font-size: 1.2rem;
  & > span {
    display: flex;
    column-gap: 0.5rem;
  }
`;
