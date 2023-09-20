import { Header } from '@/components/Header';

import { theme } from '@/styles/theme';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ProviderRedux } from '@/@redux/provider';
import { GlobalStyle } from '@/styles/GlobalStyle';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProviderRedux>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
        <footer>Meu Footer</footer>
      </ThemeProvider>
    </ProviderRedux>
  );
}
