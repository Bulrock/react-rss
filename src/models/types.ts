import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

export interface IRollerProps {
  classRoller: string;
}

export interface ICharacter {
  id: number | string;
  name: string;
  status: string;
  species: string;
  type: string | null;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ICharactersResult {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: ICharacter[];
}

export interface IError {
  error: string;
}

export type errorResult = FetchBaseQueryError;

export interface ISearchState {
  value: string;
}

export interface ICardState {
  id: string;
}

export interface ICharactersFetchState {
  searchResults: ICharacter[] | errorResult;
  // characterModal: ICharacter | errorResult;
  // formCharacterModal: ICharacter;
}

export interface IStateRepository {
  value: (number | string)[];
}

export interface ICharacterFormState {
  value: ICharacter[];
}

export type ResponseResult = ICharactersResult | ICharacter | IError | undefined;

export type CharectersFetchResult = ICharacter[] | ICharacter | IError | undefined;

export interface IStateFunction {
  (key: number | string): boolean | void;
}

export interface IViewRepository {
  add: (key: number) => void;
  remove: (key: number) => void;
  findView: (key: number) => boolean;
}

export interface IHeaderProps {
  hideSearch: boolean;
}

export interface ICardProps {
  character: ICharacter | errorResult;
  onCharacterCardClick?: (character: ICharacter) => void;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  canDraw: boolean | undefined;
}

export interface IModalProps {
  characterModal: ICharacter | errorResult | undefined;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  isModalError: boolean;
  isFetching: boolean;
}

export interface ICardsProps {
  characters: ICharacter[] | ICharacter | errorResult;
  onCharacterCardClick?: (character: ICharacter) => void;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  canDraw: boolean | undefined;
}

export interface IHomePageProps {
  // onCharacterCardClick: (character: ICharacter) => void;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IFormPageProps {
  onCharacterCardClick: (character: ICharacter) => void;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  canDraw?: boolean | undefined;
}

export interface IFormFieldProps {
  formField: IFormField;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
}

export enum RegisterOptions {
  image = 'image',
  name = 'name',
  status = 'status',
  species = 'species',
  gender = 'gender',
  origin = 'origin',
  location = 'location',
  date = 'date',
  consest = 'consest',
}

export interface IFormField {
  type: string;
  ids: string[];
  register:
    | 'image'
    | 'name'
    | 'status'
    | 'species'
    | 'gender'
    | 'origin'
    | 'location'
    | 'date'
    | 'consest';
  labels: string[];
  placeholder?: string;
  required: string;
  patern?: {
    value: RegExp;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  values?: string[];
  options?: string[];
}

export type Inputs = {
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: string;
  location: string;
  image: FileList;
  date: string;
  consest: boolean;
};
