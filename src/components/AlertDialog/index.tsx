import { ComponentProps, ElementType } from 'react';
import { useTheme } from 'styled-components';
import { Root } from '../Button';
import { Container } from '../Container';
import { Text } from '../Text';

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
        m: {
          display: 'flex',
          'flex-direction': 'column',
          border: `2px solid ${theme.colors.primary.medium}`,
          'border-radius': '0.8rem',
          height: '24.5rem',
          'text-align': 'center',
          'align-items': 'center',
          'justify-content': 'center',
          padding: '2rem',
          gap: '1.5rem',

          width: '37rem',
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
      <Root
        onClick={callback}
        $styleProps={{ size: { m: 1.2, d: 1.4 }, width: { m: 20, d: 20 } }}
      >
        Fazer Novo Agendamento
      </Root>
    </Container>
  );
}

export { AlertDialog, type AlertDialogProps };
