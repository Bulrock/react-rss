import React from 'react';
import characterNotFound from '../assets/character-not-found.png';

export default function ErrorMessage() {
  return (
    <div data-testid="error-message-container" className="error-message-container">
      <div className="error-message">
        <div>Character with this name</div>
        <div>was not found!</div>
        <div>Try another one</div>
      </div>
      <img
        className="giant-head-img"
        src={characterNotFound}
        alt="giant yellow head"
        loading="lazy"
      />
    </div>
  );
}
