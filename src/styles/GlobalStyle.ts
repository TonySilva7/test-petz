import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    background: ${({ theme }) => theme.colors.white};

    body {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      font-family: 'Jost', 'Poppins', 'Roboto', sans-serif;
      color: ${({ theme }) => theme.colors.lightBlack};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: 1.1;
    }

    

    a {
      text-decoration: none;
    }

    

    li {
      list-style: none;
    }

    input {
      font-family: 'Jost', 'Roboto', sans-serif;
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
