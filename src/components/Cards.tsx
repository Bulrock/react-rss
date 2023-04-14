import React, { Suspense } from 'react';
import Card from './Card';
import { ICardsProps } from '../models/types';
import Roller from './Roller';
const ErrorMessage = React.lazy(() => import('./ErrorMessage'));

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
      {props.characters &&
        !Array.isArray(props.characters) &&
        'data' in props.characters &&
        props.canDraw && (
          <div className="roller-wrapper">
            <Suspense fallback={<Roller classRoller={'lds-roller-main lds-roller'} />}>
              <ErrorMessage />
            </Suspense>
          </div>
        )}
    </div>
  );
}

export default Cards;
