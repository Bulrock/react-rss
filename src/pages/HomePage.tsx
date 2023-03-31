import React, { useState } from 'react';
import Header from '../../src/components/Header';
import Footer from '../components/Footer';
import Cards from '../../src/components/Cards';
import { ICharacter } from 'models/types';

function HomePage() {
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  const handleCharactersFetched = (characters: ICharacter[]) => {
    setCharacters(characters);
  };

  return (
    <div data-testid="home-page-component">
      <Header onCharactersFetched={handleCharactersFetched} hideSearch={false} />
      <div className="main">
        <h1 data-testid="home-h1">The Rick and Morty Universe</h1>
        <Cards characters={characters} />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
