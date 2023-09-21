import React from 'react';
import { ButtonWrapper, ButtonWrapperProps } from './styles';

type ButtonProps = ButtonWrapperProps & {
  iconPrefix?: React.ElementType;
};

function Button({
  children,
  $styleProps,
  iconPrefix: Icon,
  ...rest
}: ButtonProps) {
  return (
    <ButtonWrapper $styleProps={$styleProps} {...rest}>
      <span>{Icon && <Icon />}</span>
      <span>{children}</span>
    </ButtonWrapper>
  );
}

export { Button, type ButtonProps };
