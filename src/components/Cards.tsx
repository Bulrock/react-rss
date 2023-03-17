import React, { Component } from 'react';
import Card from './Card';
import { IPerson } from 'models/types';

class Cards extends Component<{ persons: IPerson[] }> {
  render() {
    return (
      <div className="cards" data-testid="cards">
        {this.props.persons.map((person) => {
          return <Card person={person} key={String(person.id)} />;
        })}
      </div>
    );
  }
}

export default Cards;
