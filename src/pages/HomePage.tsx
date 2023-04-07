import React, { useCallback, useState } from 'react';
import Header from '../../src/components/Header';
import Footer from '../components/Footer';
import Cards from '../../src/components/Cards';
import { ICharacter, IError } from '../models/types';
import { IHomePageProps } from '../models/types';
import Roller from '../components/Roller';

function HomePage(props: IHomePageProps) {
  const [characters, setCharacters] = useState<ICharacter[] | ICharacter | IError | undefined>(
    undefined
  );
  const [invisible, setInvisible] = useState(true);
  const [canDrawCard, setCanDrawCard] = useState(false);

  const handleCharactersFetched = useCallback(
    (characters: ICharacter[] | ICharacter | IError | undefined) => {
      setCharacters(characters);
      setInvisible(true);
      setCanDrawCard(true);
    },
    []
  );

  const onCharactersFetchedStart = useCallback(() => {
    setInvisible(false);
  }, []);

  return (
    <div data-testid="home-page-component">
      <Header
        onCharactersFetched={handleCharactersFetched}
        onCharactersFetchedStart={onCharactersFetchedStart}
        hideSearch={false}
      />
      {invisible ? (
        <div className="main">
          <h1 data-testid="home-h1">The Rick and Morty Universe</h1>
          <Cards
            setModalActive={props.setModalActive}
            onCharacterCardClick={props.onCharacterCardClick}
            characters={characters}
            canDraw={canDrawCard}
          />
        </div>
      ) : (
        <Roller />
      )}

      <Footer />
    </div>
  );
}

export default HomePage;
