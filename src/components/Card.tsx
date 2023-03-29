import React, { useState, useEffect } from 'react';
import { ICardProps } from '../models/types';
import viewsIcon from '../assets/eye.png';
import likesIcon from '../assets/like.png';
import LocalStorageLikeRepository from '../models/LocalStorageLikeRepository';
import LocalStorageViewRepository from '../models/LocalStorageViewRepository';

function Card(props: ICardProps) {
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isViewed, setIsViewed] = useState(false);
  const likeRepository = new LocalStorageLikeRepository();
  const viewRepository = new LocalStorageViewRepository();

  useEffect(() => {
    return () => {
      componentDidMount();
    };
  });

  const handleLikesClick = () => {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(!isLiked);
      likeRepository.add(props.character.id);
    } else {
      setLikes(likes - 1);
      setIsLiked(!isLiked);
      likeRepository.remove(props.character.id);
    }
  };

  const handleDetailsClick = () => {
    setShow(!show);
  };

  const handleInfoClick = () => {
    if (!isViewed) {
      setViews(views + 1);
      setInfo(!info);
      setIsViewed(!isViewed);
      viewRepository.add(props.character.id);
    } else {
      setInfo(!info);
    }
  };

  const componentDidMount = () => {
    const isLiked = likeRepository.findLike(props.character.id);
    const likes = isLiked ? 1 : 0;
    const isViewed = viewRepository.findView(props.character.id);
    const views = isViewed ? 1 : 0;
    setIsLiked(isLiked);
    setLikes(likes);
    setIsViewed(isViewed);
    setViews(views);
  };

  return (
    <div className="card" data-testid="card">
      <div className="card-header-wrapper">
        <div>
          <img className="person-img" src={props.character.image} alt="person image" />
          <h2 className="person-name">{props.character.name}</h2>
          <span className="person-status">
            <span
              className={
                props.character.status === 'Alive' ? 'status-icon-green' : 'status-icon-red'
              }
            ></span>
            <strong>
              {props.character.status} - {props.character.species}
            </strong>
          </span>
          <p className="person-loc" data-testid="person-loc">
            {show && <span className="person-location-title">Last known location:</span>}
            <br></br>
            {show && (
              <strong className="person-location-name">{props.character.location.name}</strong>
            )}
            <br></br>
            {show && <span className="person-gender-title">Gender:</span>}
            <br></br>
            {show && <strong className="person-gender">{props.character.gender}</strong>}
          </p>
          <p className="person-loc" data-testid="person-info-block">
            {info && <span className="person-info-title">Origin place of birth:</span>}
            <br></br>
            {info && <strong className="person-info-name">{props.character.origin.name}</strong>}
            <br></br>
            {info && <span className="person-birth-title">Date of birth:</span>}
            <br></br>
            {info && (
              <strong className="person-date">{props.character.created.slice(0, 10)}</strong>
            )}
          </p>
        </div>
        <div className="buttons-wrapper">
          <button className="btn person-details" onClick={handleDetailsClick}>
            {show ? 'Hide details' : 'Show details'}
          </button>
          <button className="btn person-info" data-testid="info-button" onClick={handleInfoClick}>
            {info ? 'Hide info' : 'Show info'}
          </button>
        </div>
      </div>
      <div>
        <hr className="hr"></hr>
        <div className="card-footer-wrapper">
          <div className="likes-block">
            <img className="like-img" src={likesIcon} alt="like image" onClick={handleLikesClick} />
            <strong className="card-footer-text" data-testid="likes">
              {likes}
            </strong>
          </div>
          <div className="views-block">
            <img className="views-img" src={viewsIcon} alt="views image" />
            <strong className="card-footer-text" data-testid="views">
              {views}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
