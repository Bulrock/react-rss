import React, { useState, useEffect } from 'react';
import Cards from '../../src/components/Cards';
import Roller from '../components/Roller';
import Modal from '../components/Modal';
import SearchBar from 'src/components/SearchBar';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useGetAllCharactersQuery, useGetCharactersQuery } from '../features/ApiSlice';
import { updateSearchResults } from '../features/CharactersSlice';

function HomePage() {
  const [canDrawCard, setCanDrawCard] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const searchCharacters = useAppSelector((state) => state.characters?.searchResults);
  const searchValue = useAppSelector((state) => state.search?.value);
  const dispatch = useAppDispatch();

  const { data: initialCharacters, isFetching: initialFetch } = useGetAllCharactersQuery(' ');

  useEffect(() => {
    if (initialCharacters) {
      dispatch(updateSearchResults(initialCharacters.results));
    }
  }, [dispatch, initialCharacters]);

  const {
    data: fetchedCharacters,
    isFetching: searchFetch,
    error,
  } = useGetCharactersQuery(searchValue || '', {});

  useEffect(() => {
    if (error && 'status' in error) {
      dispatch(updateSearchResults(error));
    } else if (fetchedCharacters) {
      dispatch(updateSearchResults(fetchedCharacters.results));
    }

    if (searchCharacters) {
      setCanDrawCard(true);
    }
  }, [dispatch, error, fetchedCharacters, searchCharacters]);

  return (
    <>
      <div data-testid="home-page-component">
        <SearchBar />
        {!initialFetch && !searchFetch ? (
          <div className="main">
            <h1 data-testid="home-h1">The Rick and Morty Universe</h1>
            <Cards
              setModalActive={setModalActive}
              characters={searchCharacters}
              canDraw={canDrawCard}
            />
          </div>
        ) : (
          <Roller classRoller={'lds-roller-main lds-roller'} />
        )}
      </div>
      <Modal active={modalActive} setActive={setModalActive} />
    </>
  );
}

export default HomePage;
