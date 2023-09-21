import { ComponentProps, ForwardRefRenderFunction, forwardRef } from 'react';
import { ControlWrapper, OptionWrapper } from './styles';

type ControlProps = ComponentProps<'select'>;
type OptionsProps = ComponentProps<'option'>;

const SelectRef: ForwardRefRenderFunction<HTMLSelectElement, ControlProps> = (
  { ...props },
  ref,
) => {
  return <ControlWrapper ref={ref} {...props} />;
};

function Option({ children, ...props }: OptionsProps) {
  return <OptionWrapper {...props}>{children}</OptionWrapper>;
}

const Control = forwardRef(SelectRef);

export { Control, Option, type ControlProps, type OptionsProps };
