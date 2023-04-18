import React from 'react';
import { NavLink } from 'react-router-dom';
// import SearchBar from './SearchBar';
// import { IHeaderProps } from '../models/types';

function Header() {
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
            to="/form"
            style={({ isActive }) => (isActive ? { textDecoration: 'none', color: 'blue' } : {})}
            data-testid="form-link"
          >
            Form
          </NavLink>
          <NavLink
            to="/about"
            style={({ isActive }) => (isActive ? { textDecoration: 'none', color: 'blue' } : {})}
            data-testid="about-link"
          >
            About
          </NavLink>
        </div>
      </header>
    </>
  );
}

export default Header;
