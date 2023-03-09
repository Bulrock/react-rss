export type HeaderProps = {
  hideSearch?: boolean;
};

export interface IBook {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}
