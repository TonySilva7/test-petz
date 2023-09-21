import Link from 'next/link';
import { ComponentProps } from 'react';

type HomeProps = ComponentProps<'div'>;

export default function Schedule({ ...props }: HomeProps) {
  return (
    <div {...props}>
      <h1>Hello Schedule</h1>
      <Link href="/about">Sobre</Link>
    </div>
  );
}

export { type HomeProps };
