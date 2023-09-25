import { ComponentWrapperProps } from '@/@types/styles';
import { StyledTarget } from 'styled-components/dist/types';
import { ContainerWrapper } from './styles';
import { JSXElementConstructor } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JSXConst = JSXElementConstructor<any>;
type JSXEle = JSX.IntrinsicElements;

type ContainerProps<T extends keyof JSXEle | JSXConst> =
  ComponentWrapperProps<T> & {
    as?: StyledTarget<'web'>;
  };

function Container<T extends keyof JSXEle | JSXConst>({
  children,
  as,
  $styleProps,
  ...props
}: ContainerProps<T>) {
  return (
    <ContainerWrapper as={as} $styleProps={$styleProps} {...props}>
      {children}
    </ContainerWrapper>
  );
}

export { Container, type ContainerProps };
