import { ComponentProps } from 'react';
import { TitleWrapper, TitleWrapperProps } from './styles';
import { StyledTarget } from 'styled-components/dist/types';

type TitleProps = ComponentProps<'h1'> &
  TitleWrapperProps & {
    as?: StyledTarget<'web'>;
  };

function Title({
  children,
  as,
  fontSize,
  fontWeight,
  color,
  ...props
}: TitleProps) {
  return (
    <TitleWrapper
      as={as}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      {...props}
    >
      {children}
    </TitleWrapper>
  );
}

export { Title, type TitleProps };
