import styled from 'styled-components';

export const AboutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 33%;
  row-gap: 2rem;
  margin-top: 10.4rem;

  & > h1 {
    font-size: 1.8rem;
    font-weight: 600;
  }
  & > h3 {
    font-size: 1.6rem;
    font-weight: 500;
  }
  & > p {
    font-size: 1.4rem;
    font-weight: 500;
  }
`;
