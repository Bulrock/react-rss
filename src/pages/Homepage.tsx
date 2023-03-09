import * as React from 'react';
import { Component } from 'react';
import Header from 'components/Header';

class HomePage extends Component {
  render() {
    return (
      <>
        <Header />
        <div>
          <h1>Home Page</h1>
          <p>This is a RSS website</p>
        </div>
      </>
    );
  }
}

export default HomePage;
