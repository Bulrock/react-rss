import React, { useCallback, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import FormPage from './pages/FormPage';
import Modal from './components/Modal';
import { ICharacter, IError } from './models/types';
import CharactersService from './models/CharactersService';

import './App.css';

function App() {
  const [modalActive, setModalActive] = useState(false);
  const [characterModal, setCharacterModal] = useState<ICharacter | IError | undefined>(undefined);
  const characterService = useMemo(() => CharactersService(true), []);

  const handleCharacterCardClick = useCallback(
    (character: ICharacter) => {
      setCharacterModal(undefined);
      characterService(String(character.id)).then((refetchedCharacter) => {
        if (
          refetchedCharacter !== undefined &&
          !Array.isArray(refetchedCharacter) &&
          !('error' in refetchedCharacter)
        ) {
          setCharacterModal(refetchedCharacter);
        }
      });
    },
    [characterService]
  );

  const handleCharacterCardClickFormPage = (character: ICharacter) => {
    setCharacterModal(character);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onCharacterCardClick={handleCharacterCardClick}
              setModalActive={setModalActive}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/form"
          element={
            <FormPage
              onCharacterCardClick={handleCharacterCardClickFormPage}
              setModalActive={setModalActive}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Modal characterModal={characterModal} active={modalActive} setActive={setModalActive} />
    </>
  );
}

export default App;
