import React from 'react';
import Card from './Card';
import { ICardsProps } from '../models/types';

function Cards(props: ICardsProps) {
  return (
    <div className="cards" data-testid="cards">
      {!props.characters ? (
        <Card
          setModalActive={props.setModalActive}
          onCharacterCardClick={props.onCharacterCardClick}
          character={null}
          key={99999999999}
        />
      ) : (
        props.characters.map((character) => (
          <Card
            setModalActive={props.setModalActive}
            onCharacterCardClick={props.onCharacterCardClick}
            character={character}
            key={String(character.id)}
          />
        ))
      )}
    </div>
  );
}

export default Cards;
