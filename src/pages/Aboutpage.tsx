import * as React from 'react';
import { Component } from 'react';
import Header from 'components/Header';

class AboutPage extends Component {
  render() {
    return (
      <>
        <Header hideSearch={true} />
        <div>
          <h1>About us</h1>
          <p>This is a RSS React task website</p>
        </div>
      </>
    );
  }
}

export default AboutPage;
