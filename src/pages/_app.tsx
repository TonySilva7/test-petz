import { Header } from '@/components/Header';

import { theme } from '@/styles/theme';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ProviderRedux } from '@/@redux/provider';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { Footer } from '@/components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProviderRedux>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </ProviderRedux>
  );
}
