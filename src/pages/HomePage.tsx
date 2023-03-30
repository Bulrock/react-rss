import React, { useState } from 'react';
import Header from '../../src/components/Header';
import Footer from '../components/Footer';
import Cards from '../../src/components/Cards';
import { characters } from '../data/Characters';

function HomePage() {
  const [charactersDefault] = useState(characters);

  return (
    <div data-testid="home-page-component">
      <Header hideSearch={false} />
      <div className="main">
        <h1 data-testid="home-h1">The Rick and Morty Universe</h1>
        <Cards characters={charactersDefault} />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
