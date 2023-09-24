import { ComponentProps, ElementType, ReactElement } from 'react';
import { Container } from '../Container';
import { useTheme } from 'styled-components';
import { Text } from '../Text';
import { IconSuccess } from '../IconSuccess';
import { Button } from '../Button';

type AlertDialogProps = ComponentProps<'div'> & {
  title: string;
  icon: ElementType;
  message: string;
  callback: () => void;
};

function AlertDialog({ ...props }: AlertDialogProps) {
  const { title, icon: Icon, message, callback } = props;
  const theme = useTheme();
  return (
    <Container
      $styleProps={{
        d: {
          display: 'flex',
          'flex-direction': 'column',
          border: `2px solid ${theme.colors.primary.medium}`,
          'border-radius': '0.8rem',
          height: '24.5rem',
          width: '40.8rem',
          'text-align': 'center',
          'align-items': 'center',
          'justify-content': 'center',
          padding: '2rem',
          gap: '1.5rem',
        },
      }}
      {...props}
    >
      <Text fontSize={2} fontWeight={700}>
        {title}
      </Text>
      <Container as="span">
        <Icon />
      </Container>
      <Text fontSize={1.4} fontWeight={400} color={theme.colors.gray.medium}>
        {message}
      </Text>
      <Button onClick={callback} $styleProps={{ width: { m: 20, d: 20 } }}>
        Fazer Novo Agendamento
      </Button>
    </Container>
  );
}

export { AlertDialog, type AlertDialogProps };
