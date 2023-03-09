import React from 'react';
import { Component } from 'react';
import find from '../find.png';

class SearchBar extends Component<object, { search: string | null }> {
  constructor(props: object) {
    super(props);
    this.state = { search: localStorage.getItem('search') };
  }

  componentWillUnmount(): void {
    localStorage.setItem('search', String(this.state.search));
  }

  render() {
    return (
      <div className="wrapper-search">
        <div className="search-bar">
          <img className="search-img" src={find} alt="find" />
          <input
            type="search"
            value={this.state.search || ''}
            onChange={(e) => this.setState({ search: e.target.value })}
          />
        </div>
        <button className="search-btn">Search</button>
      </div>
    );
  }
}

export default SearchBar;
