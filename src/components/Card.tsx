import * as React from 'react';
import { Component } from 'react';
import { IBook } from 'models/types';
import views from '../assets/eye.png';
import like from '../assets/like.png';

class Card extends Component<
  { book: IBook; key: string },
  {
    likes: number;
    views: number;
    show: boolean;
    info: boolean;
    isLiked: boolean;
    isViewed: boolean;
  }
> {
  constructor(props: { book: IBook; key: string }) {
    super(props);
    this.state = {
      likes: 0,
      views: 0,
      show: false,
      info: false,
      isLiked: false,
      isViewed: false,
    };
  }

  handleLikesClick = () => {
    if (!this.state.isLiked) {
      this.setState({ likes: this.state.likes + 1, isLiked: !this.state.isLiked });
    }
  };

  handleDetailsClick = () => {
    this.setState({ show: !this.state.show });
  };

  handleInfoClick = () => {
    if (!this.state.isViewed) {
      this.setState({
        views: this.state.views + 1,
        info: !this.state.info,
        isViewed: !this.state.isViewed,
      });
    } else {
      this.setState({
        info: !this.state.info,
      });
    }
  };

  render() {
    const book = this.props.book;
    return (
      <div className="card">
        <div className="card-header-wrapper">
          <div>
            <img className="book-img" src={book.image} alt="book image" />
            <p className="book-price">
              <strong>{book.price}</strong>
            </p>
            <p className="book-title">{book.title}</p>
            <p className="book-subtitle">{this.state.show && book.subtitle}</p>
          </div>
          <div className="buttons-wrapper">
            <button className="btn book-details" onClick={this.handleDetailsClick}>
              {this.state.show ? 'Hide details' : 'Show details'}
            </button>
            <button className="btn book-info" onClick={this.handleInfoClick}>
              {this.state.info ? 'Hide info' : 'Show info'}
            </button>
          </div>
        </div>
        <div>
          <hr className="hr"></hr>
          <div className="card-footer-wrapper">
            <div className="likes-block">
              <img
                className="like-img"
                src={like}
                alt="like image"
                onClick={this.handleLikesClick}
              />
              <strong className="card-footer-text">{this.state.likes}</strong>
            </div>
            <div className="views-block">
              <img className="views-img" src={views} alt="views image" />
              <strong className="card-footer-text">{this.state.views}</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
