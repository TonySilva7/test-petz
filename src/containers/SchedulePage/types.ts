import { ICity, IPokemon, IRegion } from '@/domain';
import { FieldErrors, UseFormRegister, useFieldArray } from 'react-hook-form';
type IFormSchedule = {
  firstName: string;
  lastName: string;
  region: string;
  city: string;
  pokemonTeam?: { pokemon: string }[];
  schedulingDate: string;
  schedulingTime: string;
};

type IErrors = {
  errors: FieldErrors<IFormSchedule>;
};
type IHasErrors = {
  hasErrors: (keyError: keyof IFormSchedule) => boolean;
};
type IHandleError = {
  handleName: (name: string) => string;
};

type IRegister = {
  register: UseFormRegister<IFormSchedule>;
};

type SessionInfoCustomerProps = IErrors &
  IRegister &
  IHasErrors &
  IHandleError & {
    listRegion: IRegion[];
    listCity: ICity[];
  };

type SessionInfoPokemonTeamProps = IErrors &
  IRegister &
  IHasErrors &
  IHandleError & {
    fields: ReturnType<typeof useFieldArray>['fields'];
    listPokemon: IPokemon[];
    remove: ReturnType<typeof useFieldArray>['remove'];

    handleAddFields: () => void;
  };

type SessionDateTimeScheduleProps = IErrors &
  IRegister &
  IHasErrors & {
    listDate: Array<string>;
    listTime: Array<string>;
  };

type SessionResumeScheduleProps = {
  handleCountPokemon: () => string;
  handleSubTotal: () => number;
};

type SessionTotalProps = {
  handleTotal: () => number;
};

export type {
  IFormSchedule,
  SessionDateTimeScheduleProps,
  SessionInfoCustomerProps,
  SessionInfoPokemonTeamProps,
  SessionResumeScheduleProps,
  SessionTotalProps,
};
