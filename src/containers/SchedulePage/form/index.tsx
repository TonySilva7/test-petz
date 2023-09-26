import { Container } from '@/components/Container';
import { theme } from '@/styles/theme';
import { formatReal } from '@/utils';
import { Text } from '@/components/Text';
import * as Button from '@/components/Button';
import * as Fields from '@/components/Fields';
import * as Input from '@/components/Input';
import * as Select from '@/components/Select';
import {
  SessionInfoCustomerProps,
  SessionInfoPokemonTeamProps,
  IFormSchedule,
  SessionDateTimeScheduleProps,
  SessionResumeScheduleProps,
  SessionTotalProps,
} from '../types';
import {
  containerStyles,
  selectStyles,
  resumeScheduleStyles,
  textStyles,
} from '../styles';
import { ICity, IPokemon, IRegion } from '@/domain';
import { AlertDialog } from '@/components/AlertDialog';
import { IconError } from '@/components/IconError';
import { useRouter } from 'next/router';

export function SessionInfoCustomer({
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
            {listRegion.map((region: IRegion) => (
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
            {listCity.map((city: ICity) => (
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
          m: {
            display: 'flex',
            'flex-direction': 'column',
            gap: '1rem 0',
          },
          d: {
            width: '100%',
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
              flex: '1 1 100%',
              'justify-content': 'center',
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
                  'align-items': 'center',
                  'flex-direction': 'row',
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
                {listPokemon.map((pokemon: IPokemon) => (
                  <Select.Option value={pokemon.name} key={pokemon.name}>
                    {handleName(pokemon.name)}
                  </Select.Option>
                ))}
              </Select.Control>
            </Container>
            <Button.Root
              type="button"
              $styleProps={{
                m: {
                  'font-size': '2rem',
                  background: 'transparent',
                  margin: '2rem 0 0 0.5rem',
                },
                d: {
                  margin: '0 0 0 0.5rem',
                },
              }}
              onClick={() => remove(index)}
            >
              &times;
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

export function SessionDateTimeSchedule({
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

export function SessionResumeSchedule({
  handleCountPokemon,
  handleSubTotal,
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
        <Text {...textStyles(theme)}>
          Número de pokémons a serem atendidos:
        </Text>
        <Text {...textStyles(theme)}>{handleCountPokemon()}</Text>
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
        <Text {...textStyles(theme)}>Atendimento unitário por pokémon:</Text>
        <Text {...textStyles(theme)}>R$ 70,00</Text>
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
        <Text {...textStyles(theme)}>Subtotal:</Text>
        <Text {...textStyles(theme)}>{`R$ ${formatReal(
          handleSubTotal(),
        )}`}</Text>
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
        <Text {...textStyles(theme)}>Taxa geracional*:</Text>
        <Text {...textStyles(theme)}>R$ 2,10</Text>
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

export function SessionTotal({ handleTotal }: SessionTotalProps) {
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
      <Button.Root
        $styleProps={{
          d: {
            width: '18.3rem',
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
      </Button.Root>
    </Container>
  );
}

export function RedirectCard({
  error,
  title,
}: {
  error: string;
  title?: string;
}) {
  // create navigate home
  const navigate = useRouter();
  const handleNavigateHome = () => {
    navigate.push('/');
  };

  return (
    <Container
      $styleProps={{
        m: {
          'min-height': 'calc(100vh - 33.6rem)',
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
      }}
    >
      <AlertDialog
        title="Ocorreu um erro!"
        icon={IconError}
        callback={handleNavigateHome}
        message={error}
        titleButton={title}
      />
    </Container>
  );
}
