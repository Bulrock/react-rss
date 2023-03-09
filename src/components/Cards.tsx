import React, { Component } from 'react';
import { books } from 'data/data';
import Card from './Card';

class Cards extends Component {
  render() {
    return (
      <div className="cards">
        {books.map((book) => {
          return <Card book={book} key={book.isbn13} />;
        })}
      </div>
    );
  }
}

export default Cards;
