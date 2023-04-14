import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import FormPage from './pages/FormPage';
import Modal from './components/Modal';
import { ICharacter } from './models/types';
import { useGetCharacterByIdQuery } from './features/ApiSlice';
import { useAppSelector } from './app/hooks';

import './App.css';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

function App() {
  const [modalActive, setModalActive] = useState(false);
  const [characterModal, setCharacterModal] = useState<
    FetchBaseQueryError | ICharacter | undefined
  >(undefined);
  const [isModalError, setIsModalError] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const cardId = useAppSelector((state) => state.card.id);
  const { data: fetchCharacterModal } = useGetCharacterByIdQuery(cardId);

  useEffect(() => {
    if (fetchCharacterModal && 'id' in fetchCharacterModal) {
      setCharacterModal(fetchCharacterModal);
    } else {
      setIsFetching(false);
      setIsModalError(true);
    }
  }, [fetchCharacterModal]);

  const handleCharacterCardClickFormPage = (character: ICharacter) => {
    setCharacterModal(character);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage setModalActive={setModalActive} />} />
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
      <Modal
        isFetching={isFetching}
        isModalError={isModalError}
        characterModal={characterModal}
        active={modalActive}
        setActive={setModalActive}
      />
    </>
  );
}

export default App;
