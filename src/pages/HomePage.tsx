import React, { useState, useEffect } from 'react';
import Header from '../../src/components/Header';
import Footer from '../components/Footer';
import Cards from '../../src/components/Cards';
import Roller from '../components/Roller';
import { IHomePageProps } from '../models/types';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useGetAllCharactersQuery, useGetCharactersQuery } from 'features/ApiSlice';
import { updateSearchResults } from '../features/SearchBarSlice';

function HomePage(props: IHomePageProps) {
  const [canDrawCard, setCanDrawCard] = useState(false);
  const searchCharacters = useAppSelector((state) => state.search?.searchResults);
  const searchValue = useAppSelector((state) => state.search?.value);
  const dispatch = useAppDispatch();

  const { data: initialCharacters } = useGetAllCharactersQuery(' ');

  useEffect(() => {
    if (initialCharacters) {
      dispatch(updateSearchResults(initialCharacters.results));
    }
  }, [dispatch, initialCharacters]);

  const {
    data: fetchedCharacters,
    isFetching,
    error,
  } = useGetCharactersQuery(searchValue || '', {});

  useEffect(() => {
    if (fetchedCharacters) {
      console.log(fetchedCharacters.results);
      dispatch(updateSearchResults(fetchedCharacters.results));
      // setCanDrawCard(true);
    }
    if (error && 'status' in error) {
      console.log(error);
      console.log(fetchedCharacters);
      dispatch(updateSearchResults(error));
    }
    if (searchCharacters) {
      setCanDrawCard(true);
    }
  }, [dispatch, error, fetchedCharacters, isFetching, searchCharacters]);

  return (
    <div data-testid="home-page-component">
      <Header hideSearch={false} />
      {!isFetching ? (
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
