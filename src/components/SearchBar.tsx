import React, { useCallback, useRef } from 'react';
import find from '../assets/find.png';
import { updateSearch } from '../features/SearchBarSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';

function SearchBar() {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const searchValue = useAppSelector((state) => state.search?.value);
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (searchRef.current) {
        dispatch(updateSearch(searchRef.current.value));
      }
    },
    [dispatch]
  );

  return (
    <form className="wrapper-search" data-testid="search-test" onSubmit={handleSubmit}>
      <div className="search-bar">
        <img className="search-img" src={find} alt="find" />
        <input
          type="search"
          defaultValue={searchValue || ''}
          data-testid="search-input"
          ref={searchRef}
        />
      </div>
      <button className="btn" data-testid="search-btn" onClick={handleSubmit}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
