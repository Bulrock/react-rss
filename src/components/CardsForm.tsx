import Card from './Card';
import { ICardsFormProps } from '../models/types';

function CardsForm(props: ICardsFormProps) {
  return (
    <div className="cards" data-testid="cards">
      {props.characters.map((character) => {
        return (
          <Card
            onCharacterCardClick={props.onCharacterCardClick}
            setModalActive={props.setModalActive}
            character={character}
            key={String(character.id)}
          />
        );
      })}
    </div>
  );
}

export default CardsForm;
