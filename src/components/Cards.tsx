import Card from './Card';
import { ICardsProps } from '../models/types';
import { useAppSelector } from '../app/hooks';
import { useGetCharactersQuery } from '../features/ApiSlice';
import Roller from './Roller';
import ErrorMessage from './ErrorMessage';

function Cards(props: ICardsProps) {
  const searchValue = useAppSelector((state) => state.search?.value);

  const { data: fetchedCharacters, isError, isFetching } = useGetCharactersQuery(searchValue);

  return (
    <>
      {isFetching ? (
        <Roller classRoller={'lds-roller-main lds-roller'} />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        <div className="cards" data-testid="cards">
          {fetchedCharacters?.results.map((character) => {
            return (
              <Card
                setModalActive={props.setModalActive}
                onCharacterCardClick={props.onCharacterCardClick}
                character={character}
                key={String(character.id)}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default Cards;
