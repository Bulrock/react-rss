import React from 'react';
import Card from './Card';
import { ICardsProps } from '../models/types';

function Cards(props: ICardsProps) {
  return (
    <div className="cards" data-testid="cards">
      {props.characters &&
        Array.isArray(props.characters) &&
        props.characters.map((character) => {
          return (
            <Card
              setModalActive={props.setModalActive}
              onCharacterCardClick={props.onCharacterCardClick}
              character={character}
              key={String(character.id)}
              canDraw={props.canDraw}
            />
          );
        })}
      {props.characters && !Array.isArray(props.characters) && !('error' in props.characters) && (
        <Card
          setModalActive={props.setModalActive}
          onCharacterCardClick={props.onCharacterCardClick}
          character={props.characters}
          key={String(props.characters.id)}
          canDraw={props.canDraw}
        />
      )}
      {!props.characters && props.canDraw && (
        <Card
          data-testid="null-character"
          setModalActive={props.setModalActive}
          onCharacterCardClick={props.onCharacterCardClick}
          character={props.characters}
          key={99999999999}
          canDraw={props.canDraw}
        />
      )}
    </div>
  );
}

export default Cards;
