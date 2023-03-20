import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CharacterForm from '../components/CharacterForm';
import { FormFields } from '../data/CharacterFormMetadata';

class FormPage extends Component {
  render() {
    return (
      <>
        <Header hideSearch={true} />
        <div className="main">
          <h1 data-testid="form-h1">Create new Character with form</h1>
          <CharacterForm formFields={FormFields} />
        </div>
        <Footer />
      </>
    );
  }
}

export default FormPage;
