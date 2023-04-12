import React, { useCallback, useMemo, useRef } from 'react';
import find from '../assets/find.png';
import CharactersService from '../models/CharactersService';
import { SearchBarProps } from '../models/types';
import { useEffect } from 'react';
import { updateSearch, updateSearchCharacters } from '../features/SearchBarSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';

function SearchBar(props: SearchBarProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const searchValue = useAppSelector((state) => state.search?.value);
  const dispatch = useAppDispatch();
  const charactersService = useMemo(() => CharactersService(false), []);

  const { onCharactersFetchedStart } = props;

  const performSearch = useCallback(() => {
    if (!searchValue) return;

    if (searchValue) {
      if (onCharactersFetchedStart) {
        onCharactersFetchedStart();
      }
      charactersService(searchValue).then((characters) => {
        dispatch(updateSearchCharacters(characters));
      });
    }
  }, [charactersService, dispatch, onCharactersFetchedStart, searchValue]);

  useEffect(() => {
    if (searchValue) {
      performSearch();
    }
  }, [performSearch, searchValue]);

  const handleSearch = (
    event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (searchRef.current) {
      dispatch(updateSearch(searchRef.current.value));
      performSearch();
    }
  };

  return (
    <form className="wrapper-search" data-testid="search-test" onSubmit={handleSearch}>
      <div className="search-bar">
        <img className="search-img" src={find} alt="find" />
        <input
          type="search"
          defaultValue={searchValue || ''}
          data-testid="search-input"
          ref={searchRef}
        />
      </div>
      <button className="btn" data-testid="search-btn" onClick={handleSearch}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
