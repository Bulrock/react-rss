import React, { useCallback, useState } from 'react';
import Header from '../../src/components/Header';
import Footer from '../components/Footer';
import Cards from '../../src/components/Cards';
import { ICharacter } from '../models/types';
import { characters as charactersDefault } from '../data/Characters';
import { IHomePageProps } from '../models/types';

function HomePage(props: IHomePageProps) {
  const [characters, setCharacters] = useState(charactersDefault);
  const [invisible, setInvisible] = useState(true);

  const handleCharactersFetched = useCallback((characters: ICharacter[] | null) => {
    setCharacters(characters);
    setInvisible(true);
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
          />
        </div>
      ) : (
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default HomePage;
