import React, { useCallback, useMemo, useRef, useState } from 'react';
import find from '../assets/find.png';
import CharactersService from '../models/CharactersService';
import { SearchBarProps, CharectersFetchResult } from '../models/types';
import { useEffect } from 'react';

function SearchBar(props: SearchBarProps) {
  const [search, setSearch] = useState(
    localStorage.getItem('search') ? localStorage.getItem('search') : ' '
  );
  const charactersService = useMemo(() => CharactersService(false), []);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const { onCharactersFetched, onCharactersFetchedStart } = props;

  const handleCharactersFetched = useCallback(
    (characters: CharectersFetchResult) => {
      if (onCharactersFetched && search) onCharactersFetched(characters, search);
    },
    [onCharactersFetched, search]
  );

  const performSearch = useCallback(() => {
    if (!search) return;

    if (search) {
      if (onCharactersFetchedStart) {
        onCharactersFetchedStart();
      }
      charactersService(search).then((characters) => {
        handleCharactersFetched(characters);
      });
    }
  }, [charactersService, handleCharactersFetched, onCharactersFetchedStart, search]);

  useEffect(() => {
    if (search) {
      performSearch();
    }
  }, [performSearch, search]);

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
      setSearch(searchRef.current.value);

      const newSearch = searchRef.current?.value;
      localStorage.setItem('search', newSearch);
    }
  };

  return (
    <div className="wrapper-search" data-testid="search-test">
      <div className="search-bar">
        <img className="search-img" src={find} alt="find" />
        <input
          type="search"
          defaultValue={search || ''}
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
