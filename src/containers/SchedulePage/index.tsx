import * as F from '@/@redux/features';
import { STYLES } from '@/@redux/features';
import { selectStyles } from '@/@redux/features/styles';
import * as S from '@/@redux/store';
import { AlertDialog } from '@/components/AlertDialog';
import * as Button from '@/components/Button';
import { Root } from '@/components/Button';
import { Container } from '@/components/Container';
import { IStylesProps } from '@/components/Container/styles';
import { Divider } from '@/components/Divider';
import * as Fields from '@/components/Fields';
import { Form } from '@/components/Form';
import { IconError } from '@/components/IconError';
import { IconSuccess } from '@/components/IconSuccess';
import * as Input from '@/components/Input';
import * as Select from '@/components/Select';
import { Text } from '@/components/Text';
import { useValidationForm } from '@/hooks/useValidationForm';
import { getServerSideProps } from '@/pages/schedule';
import { theme } from '@/styles/theme';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferGetServerSidePropsType } from 'next';
import { ComponentProps, useEffect, useState } from 'react';
import {
  FieldErrors,
  UseFormRegister,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';
import { useTheme } from 'styled-components';

type HomeProps = ComponentProps<'main'> &
  InferGetServerSidePropsType<typeof getServerSideProps>;

type IFormSchedule = {
  firstName: string;
  lastName: string;
  region: string;
  city: string;
  pokemonTeam?: { pokemon: string }[];
  schedulingDate: string;
  schedulingTime: string;
};

export default function SchedulePage({
  listDate,
  listTime,
  listPokemon,
  listRegion,
  listCity,
  ...props
}: HomeProps) {
  const [statusCreateSchedule, setStatusCreateSchedule] = useState<
    null | 'success' | 'error'
  >('error');

  const dispatch = S.useAppDispatch();
  const { highestGeneration } = S.useAppSelector(F.POKEMONS.selectPokemons);

  const schema = useValidationForm();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm<IFormSchedule>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      region: '',
      city: '',
      pokemonTeam: [],
      schedulingDate: '',
      schedulingTime: '',
    },
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

  const [consultedPokemon, setConsultedPokemon] = useState<string[]>([]);
  const selectedPokemon = useWatch({
    control,
    name: 'pokemonTeam',
    defaultValue: [],
  });

  useEffect(() => {
    if (!selectedPokemon?.length) return;

    selectedPokemon.forEach((field) => {
      if (!field.pokemon) return;
      if (consultedPokemon.includes(field.pokemon)) return;

      dispatch(F.POKEMONS.handleGetGenerationByName({ name: field.pokemon }));
      setConsultedPokemon((prev) => [...prev, field.pokemon]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedPokemon]);

  const submit = (data: IFormSchedule) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
        setConsultedPokemon([]);
        setStatusCreateSchedule('success');
      }, 2000);
    });
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

  const containerStyles: IStylesProps = {
    m: {
      display: 'flex',
      'flex-direction': 'column',
      gap: '1rem 1rem',
      'justify-content': 'space-between',
    },
    d: {
      display: 'flex',
      gap: '0 1rem',
      'justify-content': 'space-between',
    },
  };

  const textStyles: object = {
    as: 'p',
    fontSize: 1.4,
    fontWeight: 400,
    color: theme.colors.gray.medium,
  };

  const resumeScheduleStyles: IStylesProps = {
    m: {
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
      gap: '2rem 0',
      'justify-content': 'space-between',
    },
    d: {
      display: 'flex',
      'justify-content': 'space-between',
    },
  };

  const selectStyles: IStylesProps = {
    m: {
      display: 'flex',
      'flex-direction': 'column',
      gap: '1rem',
    },
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

  const handleName = (name: string) => {
    if (name.includes('-')) {
      const nameSplit = name.split('-');
      const namePascal = nameSplit.map((name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
      });

      const nameJoin = namePascal.join(' ');
      return nameJoin;
    }

    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleNewScheduling = () => {
    setValue('firstName', '');
    setValue('lastName', '');
    setValue('region', '');
    setValue('city', '');
    setValue('pokemonTeam', []);
    setValue('schedulingDate', '');
    setValue('schedulingTime', '');

    setStatusCreateSchedule(null);
  };

  const handleSubTotal = () => {
    const pokemons = handleFilterListPokemons();
    const total = pokemons.length * 70.0;
    return total;
  };

  const handleFilterListPokemons = () => {
    const list = getValues('pokemonTeam');
    const pokemons = list?.filter((item) => item.pokemon !== '');
    return pokemons ?? [];
  };

  const handleCountPokemon = () => {
    const pokemons = handleFilterListPokemons();
    const total = pokemons.length;
    return total === 0 ? String(0) : total.toString().padStart(2, '0');
  };

  function formatReal(value: number) {
    const withDecimals = value.toFixed(2);
    const formattedNumber = withDecimals.toString().replace('.', ',');
    return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  const handleGenerationTax = () => {
    if (highestGeneration.genInNumber === 0) return 0;
    const generationTax = 0.03 * highestGeneration.genInNumber;
    const generationTaxLimit = 0.3;

    if (generationTax > generationTaxLimit) {
      return generationTaxLimit;
    }

    return generationTax;
  };

  const handleTotal = () => {
    const pokemons = handleFilterListPokemons();

    if (!pokemons || pokemons.length === 0) return 0;

    const total = pokemons.length * 70.0;
    const generationTax = handleGenerationTax();
    const totalGenerationTax = total * generationTax;
    const totalWithGenerationTax = total + totalGenerationTax;

    return totalWithGenerationTax;
  };

  return (
    <Container
      as="main"
      $styleProps={{
        m: {
          width: '100%',
          display: 'flex',
          'flex-direction': 'column',
          'align-items': 'center',
          'justify-content': 'center',
          padding: '3rem 1rem',
          'min-height': 'calc(100vh - 30rem)',
        },
        d: {
          display: 'flex',
          'flex-direction': 'column',
          width: '100%',
          'align-items': 'center',
          'justify-content': 'center',
          padding: '3rem 0',
          'min-height': 'calc(100vh - 36.3rem)',
        },
      }}
      {...props}
    >
      {statusCreateSchedule === null ? (
        <>
          <Text>Preencha o formulário abaixo para agendar sua consulta</Text>
          <Form onSubmit={handleSubmit(submit)}>
            <SessionInfoCustomer
              containerStyles={containerStyles}
              selectStyles={selectStyles}
              errors={errors}
              listRegion={listRegion}
              listCity={listCity}
              register={register}
              hasErrors={hasErrors}
              handleName={handleName}
            />

            <SessionInfoPokemonTeam
              fields={fields}
              listPokemon={listPokemon}
              remove={remove}
              register={register}
              handleName={handleName}
              hasErrors={hasErrors}
              errors={errors}
              handleAddFields={handleAddFields}
            />

            <SessionDateTimeSchedule
              containerStyles={containerStyles}
              selectStyles={selectStyles}
              register={register}
              hasErrors={hasErrors}
              errors={errors}
              listDate={listDate}
              listTime={listTime}
            />

            <Divider $margin={'1rem 0'} />

            <SessionResumeSchedule
              textStyles={textStyles}
              resumeScheduleStyles={resumeScheduleStyles}
              handleCountPokemon={handleCountPokemon}
              handleSubTotal={handleSubTotal}
              formatReal={formatReal}
            />

            <SessionTotal
              resumeScheduleStyles={resumeScheduleStyles}
              handleTotal={handleTotal}
              formatReal={formatReal}
            />
          </Form>
        </>
      ) : (
        <AlertDialog
          title={
            statusCreateSchedule === 'success'
              ? 'Consulta Agendada'
              : 'Houve um problema no agendamento'
          }
          icon={statusCreateSchedule === 'success' ? IconSuccess : IconError}
          message={
            statusCreateSchedule === 'success'
              ? `Seu agendamento para dia ${getValues(
                  'schedulingDate',
                )}, às ${getValues('schedulingTime')},
            para ${getValues('pokemonTeam')
              ?.length} pokémons foi realizado com sucesso!`
              : '//TODO: definir mensagem'
          }
          callback={handleNewScheduling}
        />
      )}
    </Container>
  );
}

export { type HomeProps };

type IResult = {
  name: string;
  url: string;
};

type SessionInfoCustomerProps = {
  containerStyles: IStylesProps;
  selectStyles: IStylesProps;
  errors: FieldErrors<IFormSchedule>;
  listRegion: IResult[];
  listCity: IResult[];
  register: UseFormRegister<IFormSchedule>;
  hasErrors: (keyError: keyof IFormSchedule) => boolean;
  handleName: (name: string) => string;
};
export function SessionInfoCustomer({
  containerStyles,
  selectStyles,
  errors,
  listRegion,
  listCity,
  register,
  hasErrors,
  handleName,
}: SessionInfoCustomerProps) {
  return (
    <>
      <Container $styleProps={containerStyles}>
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

      <Container $styleProps={containerStyles}>
        <Fields.Root $styleProps={selectStyles}>
          <Fields.Legend htmlFor="region">Região</Fields.Legend>
          <Select.Control
            {...register('region')}
            placeholder="Selecione sua região"
            id="region"
          >
            <Select.Option id="default" value="" disabled>
              Selecione sua região
            </Select.Option>
            {listRegion.map((region: IResult) => (
              <Select.Option value={region.name} key={region.name}>
                {handleName(region.name)}
              </Select.Option>
            ))}
          </Select.Control>

          {hasErrors('region') && (
            <Fields.Errors errors={[errors.region?.message]} />
          )}
        </Fields.Root>

        <Fields.Root $styleProps={selectStyles}>
          <Fields.Legend htmlFor="city">Cidade</Fields.Legend>
          <Select.Control
            {...register('city')}
            placeholder="Selecione sua cidade"
            id="city"
          >
            <Select.Option id="default" value="" disabled>
              Selecione sua cidade
            </Select.Option>
            {listCity.map((city: IResult) => (
              <Select.Option value={city.name} key={city.name}>
                {handleName(city.name)}
              </Select.Option>
            ))}
          </Select.Control>

          {hasErrors('city') && (
            <Fields.Errors errors={[errors.city?.message]} />
          )}
        </Fields.Root>
      </Container>
    </>
  );
}

type SessionInfoPokemonTeamProps = {
  fields: ReturnType<typeof useFieldArray>['fields'];
  listPokemon: IResult[];
  remove: ReturnType<typeof useFieldArray>['remove'];
  register: UseFormRegister<IFormSchedule>;
  handleName: (name: string) => string;
  hasErrors: (keyError: keyof IFormSchedule) => boolean;
  errors: FieldErrors<IFormSchedule>;
  handleAddFields: () => void;
};
export function SessionInfoPokemonTeam({
  fields,
  listPokemon,
  errors,
  remove,
  register,
  handleName,
  hasErrors,
  handleAddFields,
}: SessionInfoPokemonTeamProps) {
  return (
    <Container
      $styleProps={{
        d: {
          display: 'flex',
          'flex-direction': 'column',
          padding: '1rem 0',
          gap: '2rem 1rem',
        },
        m: {
          display: 'flex',
          'flex-direction': 'column',
          'align-items': 'center',
          padding: '1rem 0',
          gap: '2rem 1rem',
        },
      }}
    >
      <Container
        $styleProps={{
          d: {
            display: 'flex',
            'flex-direction': 'column',
            gap: '1rem 0',
          },
          m: {
            display: 'flex',
            'flex-direction': 'column',
            gap: '1rem 0',
          },
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
        <Fields.Root
          key={field.id}
          $styleProps={{
            ...selectStyles,
            d: {
              display: 'flex',
              'flex-direction': 'column',
              flex: '1 1 100%',
              'justify-content': 'center',
              gap: '1rem',
            },
            m: {
              display: 'flex',
              'flex-direction': 'column',
              width: '100%',
              gap: '1rem',
            },
          }}
        >
          <Container
            $styleProps={{
              d: {
                display: 'flex',
                'align-items': 'center',
              },
              m: {
                display: 'inline-flex',
                width: '100%',
                flex: '1 1 100%',
                'align-items': 'center',
              },
            }}
          >
            <Container
              $styleProps={{
                d: {
                  display: 'flex',
                  flex: '1 1 auto',
                  'align-items': 'center',
                },
                m: {
                  display: 'flex',
                  'flex-direction': 'column',
                  flex: '1 1 auto',
                  gap: '1rem',
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
                <Select.Option id="default" value="" disabled>
                  Selecione seu pokémon
                </Select.Option>
                {listPokemon.map((pokemon: IResult) => (
                  <Select.Option value={pokemon.name} key={pokemon.name}>
                    {handleName(pokemon.name)}
                  </Select.Option>
                ))}
              </Select.Control>
            </Container>
            <Button.Root
              type="button"
              $styleProps={{
                d: {
                  'font-size': '2rem',
                  background: 'transparent',
                  margin: '0 0 0 0.5rem',
                },
              }}
              onClick={() => remove(index)}
            >
              {/* <Text
              as="p"
              fontSize={2}
              fontWeight={500}
              color={theme.colors.lightBlack}
            > */}
              &times;
              {/* </Text> */}
            </Button.Root>
          </Container>

          {hasErrors(
            `pokemonTeam[${index}].pokemon` as keyof IFormSchedule,
          ) && (
            <Fields.Errors
              errors={[errors.pokemonTeam?.[index]?.pokemon?.message ?? '']}
            />
          )}
        </Fields.Root>
      ))}

      <Button.Root
        type="button"
        $styleProps={{
          d: {
            width: '25.3rem',
            height: '4.2rem',
            'border-radius': '20rem',
            border: `solid 1px ${theme.colors.lightBlack}`,
            background: 'transparent',
            'font-weight': 700,
            'font-size': '1.2rem',
          },
          m: {
            width: '25.3rem',
            height: '4.2rem',
            'border-radius': '20rem',
            border: `solid 1px ${theme.colors.lightBlack}`,
            background: 'transparent',
            'font-weight': 700,
            'font-size': '1.2rem',
          },
        }}
        onClick={handleAddFields}
      >
        Adicionar novo pokémon ao time... +
      </Button.Root>
    </Container>
  );
}

type SessionDateTimeScheduleProps = {
  containerStyles: IStylesProps;
  selectStyles: IStylesProps;
  register: UseFormRegister<IFormSchedule>;
  hasErrors: (keyError: keyof IFormSchedule) => boolean;
  errors: FieldErrors<IFormSchedule>;
  listDate: Array<string>;
  listTime: Array<string>;
};
export function SessionDateTimeSchedule({
  containerStyles,
  selectStyles,
  register,
  hasErrors,
  errors,
  listDate,
  listTime,
}: SessionDateTimeScheduleProps) {
  return (
    <Container $styleProps={containerStyles}>
      <Fields.Root $styleProps={selectStyles}>
        <Fields.Legend htmlFor="schedulingDate">
          Data para Atendimento
        </Fields.Legend>
        <Select.Control
          {...register('schedulingDate')}
          placeholder="Selecione uma data"
          id="schedulingDate"
        >
          <Select.Option value="" disabled>
            Selecione uma data
          </Select.Option>

          {listDate.map((date: string) => (
            <Select.Option value={date} key={date}>
              {date}
            </Select.Option>
          ))}
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
          placeholder="Selecione um horário"
          id="schedulingTime"
        >
          <Select.Option id="default" value="" disabled>
            Selecione um horário
          </Select.Option>
          {listTime.map((time: string) => (
            <Select.Option value={time} key={time}>
              {time}
            </Select.Option>
          ))}
        </Select.Control>

        {hasErrors('schedulingTime') && (
          <Fields.Errors errors={[errors.schedulingTime?.message]} />
        )}
      </Fields.Root>
    </Container>
  );
}

type SessionResumeScheduleProps = {
  textStyles: object;
  resumeScheduleStyles: IStylesProps;
  handleCountPokemon: () => string;
  handleSubTotal: () => number;
  formatReal: (value: number) => string;
};
export function SessionResumeSchedule({
  textStyles,
  resumeScheduleStyles,
  handleCountPokemon,
  handleSubTotal,
  formatReal,
}: SessionResumeScheduleProps) {
  return (
    <>
      <Container
        $styleProps={{
          ...resumeScheduleStyles,
          m: {
            ...resumeScheduleStyles.m,
            'flex-direction': 'row',
          },
        }}
      >
        <Text {...textStyles}>Número de pokémons a serem atendidos:</Text>
        <Text {...textStyles}>{handleCountPokemon()}</Text>
      </Container>
      <Container
        $styleProps={{
          ...resumeScheduleStyles,
          m: {
            ...resumeScheduleStyles.m,
            'flex-direction': 'row',
          },
        }}
      >
        <Text {...textStyles}>Atendimento unitário por pokémon:</Text>
        <Text {...textStyles}>R$ 70,00</Text>
      </Container>
      <Container
        $styleProps={{
          ...resumeScheduleStyles,
          m: {
            ...resumeScheduleStyles.m,
            'flex-direction': 'row',
          },
        }}
      >
        <Text {...textStyles}>Subtotal:</Text>
        <Text {...textStyles}>{`R$ ${formatReal(handleSubTotal())}`}</Text>
      </Container>
      <Container
        $styleProps={{
          ...resumeScheduleStyles,
          m: {
            ...resumeScheduleStyles.m,
            'flex-direction': 'row',
          },
        }}
      >
        <Text {...textStyles}>Taxa geracional*:</Text>
        <Text {...textStyles}>R$ 2,10</Text>
      </Container>
      <Container
        $styleProps={{
          m: {
            padding: '0 6rem',
            'text-align': 'center',
          },
        }}
      >
        <Text as={'small'} fontSize={0.8} color={theme.colors.gray.medium}>
          *adicionamos uma taxa de 3%, multiplicado pelo número da geração mais
          alta do time, com limite de até 30%
        </Text>
      </Container>
    </>
  );
}

type SessionTotalProps = {
  resumeScheduleStyles: IStylesProps;
  handleTotal: () => number;
  formatReal: (value: number) => string;
};
export function SessionTotal({
  resumeScheduleStyles,
  handleTotal,
  formatReal,
}: SessionTotalProps) {
  return (
    <Container
      $styleProps={{
        ...resumeScheduleStyles,
        d: {
          ...resumeScheduleStyles.d,
          padding: '2.5rem 0 0 0',
        },
      }}
    >
      <Text>Valor Total: {`R$ ${formatReal(handleTotal())}`}</Text>
      <Root
        $styleProps={{
          d: {
            width: '18.3rem',
            height: '4.2rem',
            'border-radius': '20rem',
            background: theme.colors.primary.dark,
            color: theme.colors.secondary,
            'font-weight': 700,
            'font-size': '1.4rem',
          },
          m: {
            height: '4.2rem',
            width: '21rem',
            'border-radius': '20rem',
            background: theme.colors.primary.dark,
            color: theme.colors.secondary,
            'font-weight': 700,
            'font-size': '1.4rem',
          },
        }}
        type="submit"
      >
        Concluir Agendamento
      </Root>
    </Container>
  );
}
