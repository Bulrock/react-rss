import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import FormPage from './pages/FormPage';
import Modal from './components/Modal';
import { ICharacter } from './models/types';

import './App.css';

function App() {
  const [modalActive, setModalActive] = useState(false);
  const [characterModal, setCharacterModal] = useState<ICharacter | null>(null);

  const handleCharacterCardClick = (character: ICharacter) => {
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
              onCharacterCardClick={handleCharacterCardClick}
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
