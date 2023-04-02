import React from 'react';
import Card from './Card';
import { ICardsProps } from '../models/types';

function Cards(props: ICardsProps) {
  return (
    <div className="cards" data-testid="cards">
      {props.characters.map((character) => {
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
  );
}

export default Cards;
