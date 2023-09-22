import { ComponentProps, HTMLAttributes } from 'react';
import { ContainerWrapperProps } from '../Container/styles';
import {
  ErrorsWrapper,
  LegendWrapper,
  LegendWrapperProps,
  RootWrapper,
} from './styles';

type RootProps = HTMLAttributes<HTMLDivElement> & ContainerWrapperProps;
type LegendProps = ComponentProps<'label'> & LegendWrapperProps;
type ErrorsProps = ComponentProps<'ul'> & {
  errors: Array<string | undefined>;
};

function Root({ children, $styleProps, ...props }: RootProps) {
  return (
    <RootWrapper $styleProps={$styleProps} {...props}>
      {children}
    </RootWrapper>
  );
}

function Legend({ children, width, ...props }: LegendProps) {
  return (
    <LegendWrapper width={width} {...props}>
      {children}
    </LegendWrapper>
  );
}

function Errors({ errors, ...props }: ErrorsProps) {
  return (
    <ErrorsWrapper {...props}>
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ErrorsWrapper>
  );
}

export {
  Errors,
  Legend,
  Root,
  type ErrorsProps,
  type LegendProps,
  type RootProps,
};
