import React, { useCallback, useState } from 'react';
import Header from '../../src/components/Header';
import Footer from '../components/Footer';
import Cards from '../../src/components/Cards';
import { CharectersFetchResult } from '../models/types';
import { IHomePageProps } from '../models/types';
import Roller from '../components/Roller';

function HomePage(props: IHomePageProps) {
  const [characters, setCharacters] = useState<CharectersFetchResult>(undefined);
  const [invisible, setInvisible] = useState(true);
  const [canDrawCard, setCanDrawCard] = useState(false);

  const handleCharactersFetched = useCallback((characters: CharectersFetchResult) => {
    setCharacters(characters);
    setInvisible(true);
    setCanDrawCard(true);
  }, []);

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
        <Roller classRoller={'lds-roller-main lds-roller'} />
      )}

      <Footer />
    </div>
  );
}

export default HomePage;
