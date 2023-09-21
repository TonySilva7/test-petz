import { ComponentProps } from 'react';
import { ControlWrapper } from './styles';

type ControlProps = ComponentProps<'input'>;

function Control({ ...props }: ControlProps) {
  return <ControlWrapper {...props} />;
}

export { Control, type ControlProps };
