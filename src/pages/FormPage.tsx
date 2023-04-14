import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import CharacterForm from '../components/CharacterForm';
import { useAppSelector } from '../app/hooks';
import ModalFormPage from '../components/ModalFormPage';
import { ICharacter } from '../models/types';

function FormPage() {
  const [modalActive, setModalActive] = useState(false);
  const [characterModal, setCharacterModal] = useState<ICharacter | null>(null);
  const formCharacters = useAppSelector((state) => state.formCharacters?.value);

  const handleCardClickFormPage = (character: ICharacter) => {
    setCharacterModal(character);
    setModalActive(true);
  };

  return (
    <>
      <div data-testid="form-page">
        <Header hideSearch={true} />
        <div className="main">
          <h1 data-testid="form-h1">Create new Character with form</h1>
          <CharacterForm />
          <Cards
            canDraw={true}
            setModalActive={setModalActive}
            onCharacterCardClick={handleCardClickFormPage}
            characters={formCharacters}
          />
        </div>
        <Footer />
      </div>
      <ModalFormPage
        characterModal={characterModal}
        active={modalActive}
        setActive={setModalActive}
      />
    </>
  );
}

export default FormPage;
