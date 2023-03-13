import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../src/components/Header';

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <Header hideSearch={true} />
        <h1 data-testid="not-found-h1">404</h1>
        <p data-testid="not-found-p">
          This page does not exist. Go{' '}
          <Link className="not-found-link" to="/" data-testid="not-found-link">
            home
          </Link>
        </p>
      </div>
    );
  }
}

export default NotFoundPage;
