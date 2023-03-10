import * as React from 'react';
import { Component } from 'react';
import Header from 'components/Header';
import Cards from 'components/Cards';
import { IBook } from 'models/types';
import { books } from 'data/data';

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
      <>
        <Header onBooksFetched={this.handleBooksFetched} hideSearch={false} />
        <div>
          <h1>Home Page</h1>
          <p>This is a RSS React task website</p>
        </div>
        <Cards books={this.state.books} />
      </>
    );
  }
}

export default HomePage;
