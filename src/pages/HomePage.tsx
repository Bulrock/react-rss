import React, { useCallback, useState, useEffect } from 'react';
import Header from '../../src/components/Header';
import Footer from '../components/Footer';
import Cards from '../../src/components/Cards';
import Roller from '../components/Roller';
import { IHomePageProps } from '../models/types';
import { useAppSelector } from '../app/hooks';

function HomePage(props: IHomePageProps) {
  const [invisible, setInvisible] = useState(true);
  const [canDrawCard, setCanDrawCard] = useState(false);
  const searchCharacters = useAppSelector((state) => state.search.searchCharacters);

  useEffect(() => {
    if (searchCharacters) {
      setInvisible(true);
      setCanDrawCard(true);
    }
  }, [searchCharacters]);

  const onCharactersFetchedStart = useCallback(() => {
    setInvisible(false);
  }, []);

  return (
    <div data-testid="home-page-component">
      <Header onCharactersFetchedStart={onCharactersFetchedStart} hideSearch={false} />
      {invisible ? (
        <div className="main">
          <h1 data-testid="home-h1">The Rick and Morty Universe</h1>
          <Cards
            setModalActive={props.setModalActive}
            onCharacterCardClick={props.onCharacterCardClick}
            characters={searchCharacters}
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
