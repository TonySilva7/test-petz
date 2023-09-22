import { ComponentProps } from 'react';
import { FormWrapper } from './styles';

type FormProps = ComponentProps<'form'>;

function Form({ children, ...props }: FormProps) {
  return <FormWrapper {...props}>{children}</FormWrapper>;
}

export { Form, type FormProps };
