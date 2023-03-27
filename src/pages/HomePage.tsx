import * as React from 'react';
import { Component } from 'react';
import Header from '../../src/components/Header';
import Footer from '../components/Footer';
import Cards from '../../src/components/Cards';
import { ICharacter } from '../../src/models/types';
import { characters } from '../data/Characters';

class HomePage extends Component<object, { characters: ICharacter[] }> {
  constructor(props: object) {
    super(props);
    this.state = { characters: characters };
  }

  render() {
    return (
      <div data-testid="home-page-component">
        <Header hideSearch={false} />
        <div className="main">
          <h1 data-testid="home-h1">The Rick and Morty Universe</h1>
          <Cards characters={this.state.characters} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default HomePage;
