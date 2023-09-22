import { STYLES } from '@/@redux/features';
import * as S from '@/@redux/store';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { IStylesProps } from '@/components/Container/styles';
import * as Fields from '@/components/Fields';
import { Form } from '@/components/Form';
import * as Input from '@/components/Input';
import * as Select from '@/components/Select';
import { Title } from '@/components/Title';
import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentProps, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

type HomeProps = ComponentProps<'main'>;

type IFormSchedule = {
  firstName: string;
  lastName: string;
  region: string;
  city: string;
  pokemonTeam: string;
  schedulingDate: string;
  schedulingTime: string;
};

export default function Schedule({ ...props }: HomeProps) {
  const dispatch = S.useAppDispatch();

  const fnSchema = () => {
    return Yup.object({
      firstName: Yup.string().required(`Nome é obrigatório`),
      lastName: Yup.string().required(`Sobrenome é obrigatório`),
      region: Yup.string().required(`Região é obrigatório`),
      city: Yup.string().required(`Cidade é obrigatório`),
      pokemonTeam: Yup.string().required(`Time é obrigatório`),
      schedulingDate: Yup.string().required(`Data é obrigatório`),
      schedulingTime: Yup.string().required(`Hora é obrigatório`),
    }).required();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormSchedule>({
    resolver: yupResolver(fnSchema()),
  });

  useEffect(() => {
    dispatch(
      STYLES.setTitleHeader({
        title: 'Agendar Consulta',
        subTitle: 'Recupere sues pokémons em 5 segundos',
      }),
    );
  }, [dispatch]);

  const submit = (data: IFormSchedule) => {
    alert(JSON.stringify(data));
  };

  const hasErrors = (keyError: keyof IFormSchedule) => {
    return Object.keys(errors).find((key) => key === keyError);
  };

  const theme = useTheme();

  const styles: IStylesProps = {
    m: {
      background: `${theme.colors.primary.dark}`,
    },
    d: {
      display: 'flex',
      gap: '0 1rem',
      'justify-content': 'space-between',
    },
  };

  return (
    <Container
      as="main"
      $styleProps={{
        m: {
          width: '100%',
        },
        d: {
          display: 'flex',
          'flex-direction': 'column',
          width: '100%',
          'align-items': 'center',
        },
      }}
      style={{ border: 'solid 2px pink' }}
      {...props}
    >
      <Title>Preencha o formulário abaixo para agendar sua consulta</Title>
      <Form onSubmit={handleSubmit(submit)}>
        <Container $styleProps={styles}>
          <Fields.Root>
            <Fields.Legend htmlFor="firstName">Nome</Fields.Legend>
            <Input.Control
              {...register('firstName')}
              id="firstName"
              placeholder="Digite seu nome"
            />
            {hasErrors('firstName') && (
              <Fields.Errors errors={[errors.firstName?.message]} />
            )}
          </Fields.Root>

          <Fields.Root>
            <Fields.Legend htmlFor="lastName">Sobrenome</Fields.Legend>
            <Input.Control
              {...register('lastName')}
              placeholder="Digite seu sobrenome"
              id="lastName"
            />
            {hasErrors('lastName') && (
              <Fields.Errors errors={[errors.lastName?.message]} />
            )}
          </Fields.Root>
        </Container>

        <Container $styleProps={styles}>
          <Fields.Root>
            <Fields.Legend htmlFor="region">Região</Fields.Legend>
            <Select.Control
              {...register('region')}
              placeholder="Selecione sua região"
              id="region"
            >
              <Select.Option value="">Selecione sua região</Select.Option>
              <Select.Option value="1">Paraná</Select.Option>
            </Select.Control>

            {hasErrors('region') && (
              <Fields.Errors errors={[errors.region?.message]} />
            )}
          </Fields.Root>

          <Fields.Root>
            <Fields.Legend htmlFor="city">Cidade</Fields.Legend>
            <Select.Control
              {...register('city')}
              placeholder="Selecione sua região"
              id="city"
            >
              <Select.Option value="1">Londrina</Select.Option>
            </Select.Control>

            {hasErrors('city') && (
              <Fields.Errors errors={[errors.city?.message]} />
            )}
          </Fields.Root>
        </Container>

        <h2>Cadastre seu time</h2>
        <p>Atendemos até 6 pokémons por vez</p>
        <Button
          type="button"
          $styleProps={{ width: { m: 28, d: 28 }, isTransparent: true }}
          style={{ border: 'solid 1px #1D1D1D' }}
        >
          Adicionar novo pokémon ao time... +
        </Button>

        <Container $styleProps={styles}>
          <Fields.Root>
            <Fields.Legend htmlFor="schedulingDate">
              Data para Atendimento
            </Fields.Legend>
            <Select.Control
              {...register('schedulingDate')}
              placeholder="Selecione sua região"
              id="schedulingDate"
            >
              <Select.Option value="1">12/04/04</Select.Option>
            </Select.Control>

            {hasErrors('schedulingDate') && (
              <Fields.Errors errors={[errors.schedulingDate?.message]} />
            )}
          </Fields.Root>

          <Fields.Root>
            <Fields.Legend htmlFor="schedulingTime">
              Horário de Atendimento
            </Fields.Legend>
            <Select.Control
              {...register('schedulingTime')}
              placeholder="Selecione sua região"
              id="schedulingTime"
            >
              <Select.Option value="1">12/04/04</Select.Option>
            </Select.Control>

            {hasErrors('schedulingTime') && (
              <Fields.Errors errors={[errors.schedulingTime?.message]} />
            )}
          </Fields.Root>
        </Container>

        <hr />

        <div>
          <p>Número de pokémons a serem atendidos:</p>
          <span>01</span>
        </div>
        <div>
          <p>Atendimento unitário por pokémon:</p>
          <span>R$ 70,00</span>
        </div>
        <div>
          <p>Subtotal:</p>
          <span>01</span>
        </div>
        <div>
          <p>Taxa geracional*:</p>
          <span>01</span>
        </div>
        <small>
          *adicionamos uma taxa de 3%, multiplicado pelo número da geração mais
          alta do time, com limite de até 30%
        </small>

        <div>
          <Title>Valor Total: R$ 72,10</Title>
          <Button type="submit">Concluir Agendamento</Button>
        </div>
      </Form>
    </Container>
  );
}

export { type HomeProps };
