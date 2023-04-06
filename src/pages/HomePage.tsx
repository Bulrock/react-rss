import React, { useCallback, useState, useEffect, useMemo } from 'react';
import Header from '../../src/components/Header';
import Footer from '../components/Footer';
import Cards from '../../src/components/Cards';
import { ICharacter } from '../models/types';
import { IHomePageProps } from '../models/types';
import CharactersService from '../models/CharactersService';

function HomePage(props: IHomePageProps) {
  const [characters, setCharacters] = useState<ICharacter[] | null>(null);
  const [invisible, setInvisible] = useState(true);
  const [initialSearchValue, setInitialSearchValue] = useState<string>('');
  const charactersService = useMemo(() => CharactersService(false), []);

  const startCharactersFetch = useCallback(() => {
    console.log('start fetch use callback home page');
    charactersService(initialSearchValue).then((characters: ICharacter[] | null) => {
      setCharacters(characters);
    });
  }, [initialSearchValue, charactersService]);

  useEffect(() => {
    console.log('start fetch use effect home page');
    startCharactersFetch();
  }, [startCharactersFetch]);

  const handleCharactersFetched = useCallback((characters: ICharacter[] | null, value: string) => {
    console.log('handle characters fetched use callback home page');
    setCharacters(characters);
    setInvisible(true);
    setInitialSearchValue(value);
  }, []);

  const onCharactersFetchedStart = useCallback(() => {
    console.log('on characters fetched start use callback home page');
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
