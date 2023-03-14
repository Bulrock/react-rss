import * as React from 'react';
import { Component } from 'react';
import Header from '../../src/components/Header';
import Cards from '../../src/components/Cards';
import { IBook } from '../../src/models/types';
import { books } from '../../src/data/data';

class HomePage extends Component<object, { books: IBook[] }> {
  constructor(props: object) {
    super(props);
    this.state = { books: books };
  }

  handleBooksFetched = (books: IBook[]) => {
    this.setState({ books: books });
  };

  render() {
    return (
      <div data-testid="home-page-component">
        <Header onBooksFetched={this.handleBooksFetched} hideSearch={false} />
        <div>
          <h1 data-testid="home-h1">Home Page</h1>
        </div>
        <Cards books={this.state.books} />
      </div>
    );
  }
}

export default HomePage;
