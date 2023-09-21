import styled from 'styled-components';

export const FooterWrapper = styled.div`
  display: flex;
  height: 7.2rem;
  width: 100%;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.lightBlack};
  align-items: center;
  justify-content: center;
`;
