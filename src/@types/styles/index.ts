/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps, JSXElementConstructor } from 'react';

type IStateStyles = {
  isLoadingHome?: boolean;
  titlesHeader: {
    title: string;
    subTitle: string;
  };
};

type IMainStyles = {
  display?: 'flex' | 'inline-flex' | 'block' | 'inline-block' | 'none';
  'flex-direction'?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  'align-items'?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  'text-align'?: 'left' | 'center' | 'right' | 'justify';
  'font-size'?: string;
  'font-weight'?: number;
  'justify-content'?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch';
  'flex-wrap'?: 'wrap' | 'nowrap' | 'wrap-reverse';
  'min-height'?: string;
  'border-radius'?: string;
  gap?: string;
  flex?: string;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  color?: string;
  background?: string;
  border?: string;
  transition?: string;
  animation?: string;
  overflow?: string;
  'overflow-x'?: string;
  'overflow-y'?: string;
};

type IStylesProps = {
  m?: IMainStyles;
  d?: IMainStyles;
};

type ComponentWrapperProps<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
> = ComponentProps<T> & {
  $styleProps?: IStylesProps;
};

export type { IStateStyles, IMainStyles, IStylesProps, ComponentWrapperProps };
