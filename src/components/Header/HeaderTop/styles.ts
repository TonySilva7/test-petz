import { Medias } from '@/styles/medias';
import styled from 'styled-components';

export const HeaderTopWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 1.5rem 5rem;
  height: 10.4rem;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};

  & > :first-child {
    display: flex;
    width: min-content;
  }
  & > :last-child {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    column-gap: 2rem;
  }

  ${Medias.mobile} {
    padding: 0.5rem 1rem;
    overflow-x: hidden;
  }
`;
