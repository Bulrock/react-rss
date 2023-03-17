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
          <h1 data-testid="about-h1">About us</h1>
          <p data-testid="about-p">This is a RSS React task website</p>
        </div>
        <Footer />
      </>
    );
  }
}

export default AboutPage;
