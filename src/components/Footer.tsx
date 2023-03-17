import React from 'react';
import { Component } from 'react';
import github from '../assets/github.svg';
import school_logo from '../assets/school_logo.svg';

class Footer extends Component {
  render() {
    return (
      <>
        <footer className="footer" data-testid="footer-test">
          <div className="container bottom">
            <a
              className="social-link"
              href="https://github.com/bulrock"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="icon github-icon"
                data-testid="github-icon"
                src={github}
                alt="github icon"
              />
            </a>
            <p className="copyrights" data-testid="copyrights">
              React © 2023
            </p>
            <a href="https://rs.school/js/" className="social-link">
              <img className="logo" data-testid="logo" src={school_logo} alt="rs school logo" />
            </a>
          </div>
        </footer>
      </>
    );
  }
}

export default Footer;
