import FormFieldValueValidator from './FormFieldValueValidator';

export interface SearchBarProps {
  handleSearchClick?: () => void;
}

export interface ICharacter {
  id: number;
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

export interface ILikeRepository {
  add: (key: number) => void;
  remove: (key: number) => void;
  findLike: (key: number) => boolean;
}

export interface IViewRepository {
  add: (key: number) => void;
  remove: (key: number) => void;
  findView: (key: number) => boolean;
}

export interface ICardState {
  likes: number;
  views: number;
  show: boolean;
  info: boolean;
  isLiked: boolean;
  isViewed: boolean;
}

export interface ICardProps {
  character: ICharacter;
}

export interface IFormProps {
  element: string;
  label?: string;
  type: string;
  name?: string;
  value?: string;
  validator: FormFieldValueValidator;
  options?: string[];
}

export interface IFormState {
  error: string;
}

export interface IValidationRule {
  rule: string;
  errorMessage: string;
}

export interface IFormField {
  element: string;
  label?: string;
  type: string;
  name?: string;
  options?: string[];
  validationRules: IValidationRule[];
}

export interface ICharacterFormProps {
  formFields: IFormField[];
}
