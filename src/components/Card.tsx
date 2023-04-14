import React, { useState, useEffect, useCallback } from 'react';
import { ICardProps } from '../models/types';
import viewsIcon from '../assets/eye.png';
import likesIcon from '../assets/like.png';
import StateLikeRepository from '../models/StateLikeRepository';
import StateViewRepository from '../models/StateViewRepository';
import { useAppDispatch } from '../app/hooks';
import { updateId } from '../features/CardSlice';

function Card({ canDraw, character, setModalActive }: ICardProps) {
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [info, setInfo] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isViewed, setIsViewed] = useState(false);
  const findLikeState = StateLikeRepository('find');
  const addLikeState = StateLikeRepository('add');
  const removeLikeState = StateLikeRepository('remove');
  const findViewState = StateViewRepository('find');
  const addViewState = StateViewRepository('add');
  const dispatch = useAppDispatch();

  const componentDidMount = useCallback(() => {
    let isLiked = false;
    if (character && !('data' in character) && 'id' in character) {
      const liked = findLikeState(character.id);
      if (typeof liked === 'boolean') {
        isLiked = liked;
      }
    }
    const likes = isLiked ? 1 : 0;
    let isViewed = false;
    if (character && 'id' in character) {
      const viewed = findViewState(character.id);
      if (typeof viewed === 'boolean') {
        isViewed = viewed;
      }
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
  }, [character, findLikeState, findViewState]);

  const handleCardClick = () => {
    setModalActive(true);
    if (character && 'id' in character) {
      // onCharacterCardClick(character);
      dispatch(updateId(String(character.id)));
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
      if (character && 'id' in character && addLikeState) {
        addLikeState(character.id);
      }
    } else {
      setLikes(likes - 1);
      setIsLiked(!isLiked);
      if (character && 'id' in character && removeLikeState) {
        removeLikeState(character.id);
      }
    }
  };

  const handleInfoClick = () => {
    if (!isViewed) {
      setViews(views + 1);
      setInfo(!info);
      setIsViewed(!isViewed);
      if (character && 'id' in character && addViewState) {
        addViewState(character.id);
      }
    } else {
      setInfo(!info);
    }
  };

  return (
    <>
      {character && 'id' in character && canDraw && (
        <div className="card" data-testid="card" onClick={handleCardClick}>
          <div className="card-header-wrapper">
            <div>
              <img className="person-img" src={character.image} alt="person image" loading="lazy" />
              <h2 className="person-name">{character.name}</h2>
              <span className="person-status">
                <span
                  data-testid="status-icon"
                  className={character.status === 'Alive' ? 'status-icon-green' : 'status-icon-red'}
                ></span>
                <strong>
                  {character.status} - {character.species}
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
    </>
  );
}

export default Card;
