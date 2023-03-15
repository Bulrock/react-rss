export interface IProps {
  onPersonsFetched?: (persons: IPerson[]) => void;
  hideSearch?: boolean;
}

export interface IPerson {
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

export type SearchBarProps = IProps;
