import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AboutPage() {
  return (
    <>
      <Header />
      <div className="main">
        <h1 data-testid="about-h1">What is this?</h1>
        <p data-testid="about-p">
          Website based on the television show Rick and Morty. You will have access to about
          hundreds of characters. It filled with information as seen on the TV show from The Rick
          and Morty API.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
