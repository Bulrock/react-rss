export interface IProps {
  onBooksFetched?: (books: IBook[]) => void;
  hideSearch?: boolean;
}

export interface IBook {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

export type SearchBarProps = IProps;
