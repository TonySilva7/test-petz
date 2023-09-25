import * as API from '@/api';
import * as TYPE from '@/@types';
import SchedulePage from '@/containers/SchedulePage';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ComponentProps } from 'react';
import { ICity, IPokemon, IRegion } from '@/domain';

type HomeProps = ComponentProps<'main'> &
  InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Schedule({
  listDate,
  listTime,
  listPokemon,
  listRegion,
  listCity,
  ...props
}: HomeProps) {
  return (
    <SchedulePage
      listDate={listDate}
      listTime={listTime}
      listPokemon={listPokemon}
      listRegion={listRegion}
      listCity={listCity}
      {...props}
    />
  );
}

// type IResult = {
//   name: string;
//   url: string;
// };
// type IApiPokemon = {
//   count: number;
//   next: string;
//   previous: string | null;
//   results: Array<IResult>;
// };
export const getServerSideProps: GetServerSideProps<{
  listDate: Array<string>;
  listTime: Array<string>;
  listPokemon: Array<TYPE.IResult>;
  listRegion: Array<TYPE.IResult>;
  listCity: Array<TYPE.IResult>;
}> = async () => {
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
    },
  };
};
