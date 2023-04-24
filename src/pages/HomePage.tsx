import React, { useState } from 'react';
import Cards from '../../src/components/Cards';
import Modal from '../components/Modal';
import SearchBar from 'src/components/SearchBar';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';

function HomePage() {
  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <div data-testid="home-page-component">
        <div className="main-header-wrapper">
          <Header />
          <SearchBar />
        </div>
        <div className="main">
          <h1 data-testid="home-h1">The Rick and Morty Universe</h1>
          <Cards setModalActive={setModalActive} />
        </div>
        <Footer />
      </div>
      <Modal active={modalActive} setActive={setModalActive} />
    </>
  );
}

export default HomePage;
