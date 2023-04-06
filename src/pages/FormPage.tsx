import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import { ICharacter } from '../models/types';
import CharacterForm from '../components/CharacterForm';
import { IFormPageProps } from '../models/types';

function FormPage(props: IFormPageProps) {
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  const handleSubmitCharacterForm = (character: ICharacter) => {
    setCharacters([...characters, character]);
  };

  return (
    <div data-testid="form-page">
      <Header hideSearch={true} />
      <div className="main">
        <h1 data-testid="form-h1">Create new Character with form</h1>
        <CharacterForm onSuccessSubmit={handleSubmitCharacterForm} />
        <Cards
          canDraw={props.canDraw}
          setModalActive={props.setModalActive}
          onCharacterCardClick={props.onCharacterCardClick}
          characters={characters}
        />
      </div>
      <Footer />
    </div>
  );
}

export default FormPage;
