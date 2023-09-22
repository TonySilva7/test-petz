import { ComponentProps } from 'react';
import { TextWrapper, TextWrapperProps } from './styles';
import { StyledTarget } from 'styled-components/dist/types';

type TextProps = ComponentProps<'h1'> &
  TextWrapperProps & {
    as?: StyledTarget<'web'>;
  };

function Text({
  children,
  as,
  fontSize,
  fontWeight,
  color,
  ...props
}: TextProps) {
  return (
    <TextWrapper
      as={as}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      {...props}
    >
      {children}
    </TextWrapper>
  );
}

export { Text, type TextProps };
