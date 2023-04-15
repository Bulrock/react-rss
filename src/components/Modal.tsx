import { IModalProps } from '../models/types';
import React, { useEffect, useState } from 'react';
import cross from '../assets/cross.svg';
import Roller from './Roller';
import { ICharacter } from '../models/types';
import { useAppSelector } from '../app/hooks';
import { useGetCharacterByIdQuery } from '../features/ApiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

const Modal = (props: IModalProps) => {
  const [characterModal, setCharacterModal] = useState<
    FetchBaseQueryError | ICharacter | undefined | null
  >(null);
  const cardId = useAppSelector((state) => state.card.id);
  const { data: fetchCharacterModal, isFetching } = useGetCharacterByIdQuery(cardId, {
    skip: !props.active,
  });

  useEffect(() => {
    if (fetchCharacterModal && 'id' in fetchCharacterModal) {
      setCharacterModal(fetchCharacterModal);
    }
  }, [fetchCharacterModal]);

  if (!isFetching && characterModal && 'id' in characterModal) {
    return (
      <div
        data-testid="modal"
        className={props.active ? 'modal active' : 'modal'}
        onClick={() => {
          props.setActive(false);
        }}
      >
        <div
          className={props.active ? 'modal-content active' : 'modal-content'}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="card-modal" data-testid="card-modal">
            <div className="modal-close-cross">
              <img
                data-testid={'modal-close-btn'}
                className="cross-img"
                src={cross}
                alt="modal-close-icon"
                onClick={() => {
                  props.setActive(false);
                }}
              />
            </div>
            <div className="card-header-wrapper">
              <div>
                <img
                  className="person-img"
                  src={characterModal.image}
                  alt="person image"
                  loading="lazy"
                />
                <h2 className="person-name">{characterModal.name}</h2>
                <span className="person-status">
                  <span
                    data-testid={'person-status-ico'}
                    className={
                      characterModal.status === 'Alive' ? 'status-icon-green' : 'status-icon-red'
                    }
                  ></span>
                  <strong>
                    {characterModal.status} - {characterModal.species}
                  </strong>
                </span>
                <p className="person-loc" data-testid="person-loc">
                  <span className="person-location-title">Last known location:</span>
                  <br></br>
                  <strong className="person-location-name">{characterModal.location.name}</strong>
                  <br></br>
                  <span className="person-gender-title">Gender:</span>
                  <br></br>
                  <strong className="person-gender">{characterModal.gender}</strong>
                </p>
                <p className="person-loc" data-testid="person-info-block">
                  <span className="person-info-title">Origin place of birth:</span>
                  <br></br>
                  <strong className="person-info-name">{characterModal.origin.name}</strong>
                  <br></br>
                  <span className="person-birth-title">Date of birth:</span>
                  <br></br>
                  <strong className="person-date">{characterModal.created.slice(0, 10)}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        data-testid="modal"
        className={props.active ? 'modal active' : 'modal'}
        onClick={() => props.setActive(false)}
      >
        <div
          className={props.active ? 'modal-content active' : 'modal-content'}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="card-modal" data-testid="card-modal">
            <div className="modal-close-cross">
              <img
                data-testid={'modal-close-btn'}
                className="cross-img"
                src={cross}
                alt="modal-close-icon"
                onClick={() => props.setActive(false)}
              />
            </div>
            {!isFetching && (
              <div className="card-header-wrapper">
                <div className="modal-error">
                  <div data-testid="on-error">Failed to fetch Character Information!</div>
                </div>
              </div>
            )}
            {isFetching && <Roller classRoller={'lds-roller-modal lds-roller'} />}
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;
