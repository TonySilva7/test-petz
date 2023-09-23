import { ComponentProps } from 'react';
import { DividerWrapper, DividerWrapperProps } from './styles';

type DividerProps = ComponentProps<'hr'> & DividerWrapperProps;

function Divider({ ...props }: DividerProps) {
  return <DividerWrapper {...props} />;
}

export { Divider, type DividerProps };
