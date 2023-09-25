import { ComponentWrapperProps } from '@/@types/styles';
import { ButtonWrapper, PrefixWrapper, PrefixWrapperProps } from './styles';

type PrefixProps = PrefixWrapperProps;
type ButtonProps = ComponentWrapperProps<'button'>;

function Root({ children, $styleProps, ...rest }: ButtonProps) {
  return (
    <ButtonWrapper $styleProps={$styleProps} {...rest}>
      {children}
    </ButtonWrapper>
  );
}

function Prefix({ children, $styleProps, $isLoading, ...props }: PrefixProps) {
  return (
    <PrefixWrapper $styleProps={$styleProps} $isLoading={$isLoading} {...props}>
      {children}
    </PrefixWrapper>
  );
}

export { Root, Prefix, type ButtonProps, type PrefixProps };
