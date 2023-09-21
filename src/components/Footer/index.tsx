import { ComponentProps } from 'react';
import { FooterWrapper } from './styles';

type FooterProps = ComponentProps<'div'>;

function Footer({ ...props }: FooterProps) {
  return (
    <FooterWrapper {...props}>
      <p>
        Todas as marcas e ilustrações utilizadas são de seus resepctivos donos.
      </p>
    </FooterWrapper>
  );
}

export { Footer, type FooterProps };
