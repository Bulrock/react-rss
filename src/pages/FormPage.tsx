import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import CharacterForm from '../components/CharacterForm';
import { IFormPageProps } from '../models/types';
import { useAppSelector } from '../app/hooks';

function FormPage(props: IFormPageProps) {
  const formCharacters = useAppSelector((state) => state.formCharacters.value);

  return (
    <div data-testid="form-page">
      <Header hideSearch={true} />
      <div className="main">
        <h1 data-testid="form-h1">Create new Character with form</h1>
        <CharacterForm />
        <Cards
          canDraw={true}
          setModalActive={props.setModalActive}
          onCharacterCardClick={props.onCharacterCardClick}
          characters={formCharacters}
        />
      </div>
      <Footer />
    </div>
  );
}

export default FormPage;
