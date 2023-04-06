import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { ICardProps } from '../models/types';
import viewsIcon from '../assets/eye.png';
import likesIcon from '../assets/like.png';
import LocalStorageLikeRepository from '../models/LocalStorageLikeRepository';
import LocalStorageViewRepository from '../models/LocalStorageViewRepository';
const ErrorMessage = React.lazy(() => import('./ErrorMessage'));
import Roller from './Roller';

function Card(props: ICardProps) {
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [info, setInfo] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isViewed, setIsViewed] = useState(false);
  const likeRepository = useMemo(() => new LocalStorageLikeRepository(), []);
  const viewRepository = useMemo(() => new LocalStorageViewRepository(), []);

  const componentDidMount = useCallback(() => {
    let isLiked;
    if (props.character) {
      isLiked = likeRepository.findLike(props.character.id);
    }
    const likes = isLiked ? 1 : 0;
    let isViewed;
    if (props.character) {
      isViewed = viewRepository.findView(props.character.id);
    }
    const views = isViewed ? 1 : 0;
    if (isLiked) {
      setIsLiked(isLiked);
    }
    setLikes(likes);
    if (isViewed) {
      setIsViewed(isViewed);
    }
    setViews(views);
  }, [likeRepository, props.character, viewRepository]);

  const handleCardClick = () => {
    props.setModalActive(true);
    if (props.character) {
      props.onCharacterCardClick(props.character);
    }
    handleInfoClick();
  };

  useEffect(() => {
    componentDidMount();
  }, [componentDidMount]);

  const handleLikesClick = () => {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(!isLiked);
      if (props.character) {
        likeRepository.add(props.character.id);
      }
    } else {
      setLikes(likes - 1);
      setIsLiked(!isLiked);
      if (props.character) {
        likeRepository.remove(props.character.id);
      }
    }
  };

  const handleInfoClick = () => {
    if (!isViewed) {
      setViews(views + 1);
      setInfo(!info);
      setIsViewed(!isViewed);
      if (props.character) {
        viewRepository.add(props.character.id);
      }
    } else {
      setInfo(!info);
    }
  };

  return (
    <>
      {props.character && props.canDraw && (
        <div className="card" data-testid="card" onClick={handleCardClick}>
          <div className="card-header-wrapper">
            <div>
              <img
                className="person-img"
                src={props.character.image}
                alt="person image"
                loading="lazy"
              />
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
                <img
                  className="like-img"
                  src={likesIcon}
                  alt="like image"
                  onClick={handleLikesClick}
                />
                <strong className="card-footer-text" data-testid="likes">
                  {likes}
                </strong>
              </div>
              <div className="views-block">
                <img className="views-img" src={viewsIcon} alt="views image" loading="lazy" />
                <strong className="card-footer-text" data-testid="views">
                  {views}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
      {!props.character && props.canDraw && (
        <Suspense fallback={<Roller />}>
          <ErrorMessage />
        </Suspense>
      )}
    </>
  );
}

export default Card;
