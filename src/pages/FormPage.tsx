import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CharacterForm from '../components/CharacterForm';
import { FormFields } from '../data/CharacterFormMetadata';
import Cards from '../components/Cards';
import { ICharacter } from '../models/types';
import { characters } from 'data/Characters';

class FormPage extends Component<object, { characters: ICharacter[] }> {
  constructor(props: object) {
    super(props);
    this.state = { characters: characters };
  }
  render() {
    return (
      <>
        <Header hideSearch={true} />
        <div className="main">
          <h1 data-testid="form-h1">Create new Character with form</h1>
          <CharacterForm formFields={FormFields} />
          <Cards characters={this.state.characters} />
        </div>
        <Footer />
      </>
    );
  }
}

export default FormPage;
