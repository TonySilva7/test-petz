import { DefaultTheme } from 'styled-components';

export const styesDialog = (theme: DefaultTheme) => {
  const styleContainer = {
    d: {
      width: '40.8rem',
    },
    m: {
      display: 'flex',
      'flex-direction': 'column',
      border: `2px solid ${theme.colors.primary.medium}`,
      'border-radius': '0.8rem',
      height: '24.5rem',
      'text-align': 'center',
      'align-items': 'center',
      'justify-content': 'center',
      padding: '2rem',
      gap: '1.5rem',

      width: '37rem',
    },
  };

  const styleButton = {
    m: {
      'font-size': '1.2rem',
      width: '19.7rem',
      height: '4.2rem',
      background: theme.colors.primary.dark,
      color: theme.colors.secondary,
      'border-radius': '20rem',
      'font-weight': 700,
    },
    d: {
      'font-size': '1.4rem',
    },
  };

  return { styleContainer, styleButton };
};
