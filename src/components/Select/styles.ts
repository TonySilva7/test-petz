import styled from 'styled-components';

export const ControlWrapper = styled.select`
  display: flex;
  height: 4.5rem;
  padding: 0 1rem;
  border-radius: 0.7rem;
  border: solid 2px ${({ theme }) => theme.colors.gray.light};
  color: ${({ theme }) => theme.colors.lightBlack};
  font-size: 1.4rem;
  font-weight: 500;

  &::placeholder {
    font-size: 1.4rem;
    font-weight: 500;
  }

  &:focus {
    border: solid 2px ${({ theme }) => theme.colors.primary.medium};
    outline: transparent;
    box-shadow: 0 0 0.4rem 0.2rem ${({ theme }) => theme.colors.primary.light};
  }
`;

export const OptionWrapper = styled.option`
  :not(:first-child) {
    background-color: red;
  }
`;
