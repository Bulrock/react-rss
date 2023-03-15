import * as React from 'react';
import { Component } from 'react';
import Header from '../../src/components/Header';
import Cards from '../../src/components/Cards';
import { IPerson } from '../../src/models/types';
import { persons } from '../../src/data/data';

class HomePage extends Component<object, { persons: IPerson[] }> {
  constructor(props: object) {
    super(props);
    this.state = { persons: persons };
  }

  handlePersonsFetched = (persons: IPerson[]) => {
    this.setState({ persons: persons });
  };

  render() {
    return (
      <div data-testid="home-page-component">
        <Header onPersonsFetched={this.handlePersonsFetched} hideSearch={false} />
        <div>
          <h1 data-testid="home-h1">The Rick and Morty Universe</h1>
        </div>
        <Cards persons={this.state.persons} />
      </div>
    );
  }
}

export default HomePage;
