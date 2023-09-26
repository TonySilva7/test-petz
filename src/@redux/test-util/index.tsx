// As a basic setup, import your same slice reducers
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { makeStore, type AppStore } from '@/@redux/store';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';
import { ThemeProvider } from 'styled-components';

/**
 * This type interface extends the default options for render from RTL, as well
 * as allows the user to specify other things such as initialState, store.
 */
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: AppStore;
}

/**
 * as allows the user to specify other things such as initialState, store.
 */
export function renderWithProviders(
  ui: React.ReactElement,
  { store = makeStore(), ...renderOptions }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return (
      <Provider store={store}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    );
  }

  /**
   *  Return an object with the store and all of RTL's query functions
   */
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
