import { ComponentProps } from 'react';
import { ControlWrapper, OptionWrapper } from './styles';

type ControlProps = ComponentProps<'select'>;
type OptionsProps = ComponentProps<'option'>;

function Control({ ...props }: ControlProps) {
  return <ControlWrapper {...props} />;
}

function Option({ children, ...props }: OptionsProps) {
  return <OptionWrapper {...props}>{children}</OptionWrapper>;
}

export { Control, Option, type OptionsProps, type ControlProps };
