import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AboutPage from 'pages/Aboutpage';
import HomePage from 'pages/Homepage';
import NotFoundPage from 'pages/Notfoundpage';

import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <header className="header-main">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    );
  }
}

export default App;
