import React, { Component } from 'react';
import { ICharacter, ICardProps, ICardState } from '../models/types';
import views from '../assets/eye.png';
import like from '../assets/like.png';
import LocalStorageLikeRepository from '../models/LocalStorageLikeRepository';
import LocalStorageViewRepository from '../models/LocalStorageViewRepository';

class Card extends Component<ICardProps, ICardState> {
  private likeRepository = new LocalStorageLikeRepository();
  private viewRepository = new LocalStorageViewRepository();
  constructor(props: { character: ICharacter }) {
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
      this.likeRepository.add(this.props.character.id);
    } else {
      this.setState({ likes: this.state.likes - 1, isLiked: !this.state.isLiked });
      this.likeRepository.remove(this.props.character.id);
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
      this.viewRepository.add(this.props.character.id);
    } else {
      this.setState({
        info: !this.state.info,
      });
    }
  };

  render() {
    const { character } = this.props;
    return (
      <div className="card" data-testid="card">
        <div className="card-header-wrapper">
          <div>
            <img className="person-img" src={character.image} alt="person image" />
            <h2 className="person-name">{character.name}</h2>
            <span className="person-status">
              <span
                className={character.status === 'Alive' ? 'status-icon-green' : 'status-icon-red'}
              ></span>
              <strong>
                {character.status} - {character.species}
              </strong>
            </span>
            <p className="person-loc" data-testid="person-loc">
              {this.state.show && (
                <span className="person-location-title">Last known location:</span>
              )}
              <br></br>
              {this.state.show && (
                <strong className="person-location-name">{character.location.name}</strong>
              )}
              <br></br>
              {this.state.show && <span className="person-gender-title">Gender:</span>}
              <br></br>
              {this.state.show && <strong className="person-gender">{character.gender}</strong>}
            </p>
            <p className="person-loc" data-testid="person-info-block">
              {this.state.info && <span className="person-info-title">Origin place of birth:</span>}
              <br></br>
              {this.state.info && (
                <strong className="person-info-name">{character.origin.name}</strong>
              )}
              <br></br>
              {this.state.info && <span className="person-birth-title">Date of birth:</span>}
              <br></br>
              {this.state.info && (
                <strong className="person-date">{character.created.slice(0, 10)}</strong>
              )}
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
    const isLiked = this.likeRepository.findLike(this.props.character.id);
    const likes = isLiked ? 1 : 0;
    const isViewed = this.viewRepository.findView(this.props.character.id);
    const views = isViewed ? 1 : 0;
    this.setState({ isLiked, likes, isViewed, views });
  }
}

export default Card;
