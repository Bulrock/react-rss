import * as React from 'react';
import { Component } from 'react';
import { IPerson } from 'models/types';
import views from '../assets/eye.png';
import like from '../assets/like.png';

class Card extends Component<
  { person: IPerson },
  {
    likes: number;
    views: number;
    show: boolean;
    info: boolean;
    isLiked: boolean;
    isViewed: boolean;
  }
> {
  constructor(props: { person: IPerson }) {
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

  isLocalStorageHasValue = (value: string, key: number) => {
    const keys = localStorage.getItem(value);
    const keysArr: number[] = keys ? JSON.parse(keys) : [];
    return keysArr.some((keyId) => keyId === key) ? true : false;
  };

  changeValueInLoclaStorage = (value: string, key: number, action: string) => {
    const keys = localStorage.getItem(value);
    const keysArr: number[] = keys ? JSON.parse(keys) : [];
    if (action === 'add') {
      keysArr.push(key);
      localStorage.setItem(value, JSON.stringify(keysArr));
    } else if (action === 'remove') {
      const arr = keysArr.filter((element) => element !== key);
      localStorage.setItem(value, JSON.stringify(arr));
    }
  };

  handleLikesClick = () => {
    if (!this.state.isLiked) {
      this.setState({ likes: this.state.likes + 1, isLiked: !this.state.isLiked });
      this.changeValueInLoclaStorage('likesArr', this.props.person.id, 'add');
    } else {
      this.setState({ likes: this.state.likes - 1, isLiked: !this.state.isLiked });
      this.changeValueInLoclaStorage('likesArr', this.props.person.id, 'remove');
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
      this.changeValueInLoclaStorage('viewsArr', this.props.person.id, 'add');
    } else {
      this.setState({
        info: !this.state.info,
      });
    }
  };

  render() {
    const person = this.props.person;
    return (
      <div className="card" data-testid="card">
        <div className="card-header-wrapper">
          <div>
            <img className="person-img" src={person.image} alt="person image" />
            <h2 className="person-name">{person.name}</h2>
            <span className="person-status">
              <span
                className={person.status === 'Alive' ? 'status-icon-green' : 'status-icon-red'}
              ></span>
              <strong>
                {person.status} - {person.species}
              </strong>
            </span>
            <p className="person-loc" data-testid="person-loc">
              {this.state.show && (
                <span className="person-location-title">Last known location:</span>
              )}
              <br></br>
              {this.state.show && (
                <strong className="person-location-name">{person.location.name}</strong>
              )}
              <br></br>
              {this.state.show && <span className="person-gender-title">Gender:</span>}
              <br></br>
              {this.state.show && <strong className="person-gender">{person.gender}</strong>}
            </p>
          </div>
          <div className="buttons-wrapper">
            <button className="btn person-details" onClick={this.handleDetailsClick}>
              {this.state.show ? 'Hide details' : 'Show details'}
            </button>
            <button
              className="btn person-info"
              data-testid="info-button"
              onClick={this.handleInfoClick}
            >
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
              <strong className="card-footer-text" data-testid="likes">
                {this.state.likes}
              </strong>
            </div>
            <div className="views-block">
              <img className="views-img" src={views} alt="views image" />
              <strong className="card-footer-text" data-testid="views">
                {this.state.views}
              </strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const isLiked = this.isLocalStorageHasValue('likesArr', this.props.person.id);
    this.setState({ isLiked });
    this.setState({ likes: isLiked ? 1 : 0 });
    const isViewed = this.isLocalStorageHasValue('viewsArr', this.props.person.id);
    this.setState({ isViewed });
    this.setState({ views: isViewed ? 1 : 0 });
  }
}

export default Card;
