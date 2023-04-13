import React, { useState, useEffect } from 'react';
import Header from '../../src/components/Header';
import Footer from '../components/Footer';
import Cards from '../../src/components/Cards';
import Roller from '../components/Roller';
import { IHomePageProps } from '../models/types';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useGetAllCharactersQuery, useGetCharactersQuery } from 'features/ApiSlice';
import { updateSearchCharacters } from '../features/SearchBarSlice';

function HomePage(props: IHomePageProps) {
  const [canDrawCard, setCanDrawCard] = useState(false);
  const searchCharacters = useAppSelector((state) => state.search?.searchCharacters);
  const searchValue = useAppSelector((state) => state.search?.value);
  const dispatch = useAppDispatch();

  const { data: characters } = useGetAllCharactersQuery('');

  useEffect(() => {
    dispatch(updateSearchCharacters(characters));
  }, [characters, dispatch]);

  const {
    data: fetchedCharacters = [],
    isFetching,
    isSuccess,
  } = useGetCharactersQuery(searchValue || '', {
    skip: !searchValue,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateSearchCharacters(fetchedCharacters));
    }
    if (searchCharacters) {
      setCanDrawCard(true);
    }
  }, [dispatch, fetchedCharacters, isFetching, isSuccess, searchCharacters]);

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
