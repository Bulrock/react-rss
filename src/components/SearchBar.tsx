import React from 'react';
import { Component } from 'react';
import find from '../assets/find.png';
import BooksService from './CharacterService';
import { IPerson, SearchBarProps } from 'models/types';

class SearchBar extends Component<SearchBarProps, { search: string | null }> {
  rickAndMortyService = new BooksService();

  constructor(props: SearchBarProps) {
    super(props);
    this.state = { search: localStorage.getItem('search') };
  }

  handleSearchClick = () => {
    if (!this.state.search) return;

    if (this.state.search) {
      this.rickAndMortyService
        .getPersons(this.state.search)
        .then((persons: IPerson[]) => this.handlePersonsFetched(persons));
    }
  };

  handlePersonsFetched(persons: IPerson[]) {
    if (this.props.onPersonsFetched) this.props.onPersonsFetched(persons);
  }

  onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      const newSearch = e.target.value;
      this.setState({ search: newSearch });
      localStorage.setItem('search', newSearch);
    }
  };

  render() {
    return (
      <div className="wrapper-search" data-testid="search-test">
        <div className="search-bar">
          <img className="search-img" src={find} alt="find" />
          <input
            type="search"
            value={this.state.search || ''}
            data-testid="search-input"
            onChange={this.onInputValueChange}
          />
        </div>
        <button className="btn" data-testid="search-btn" onClick={this.handleSearchClick}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
