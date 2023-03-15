import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { IPerson } from 'models/types';

class Header extends Component<
  { onPersonsFetched?: (persons: IPerson[]) => void; hideSearch: boolean },
  object
> {
  render() {
    return (
      <>
        <header className="header-main" data-testid="header-test">
          <div className="header-links" data-testid="header-links-test">
            <Link to="/" data-testid="home-link">
              Home
            </Link>
            <Link to="/about" data-testid="about-link">
              About
            </Link>
          </div>
          {!this.props.hideSearch && <SearchBar onPersonsFetched={this.props.onPersonsFetched} />}
        </header>
      </>
    );
  }
}

export default Header;
