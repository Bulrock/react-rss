import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { IBook } from 'models/types';

class Header extends Component<
  { onBooksFetched?: (books: IBook[]) => void; hideSearch: boolean },
  object
> {
  render() {
    return (
      <>
        <header className="header-main">
          <div className="header-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </div>
          {!this.props.hideSearch && <SearchBar onBooksFetched={this.props.onBooksFetched} />}
        </header>
      </>
    );
  }
}

export default Header;
