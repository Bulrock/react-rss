import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { HeaderProps } from 'models/types';

class Header extends Component<HeaderProps, object> {
  render() {
    return (
      <>
        <header className="header-main">
          <div className="header-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </div>
          {!this.props.hideSearch && <SearchBar />}
        </header>
      </>
    );
  }
}

export default Header;
