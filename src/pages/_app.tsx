import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import { theme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/global-styles';
import { ProviderRedux } from './_redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProviderRedux>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </ProviderRedux>
  );
}
