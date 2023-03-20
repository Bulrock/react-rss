import React, { Component } from 'react';
import Card from './Card';
import { ICharacter } from '../models/types';

class Cards extends Component<{ characters: ICharacter[] }> {
  render() {
    return (
      <div className="cards" data-testid="cards">
        {this.props.characters.map((person) => {
          return <Card character={person} key={String(person.id)} />;
        })}
      </div>
    );
  }
}

export default Cards;
