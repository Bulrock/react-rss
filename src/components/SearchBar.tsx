import React, { useCallback, useMemo, useRef } from 'react';
import find from '../assets/find.png';
import CharactersService from '../models/CharactersService';
import { SearchBarProps, CharectersFetchResult } from '../models/types';
import { useEffect } from 'react';
import { updateSearch } from '../features/SearchBarSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';

function SearchBar(props: SearchBarProps) {
  const searchValue = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const charactersService = useMemo(() => CharactersService(false), []);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const { onCharactersFetched, onCharactersFetchedStart } = props;

  const handleCharactersFetched = useCallback(
    (characters: CharectersFetchResult) => {
      if (onCharactersFetched && searchValue) onCharactersFetched(characters, searchValue.value);
    },
    [onCharactersFetched, searchValue]
  );

  const performSearch = useCallback(() => {
    if (!searchValue) return;

    if (searchValue) {
      if (onCharactersFetchedStart) {
        onCharactersFetchedStart();
      }
      charactersService(searchValue.value).then((characters) => {
        handleCharactersFetched(characters);
      });
    }
  }, [charactersService, handleCharactersFetched, onCharactersFetchedStart, searchValue]);

  useEffect(() => {
    if (searchValue) {
      performSearch();
    }
  }, [performSearch, searchValue]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleSearchClick();
      }
    };

    document.addEventListener('keyup', handleKeyPress);

    return () => {
      document.removeEventListener('keyup', handleKeyPress);
    };
  });

  const handleSearchClick = () => {
    if (searchRef.current) {
      dispatch(updateSearch(searchRef.current.value));
    }
  };

  return (
    <div className="wrapper-search" data-testid="search-test">
      <div className="search-bar">
        <img className="search-img" src={find} alt="find" />
        <input
          type="search"
          defaultValue={searchValue.value || ''}
          data-testid="search-input"
          ref={searchRef}
        />
      </div>
      <button className="btn" data-testid="search-btn" onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
