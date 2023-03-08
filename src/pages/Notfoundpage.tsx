import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <h1>404</h1>
        <p>
          This page does not exist. Go <Link to="/">home</Link>
        </p>
      </div>
    );
  }
}

export default NotFoundPage;
