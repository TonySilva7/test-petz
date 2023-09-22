import { ComponentProps } from 'react';
import {
  ErrorsWrapper,
  LegendWrapper,
  RootWrapper,
  RootWrapperProps,
} from './styles';

type RootProps = ComponentProps<'div'> & RootWrapperProps;
type LegendProps = ComponentProps<'label'>;
type ErrorsProps = ComponentProps<'ul'> & {
  errors: Array<string | undefined>;
};

function Root({ children, ...props }: RootProps) {
  return <RootWrapper {...props}>{children}</RootWrapper>;
}

function Legend({ children, ...props }: LegendProps) {
  return <LegendWrapper {...props}>{children}</LegendWrapper>;
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
  Root,
  Legend,
  Errors,
  type RootProps,
  type LegendProps,
  type ErrorsProps,
};
