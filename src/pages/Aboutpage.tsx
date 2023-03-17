import * as React from 'react';
import { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class AboutPage extends Component {
  render() {
    return (
      <>
        <Header hideSearch={true} />
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
}

export default AboutPage;
