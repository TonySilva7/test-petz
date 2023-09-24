import { ComponentProps } from 'react';

type AlertDialogProps = ComponentProps<'div'>;

function AlertDialog({ ...props }: AlertDialogProps) {
  return (
    <div {...props}>
      <p>Title</p>
      <p>svg</p>
      <p>text</p>
      <p>button</p>
    </div>
  );
}

export { AlertDialog, type AlertDialogProps };
