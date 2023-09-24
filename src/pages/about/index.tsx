import { ABOUT } from '@/containers';
import { ComponentProps } from 'react';

type AboutProps = ComponentProps<'main'>;

export default function About({ ...props }: AboutProps) {
  return (
    <ABOUT.Root {...props}>
      <ABOUT.MainTitle />
      <ABOUT.Sections />
    </ABOUT.Root>
  );
}

export { type AboutProps };
