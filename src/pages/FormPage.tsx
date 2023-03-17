import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class FormPage extends Component {
  render() {
    return (
      <>
        <Header hideSearch={true} />
        <div className="main">
          <h1 data-testid="form-h1">Create new Character with form</h1>
        </div>
        <Footer />
      </>
    );
  }
}

export default FormPage;
