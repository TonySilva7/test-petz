import { LinkProps } from 'next/link';
import { ReactNode } from 'react';
import { ButtonLinkWrapper, ButtonLinkWrapperProps } from './styles';

type ButtonLinkProps = LinkProps &
  ButtonLinkWrapperProps & {
    children: ReactNode;
  };

function ButtonLink({ children, $styleProps, ...linkProps }: ButtonLinkProps) {
  return (
    <ButtonLinkWrapper {...linkProps} $styleProps={$styleProps}>
      {children}
    </ButtonLinkWrapper>
  );
}

export { ButtonLink, type ButtonLinkProps };
