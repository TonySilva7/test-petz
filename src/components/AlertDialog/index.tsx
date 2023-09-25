import { ComponentProps, ElementType } from 'react';
import { useTheme } from 'styled-components';
import * as Button from '../Button';
import { Container } from '../Container';
import { Text } from '../Text';
import { styesDialog } from './styles';

type AlertDialogProps = ComponentProps<'div'> & {
  title: string;
  icon: ElementType;
  message: string;
  callback: () => void;
};

function AlertDialog({
  title,
  icon: Icon,
  message,
  callback,
  ...props
}: AlertDialogProps) {
  const theme = useTheme();
  const { styleContainer, styleButton: buttonStyle } = styesDialog(theme);
  return (
    <Container $styleProps={styleContainer} {...props}>
      <Text fontSize={2} fontWeight={700}>
        {title}
      </Text>
      <Container as="span">
        <Icon />
      </Container>
      <Text fontSize={1.4} fontWeight={400} color={theme.colors.gray.medium}>
        {message}
      </Text>
      <Button.Root onClick={callback} $styleProps={buttonStyle}>
        Fazer Novo Agendamento
      </Button.Root>
    </Container>
  );
}

export { AlertDialog, type AlertDialogProps };
