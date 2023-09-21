import { ComponentProps, ForwardRefRenderFunction, forwardRef } from 'react';
import { ControlWrapper } from './styles';

type ControlProps = ComponentProps<'input'>;

const InputRef: ForwardRefRenderFunction<HTMLInputElement, ControlProps> = (
  { ...props },
  ref,
) => {
  return <ControlWrapper ref={ref} {...props} />;
};

const Control = forwardRef(InputRef);

export { Control, type ControlProps };
