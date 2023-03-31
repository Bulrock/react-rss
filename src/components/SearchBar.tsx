import React, { useState } from 'react';
import find from '../assets/find.png';
import CharactersService from '../models/CharactersService';
import { SearchBarProps, ICharacter } from '../models/types';

function SearchBar(props: SearchBarProps) {
  const [search, setSearch] = useState(localStorage.getItem('search'));
  const charactersService = CharactersService();

  const handleSearchClick = () => {
    if (!search) return;

    if (search) {
      charactersService(search).then((characters: ICharacter[]) =>
        handleCharactersFetched(characters)
      );
    }

    localStorage.setItem('search', search);
  };

  const handleCharactersFetched = (characters: ICharacter[]) => {
    if (props.onCharactersFetched) props.onCharactersFetched(characters);
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      const newSearch = e.target.value;
      setSearch(newSearch);
      localStorage.setItem('search', newSearch);
    }
  };

  return (
    <div className="wrapper-search" data-testid="search-test">
      <div className="search-bar">
        <img className="search-img" src={find} alt="find" />
        <input
          type="search"
          value={search || ''}
          data-testid="search-input"
          onChange={onInputValueChange}
        />
      </div>
      <button className="btn" data-testid="search-btn" onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
