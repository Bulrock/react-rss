import React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

class Header extends Component<{ hideSearch: boolean }, object> {
  render() {
    return (
      <>
        <header className="header-main" data-testid="header-test">
          <div className="header-links" data-testid="header-links-test">
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? { textDecoration: 'none', color: 'blue' } : {})}
              data-testid="home-link"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              style={({ isActive }) => (isActive ? { textDecoration: 'none', color: 'blue' } : {})}
              data-testid="about-link"
            >
              About
            </NavLink>
          </div>
          {!this.props.hideSearch && <SearchBar />}
        </header>
      </>
    );
  }
}

export default Header;
