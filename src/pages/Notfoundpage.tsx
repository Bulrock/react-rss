import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from 'components/Header';

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <Header hideSearch={true} />
        <h1>404</h1>
        <p>
          This page does not exist. Go{' '}
          <Link className="not-found-link" to="/">
            home
          </Link>
        </p>
      </div>
    );
  }
}

export default NotFoundPage;
