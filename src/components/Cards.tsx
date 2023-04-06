import React from 'react';
import Card from './Card';
import { ICardsProps } from '../models/types';

function Cards(props: ICardsProps) {
  return (
    <div className="cards" data-testid="cards">
      {!props.characters ? (
        <Card
          data-testid="null-character"
          setModalActive={props.setModalActive}
          onCharacterCardClick={props.onCharacterCardClick}
          character={null}
          key={99999999999}
          canDraw={props.canDraw}
        />
      ) : (
        props.characters.map((character) => (
          <Card
            setModalActive={props.setModalActive}
            onCharacterCardClick={props.onCharacterCardClick}
            character={character}
            key={String(character.id)}
            canDraw={props.canDraw}
          />
        ))
      )}
    </div>
  );
}

export default Cards;
