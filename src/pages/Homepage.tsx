import * as React from 'react';
import { Component } from 'react';
import Header from 'components/Header';
import Cards from 'components/Cards';

class HomePage extends Component {
  render() {
    return (
      <>
        <Header />
        <div>
          <h1>Home Page</h1>
          <p>This is a RSS website</p>
        </div>
        <Cards />
      </>
    );
  }
}

export default HomePage;
