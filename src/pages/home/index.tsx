import Link from 'next/link';
import { ComponentProps } from 'react';

type HomeProps = ComponentProps<'div'>;

export default function Home({ ...props }: HomeProps) {
  return (
    <div {...props}>
      <h1>Hello Home</h1>
      <Link href="/about">Sobre</Link>
    </div>
  );
}

export { type HomeProps };
