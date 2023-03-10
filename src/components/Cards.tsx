import React, { Component } from 'react';
import Card from './Card';
import { IBook } from 'models/types';

class Cards extends Component<{ books: IBook[] }> {
  render() {
    return (
      <div className="cards">
        {this.props.books.map((book) => {
          return <Card book={book} key={book.isbn13} />;
        })}
      </div>
    );
  }
}

export default Cards;
