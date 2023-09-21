import styled from 'styled-components';

export const HomePageWrapper = styled.div`
  display: flex;
  height: calc(100vh - (7.2rem + 10.4rem));
  background-image: url('/images/pokemon-hero.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};

  & > p {
    font-size: 3.2rem;
    font-weight: 700;
    text-align: center;
  }
`;
