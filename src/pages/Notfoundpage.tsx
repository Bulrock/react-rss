import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../src/components/Header';
import Footer from '../components/Footer';
import notFound from '../assets/notFound.png';

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <Header hideSearch={true} />
        <div className="main" data-testid="main">
          <h1 className="not-found-title" data-testid="not-found-h1">
            404
          </h1>
          <p className="not-found-p" data-testid="not-found-p">
            This Universe does not exist. Go your home{' '}
            <Link className="not-found-link" to="/" data-testid="not-found-link">
              planet
            </Link>
          </p>
          <img className="not-found-img" src={notFound} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default NotFoundPage;
