import { ComponentProps } from 'react';
import { DividerWrapper, DividerWrapperProps } from './styles';

type DividerProps = ComponentProps<'hr'> & DividerWrapperProps;

function Divider({ ...props }: DividerProps) {
  const { $width, $height, $margin, $backgroundColor } = props;
  return (
    <DividerWrapper
      $width={$width}
      $height={$height}
      $margin={$margin}
      $backgroundColor={$backgroundColor}
      {...props}
    />
  );
}

export { Divider, type DividerProps };
