import { ComponentProps } from 'react';

type AboutProps = ComponentProps<'div'>;

export default function About({ ...props }: AboutProps) {
  return (
    <div {...props}>
      <h1> Hello About</h1>
    </div>
  );
}

export { type AboutProps };
