import { Header } from '@/components/Header';

import { theme } from '@/styles/theme';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ProviderRedux } from '@/@redux/provider';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { Footer } from '@/components/Footer';
import { wrapper } from '@/@redux/store';
import { Provider } from 'react-redux';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
