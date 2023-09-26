import * as API from '@/api';
import * as TYPE from '@/@types';
import SchedulePage from '@/containers/SchedulePage';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ComponentProps } from 'react';
import { ICity, IPokemon, IRegion } from '@/domain';
import { Text } from '@/components/Text';
import { AlertDialog } from '@/components/AlertDialog';
import { IconError } from '@/components/IconError';
import { Container } from '@/components/Container';
import { RedirectCard } from '@/containers/SchedulePage/form';

type HomeProps = ComponentProps<'main'> &
  InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Schedule({
  listDate,
  listTime,
  listPokemon,
  listRegion,
  listCity,
  error,
}: HomeProps) {
  if (error) {
    return <RedirectCard title="Ir para a Home" error={error} />;
  }
  return (
    <SchedulePage
      listDate={listDate}
      listTime={listTime}
      listPokemon={listPokemon}
      listRegion={listRegion}
      listCity={listCity}
    />
  );
}

export const getServerSideProps: GetServerSideProps<{
  listDate: Array<string>;
  listTime: Array<string>;
  listPokemon: Array<IPokemon>;
  listRegion: Array<IRegion>;
  listCity: Array<ICity>;
  error?: string;
}> = async () => {
  try {
    const resDate = await API.schedule.getDate();
    const listDate: Array<string> = resDate.data;

    const resTime = await API.schedule.getTime();
    const listTime: Array<string> = resTime.data;

    const resPokemon = await API.schedule.getPokemons();
    const dataPokemons: TYPE.IApiPokemon<IPokemon> = resPokemon.data;

    const resRegion = await API.schedule.getRegion();
    const dataRegion: TYPE.IApiPokemon<IRegion> = resRegion.data;

    const resCity = await API.schedule.getCity();
    const dataCity: TYPE.IApiPokemon<ICity> = resCity.data;

    return {
      props: {
        listDate,
        listTime,
        listPokemon: dataPokemons.results,
        listRegion: dataRegion.results,
        listCity: dataCity.results,
        error: '',
      },
    };
  } catch (error) {
    return {
      props: {
        listDate: [],
        listTime: [],
        listPokemon: [],
        listRegion: [],
        listCity: [],
        error: 'Oops! Parece que aconteceu um erro. Tente novamente mais tarde',
      },
    };
  }
};
