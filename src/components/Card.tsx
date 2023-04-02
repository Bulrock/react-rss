import React, { useState, useEffect } from 'react';
import { ICardProps } from '../models/types';
import viewsIcon from '../assets/eye.png';
import likesIcon from '../assets/like.png';
import LocalStorageLikeRepository from '../models/LocalStorageLikeRepository';
import LocalStorageViewRepository from '../models/LocalStorageViewRepository';

function Card(props: ICardProps) {
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [info, setInfo] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isViewed, setIsViewed] = useState(false);
  const likeRepository = new LocalStorageLikeRepository();
  const viewRepository = new LocalStorageViewRepository();

  useEffect(() => {
    componentDidMount();
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

  const handleCardClick = () => {
    if (!props.setModalActive) return;
    props.setModalActive(true);
    props.onCharacterCardClick(props.character);
    handleInfoClick();
  };

  return (
    <div className="card" data-testid="card" onClick={handleCardClick}>
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
