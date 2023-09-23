import { createGlobalStyle } from 'styled-components';
import { Medias } from './medias';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    background: ${({ theme }) => theme.colors.white};

    body, #__next {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      min-height: 100vh;
      font-family: 'Inter', 'Roboto', sans-serif;
      color: ${({ theme }) => theme.colors.lightBlack};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: 1.1;

      ${Medias.mobile} {
        max-width: 100vw;
      }
    }

    

    a {
      text-decoration: none;
    }

    

    li {
      list-style: none;
    }

    input {
      font-family: 'Inter', 'Roboto', sans-serif;
    }

    button {
      cursor: pointer;
      border: none;
    }

    code {
      font-family: 'source-code-pro', Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
  }
`;
