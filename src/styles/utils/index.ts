import { IMainStyles } from '@/@types';

export const handleToCSS = (styles: IMainStyles) => {
  const entries = Object.entries(styles);
  const listStyles = entries.map(([key, value]) => `${key}: ${value};`);

  return listStyles;
};
