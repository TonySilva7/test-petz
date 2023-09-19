// As a basic setup, import your same slice reducers
import type { PreloadedState } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { setupStore, type AppStore, type RootState } from '@/@redux/store';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/global-styles';

/**
 * This type interface extends the default options for render from RTL, as well
 * as allows the user to specify other things such as initialState, store.
 */
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

/**
 * as allows the user to specify other things such as initialState, store.
 */
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return (
      <Provider store={store}>
        <GlobalStyles />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    );
  }

  /**
   *  Return an object with the store and all of RTL's query functions
   */
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}