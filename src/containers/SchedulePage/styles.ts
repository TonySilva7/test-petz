import { IStylesProps } from '@/@types';
import { DefaultTheme } from 'styled-components';

const containerStyles: IStylesProps = {
  m: {
    display: 'flex',
    'flex-direction': 'column',
    gap: '1rem 1rem',
    'justify-content': 'space-between',
  },
  d: {
    'flex-direction': 'row',
    display: 'flex',
    gap: '0 1rem',
    'justify-content': 'space-between',
  },
};

const selectStyles: IStylesProps = {
  m: {
    display: 'flex',
    'flex-direction': 'column',
    gap: '1rem',
  },
  d: {
    display: 'flex',
    'flex-direction': 'column',
    width: '26.5rem',
    gap: '1rem 0',
  },
};

const resumeScheduleStyles: IStylesProps = {
  m: {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    gap: '2rem 0',
    'justify-content': 'space-between',
  },
  d: {
    'flex-direction': 'row',
  },
};

const textStyles = (theme: DefaultTheme): object => ({
  as: 'p',
  fontSize: 1.4,
  fontWeight: 400,
  color: theme.colors.gray.medium,
});

export { containerStyles, selectStyles, resumeScheduleStyles, textStyles };
