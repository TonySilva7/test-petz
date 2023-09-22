import { STYLES } from '@/@redux/features';
import * as S from '@/@redux/store';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { IStylesProps } from '@/components/Container/styles';
import * as Fields from '@/components/Fields';
import { Form } from '@/components/Form';
import * as Input from '@/components/Input';
import * as Select from '@/components/Select';
import { Text } from '@/components/Text';
import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentProps, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

type HomeProps = ComponentProps<'main'>;

type IFormSchedule = {
  firstName: string;
  lastName: string;
  region: string;
  city: string;
  pokemonTeam?: { pokemon: string }[];
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

      pokemonTeam: Yup.array().of(
        Yup.object().shape({
          pokemon: Yup.string().required('Pokémon é obrigatório'),
        }),
      ),

      schedulingDate: Yup.string().required(`Data é obrigatório`),
      schedulingTime: Yup.string().required(`Hora é obrigatório`),
    }).required();
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormSchedule>({
    resolver: yupResolver(fnSchema()),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'pokemonTeam',
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
    const listErrors = Object.keys(errors);
    if (!listErrors.length) return false;

    if (keyError.includes('pokemonTeam')) {
      const match = keyError.match(/\[(\d+)\]/);
      if (match) {
        const index = Number(match[1]);
        const hasError = errors.pokemonTeam?.[index]?.pokemon?.message;
        return !!hasError;
      }
    }

    const hasError = listErrors.includes(keyError);
    return hasError;
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

  const textStyles = {
    as: 'p',
    fontSize: 1.4,
    fontWeight: 400,
    color: theme.colors.gray.medium,
  };

  const resumeScheduleStyles: IStylesProps = {
    m: {
      display: 'flex',
    },
    d: {
      display: 'flex',
      'justify-content': 'space-between',
    },
  };

  const selectStyles: IStylesProps = {
    d: {
      display: 'flex',
      'flex-direction': 'column',
      width: '26.5rem',
      gap: '1rem 0',
    },
  };

  const handleAddFields = () => {
    append({ pokemon: '' });
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
          padding: '3rem 0',
        },
      }}
      style={{ border: 'solid 2px pink' }}
      {...props}
    >
      <Text>Preencha o formulário abaixo para agendar sua consulta</Text>
      <Form onSubmit={handleSubmit(submit)}>
        <Container $styleProps={styles}>
          <Fields.Root $styleProps={selectStyles}>
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

          <Fields.Root $styleProps={selectStyles}>
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
          <Fields.Root $styleProps={selectStyles}>
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

          <Fields.Root $styleProps={selectStyles}>
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

        <Container
          $styleProps={{
            d: {
              display: 'flex',
              'flex-direction': 'column',
              padding: '1rem 0',
              gap: '2rem 1rem',
            },
          }}
        >
          <Container
            $styleProps={{
              d: { display: 'flex', 'flex-direction': 'column', gap: '1rem 0' },
            }}
          >
            <Text fontSize={1.2} fontWeight={700}>
              Cadastre seu time
            </Text>
            <Text
              as="p"
              fontSize={1.2}
              fontWeight={500}
              color={theme.colors.gray.medium}
            >
              Atendemos até 6 pokémons por vez
            </Text>
          </Container>
          {fields.map((field, index) => (
            <Container
              key={field.id}
              $styleProps={{
                m: {
                  display: 'flex',
                  'flex-direction': 'column',
                },
                d: {
                  display: 'flex',
                  'flex-direction': 'row',
                  'justify-content': 'center',
                  'align-items': 'center',
                  gap: '0 0.5rem',
                },
              }}
            >
              <Fields.Root
                $styleProps={{
                  ...selectStyles,
                  d: {
                    display: 'inline-flex',
                    flex: '1 1 auto',
                    'align-items': 'center',
                  },
                }}
              >
                <Fields.Legend
                  width="8.5rem"
                  htmlFor={`pokemonTeam[${index}].pokemon`}
                >
                  {`Pokémon ${index + 1}`}
                </Fields.Legend>
                <Select.Control
                  {...register(
                    `pokemonTeam[${index}].pokemon` as keyof IFormSchedule,
                  )}
                  placeholder="Selecione seu pokémon"
                  id={`pokemonTeam[${index}].pokemon`}
                >
                  <Select.Option value="1">Pokemon 01</Select.Option>
                  <Select.Option value="2">Pokemon 02</Select.Option>
                  <Select.Option value="3">Pokemon 03</Select.Option>
                </Select.Control>

                {hasErrors(
                  `pokemonTeam[${index}].pokemon` as keyof IFormSchedule,
                ) && (
                  <Fields.Errors
                    errors={[
                      errors.pokemonTeam?.[index]?.pokemon?.message ?? '',
                    ]}
                  />
                )}
              </Fields.Root>

              <Button
                type="button"
                $styleProps={{
                  width: { m: 3, d: 3 },
                  height: { m: 3, d: 3 },
                  isTransparent: true,
                }}
                onClick={() => remove(index)}
              >
                <Text
                  as="p"
                  fontSize={2}
                  fontWeight={500}
                  color={theme.colors.lightBlack}
                >
                  &times;
                </Text>
              </Button>
            </Container>
          ))}

          <Button
            type="button"
            $styleProps={{ width: { m: 28, d: 28 }, isTransparent: true }}
            style={{ border: 'solid 1px #1D1D1D' }}
            onClick={handleAddFields}
          >
            Adicionar novo pokémon ao time... +
          </Button>
        </Container>

        <Container $styleProps={styles}>
          <Fields.Root $styleProps={selectStyles}>
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

          <Fields.Root $styleProps={selectStyles}>
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

        <Container $styleProps={resumeScheduleStyles}>
          <Text {...textStyles}>Número de pokémons a serem atendidos:</Text>
          <Text {...textStyles}>01</Text>
        </Container>
        <Container $styleProps={resumeScheduleStyles}>
          <Text {...textStyles}>Atendimento unitário por pokémon:</Text>
          <Text {...textStyles}>R$ 70,00</Text>
        </Container>
        <Container $styleProps={resumeScheduleStyles}>
          <Text {...textStyles}>Subtotal:</Text>
          <Text {...textStyles}>R$ 70,00</Text>
        </Container>
        <Container $styleProps={resumeScheduleStyles}>
          <Text {...textStyles}>Taxa geracional*:</Text>
          <Text {...textStyles}>R$ 2,10</Text>
        </Container>
        <Container as={'small'}>
          *adicionamos uma taxa de 3%, multiplicado pelo número da geração mais
          alta do time, com limite de até 30%
        </Container>

        <Container $styleProps={resumeScheduleStyles}>
          <Text>Valor Total: R$ 72,10</Text>
          <Button type="submit">Concluir Agendamento</Button>
        </Container>
      </Form>
    </Container>
  );
}

export { type HomeProps };
