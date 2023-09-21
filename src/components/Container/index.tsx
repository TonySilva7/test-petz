import { HTMLAttributes } from 'react';
import { StyledTarget } from 'styled-components/dist/types';
import { ContainerWrapper, IStylesProps } from './styles';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  as?: StyledTarget<'web'>;
  $styleProps?: IStylesProps;
};

function Container({ children, as, $styleProps, ...props }: ContainerProps) {
  return (
    <ContainerWrapper as={as} $styleProps={$styleProps} {...props}>
      {children}
    </ContainerWrapper>
  );
}

export { Container, type ContainerProps };
