import * as F from '@/@redux/features';
import { STYLES } from '@/@redux/features';
import * as S from '@/@redux/store';
import { AlertDialog } from '@/components/AlertDialog';

import { Container } from '@/components/Container';
import { Divider } from '@/components/Divider';

import { Form } from '@/components/Form';
import { IconError } from '@/components/IconError';
import { IconSuccess } from '@/components/IconSuccess';

import { Text } from '@/components/Text';
import { useValidationForm } from '@/hooks/useValidationForm';
import { getServerSideProps } from '@/pages/schedule';

import { yupResolver } from '@hookform/resolvers/yup';
import { InferGetServerSidePropsType } from 'next';
import { ComponentProps, useEffect, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import {
  SessionDateTimeSchedule,
  SessionInfoCustomer,
  SessionInfoPokemonTeam,
  SessionResumeSchedule,
  SessionTotal,
} from './form';
import { IFormSchedule } from './types';

type HomeProps = ComponentProps<'div'> &
  InferGetServerSidePropsType<typeof getServerSideProps>;

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
  >(null);

  const dispatch = S.useAppDispatch();
  const { highestGeneration } = S.useAppSelector(F.POKEMONS.selectPokemons);
  const schema = useValidationForm();
  const [consultedPokemon, setConsultedPokemon] = useState<string[]>([]);

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
  const selectedPokemon = useWatch({
    control,
    name: 'pokemonTeam',
    defaultValue: [],
  });

  useEffect(() => {
    dispatch(
      STYLES.setTitleHeader({
        title: 'Agendar Consulta',
        subTitle: 'Recupere sues pokémons em 5 segundos',
      }),
    );
  }, [dispatch]);

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
              register={register}
              hasErrors={hasErrors}
              errors={errors}
              listDate={listDate}
              listTime={listTime}
            />

            <Divider $margin={'1rem 0'} />

            <SessionResumeSchedule
              handleCountPokemon={handleCountPokemon}
              handleSubTotal={handleSubTotal}
            />

            <SessionTotal handleTotal={handleTotal} />
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
